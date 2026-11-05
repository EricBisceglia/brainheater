/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     GAMESTATE                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/
/* Updates as the game is played, acts as the only source of truth for the game's state.                             */
/*********************************************************************************************************************/

const game = {
  level:      0         , // Current level ID
  map:        []        , // Current level map
  player_x:   0         , // Player's current position
  player_y:   0         , // Player's current position
  status:     'playing' , // Current game status ('playing', 'moving', 'dead', 'won')
  animation:  null      , // Ongoing player animation
  generation: 0         , // Level generation counter (incremented on reset and victory)
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

  // Reset the game state
  game.level    = level_id;
  game.player_x = level.start[0];
  game.player_y = level.start[1];
  game.status   = 'playing';

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

  // Handle the tile's effect
  switch(tile)
  {
    // Deadly tiles
    case 'X':
    case 'D':
      player_die();
      break;

    // Jump
    case 'J':
      await player_move(direction, 2);
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
 *
 * @returns {Promise<void>}
 */

async function player_move( direction     ,
                            distance = 1  )
{
  // Stop here if the player isn't allowed to move
  if(game.status !== 'playing')
    return;

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
    if(distance === 1)
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