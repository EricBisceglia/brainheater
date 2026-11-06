/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     GAMESTATE                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/
/* Updates as the game is played, acts as the only source of truth for the game's state.                             */
/*********************************************************************************************************************/

const game = {
  level:      0         , // Current level ID
  generation: 0         , // Level generation counter (incremented on reset and victory)
  map:        []        , // Current level map
  player_x:   0         , // Player's current position
  player_y:   0         , // Player's current position
  status:     'playing' , // Current game status ('playing', 'moving', 'dead', 'won')
  animation:  null      , // Ongoing player animation
  bump:       null      , // Ongoing wall impact animation
  chain:      new Map() , // Movement states experienced during the current move
  visited:    new Set() , // Tiles visited by the player in the current generation
  completed:  new Set()   // Levels completed by the player
};

/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                    GAME EVENTS                                                    */
/*                                                                                                                   */
/*********************************************************************************************************************/
/*                                                                                                                   */
/*  level_load      Loads a level.                                                                                   */
/*  level_restart   Restarts the current level.                                                                      */
/*                                                                                                                   */
/*  tile_resolve    Resolves the effect of tile the player is standing on.                                           */
/*                                                                                                                   */
/*  key_collect     Collects a key and removes all matching hazards.                                                 */
/*                                                                                                                   */
/*  player_move     Moves the player one tile in the requested direction.                                            */
/*  player_launch   Launches the player to the edge of the board in the requested direction.                         */
/*  player_die      Kills the player and triggers the death animation.                                               */
/*  player_win      Marks the level as completed and loads the next one.                                             */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Loads a level.
 *
 * @param   {number}  level_id  The id of the level to load.
 *
 * @returns {void}
 */

function level_load(level_id)
{
  // Fetch the requested level
  const level = levels[level_id];

  // Stop here if the requested level does not exist
  if(!level)
    return;

  // Increment the level generation counter
  game.generation++;

  // Cancel any active movement animation
  if(game.animation)
  {
    game.animation.cancel();
    game.animation = null;
  }

  // Create an copy of the level's map for the game state
  game.map = level.map.map(function(row)
  {
    return row.split('');
  });

  // Clear the visited tiles
  game.visited = new Set();

  // Clear the movement chain
  game.chain.clear();

  // Reset the game state
  game.level    = level_id;
  game.player_x = 0;
  game.player_y = 0;
  game.status   = 'playing';

  // Cancel any ongoing impact animation
  if(game.bump)
  {
    game.bump.cancel();
    game.bump = null;
  }

  // Draw the level
  level_draw(game.level);

  // Update the level selector
  level_select_draw();
}



/**
 * Restarts the current level.
 *
 * @returns {void}
 */

function level_restart()
{
  // Reload the current level
  level_load(game.level);
}




/**
 * Resolves the effect of the tile the player is standing on.
 *
 * @param   {string}  direction  The direction the player entered from.
 *
 * @returns {Promise<void>}
 */

async function tile_resolve(direction)
{
  // Fetch the tile under the player
  const tile = game.map[game.player_y][game.player_x];

  // Define arrow tile directions
  const arrows = {  '^': 'up'     ,
                    '>': 'right'  ,
                    'v': 'down'   ,
                    '<': 'left'   };

  // Check for repeating movement states
  if(tile === 'J' || tile === 'L' || arrows[tile])
  {
    // Serialize the current movement state
    const state = JSON.stringify([game.player_x, game.player_y, direction, game.map]);

    // Count how many times this movement state has occurred
    const visits = (game.chain.get(state) || 0) + 1;
    game.chain.set(state, visits);

    // Kill the player after four repetitions
    if(visits > 4)
    {
      player_die();
      return;
    }
  }

  // Handle arrow tiles
  if(arrows[tile])
  {
    await player_move(arrows[tile], 1, true);
    return;
  }

  // Handle other tile effects
  switch(tile)
  {
    // Deadly tiles
    case 'X':
    case 'D':
      player_die();
      break;

    // Jump
    case 'J':
      await player_move(direction, 2, true);
      break;

    // Launcher
    case 'L':
      await player_launch(direction);
      break;

    // Key
    case 'K':
      key_collect();
      break;

    // Exit
    case 'G':
      player_win();
      break;
  }
}




/**
 * Collects a key and removes all matching hazards.
 *
 * @returns {void}
 */

function key_collect()
{
  // Remove the collected key
  game.map[game.player_y][game.player_x] = '.';

  // Look through the map for matching hazards
  for(let y = 0; y < game.map.length; y++)
  {
    for(let x = 0; x < game.map[y].length; x++)
    {
      // Turn locked tiles into regular tiles
      if(game.map[y][x] === 'D')
        game.map[y][x] = '.';
    }
  }

  // Update the game board
  level_draw(game.level);
}




/**
 * Moves the player one tile in the requested direction.
 *
 * @param   {string}  direction  The direction to move (up, down, left, right).
 * @param   {number}  distance   The number of tiles to move.
 * @param   {boolean} forced     Whether the movement is forced (eg. by a directional arrow).
 * @param   {boolean} impact     Whether the movement will trigger an impact animation upon hitting a wall.
 *
 * @returns {Promise<void>}
 */

async function player_move( direction         ,
                            distance  = 1     ,
                            forced    = false ,
                            impact    = false )
{
  // Stop here if the player isn't allowed to move
  if(game.status !== 'playing')
    return;

  // Each move initiated by the player starts a chain
  if(!forced)
    game.chain.clear();

  // Fetch the player's current position
  let next_x = game.player_x;
  let next_y = game.player_y;

  // Calculate the requested position after moving
  switch(direction)
  {
    case 'up':
      next_y -= distance;
      break;

    case 'down':
      next_y += distance;
      break;

    case 'left':
      next_x -= distance;
      break;

    case 'right':
      next_x += distance;
      break;

    default:
      return;
  }

  // Check whether the player hit the edge of the game board
  const hit_wall = next_x < 0
                || next_y < 0
                || next_x >= game.map[0].length
                || next_y >= game.map.length;

  // Different treatment depending on whether the player walked or was thrust into the edge
  if(hit_wall)
  {
    // Prevent moving into a border
    if(!forced && distance === 1)
      return;

    // Shorten jumps to the last valid tile inside the board
    next_x = Math.max(0, Math.min(next_x, game.map[0].length - 1));
    next_y = Math.max(0, Math.min(next_y, game.map.length - 1));
  }

  // Remember which generation this movement belongs to
  const generation = game.generation;

  // Temporarily prevent additional movement
  game.status = 'moving';

  // Animate the player towards the destination
  await animate_player(next_x, next_y);

  // Stop here if the level was restarted during movement
  if(generation !== game.generation)
    return;

  // Remember the coordinates of the tile the player has just left
  game.visited.add(game.player_x + ',' + game.player_y);

  // Update the player's position
  game.player_x = next_x;
  game.player_y = next_y;

  // Allow movement to resume
  game.status = 'playing';

  // Draw the level after the player has moved
  level_draw(game.level);

  // Trigger an impact animation when the player is sent into a wall by a launcher
  if(impact && !hit_wall)
    animate_impact(direction);

  // Kill the player if were thrust into a wall
  if(hit_wall)
  {
    player_die();
    return;
  }

  // Resolve the effects of the tile the player landed on
  await tile_resolve(direction);
}




/**
 * Launches the player to the edge of the board in the requested direction.
 *
 * @param   {string}  direction  The direction to launch the player in (up, down, left, right).
 *
 * @returns {Promise<void>}
 */

async function player_launch(direction)
{
  // Calculate the distance to the edge of the board in the requested direction
  let distance = 0;
  switch(direction)
  {
    case 'up':
      distance = game.player_y;
      break;

    case 'down':
      distance = game.map.length - 1 - game.player_y;
      break;

    case 'left':
      distance = game.player_x;
      break;

    case 'right':
      distance = game.map[0].length - 1 - game.player_x;
      break;
  }

  // Stop here if the player is already at the edge
  if(distance === 0)
    return;

  // Move the player to the edge and resolve the landing tile
  await player_move(direction, distance, true, true);
}




/**
 * Kills the player and triggers the death animation.
 *
 * @returns {void}
 */

function player_die()
{
  // Stop here if the player is already dead
  if(game.status === 'dead')
    return;

  // Prevent further movement by changing the game's state
  game.status = 'dead';

  // Cancel any ongoing impact animation
  if(game.bump)
  {
    game.bump.cancel();
    game.bump = null;
  }

  // Draw the level in its lost state
  level_draw(game.level);

  // Animate the player's death
  animate_death();
}




/**
 * Marks the current level as completed and loads the next one.
 *
 * @returns {void}
 */

function player_win()
{
  // Stop here if the gamestate prevents victory
  if(game.status !== 'playing')
    return;

  // Mark the level as completed
  game.status = 'won';
  game.completed.add(levels[game.level].id);

  // Save the updated progression
  progress_save();

  // Move on to the next level, looping back to the start after the final one
  const next_level = (game.level + 1) % levels.length;
  level_load(next_level);
}