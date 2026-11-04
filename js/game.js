/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     GAMESTATE                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/
/* Updates as the game is played, is the only source of truth for the game state                                     */
/*********************************************************************************************************************/

const game = {
  level:      0         ,
  player_x:   0         ,
  player_y:   0         ,
  status:     'playing' ,
  animation:  null      ,
  generation: 0         ,
  visited:    new Set()
};




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                    GAME EVENTS                                                    */
/*                                                                                                                   */
/*********************************************************************************************************************/
/*                                                                                                                   */
/*  level_load     Loads a level.                                                                                    */
/*  level_restart  Restarts the current level.                                                                       */
/*                                                                                                                   */
/*  tile_resolve   Resolves the effect of tile the player is standing on.                                            */
/*                                                                                                                   */
/*  player_move    Moves the player one tile in the requested direction.                                             */
/*  player_die     Kills the player and triggers the death animation.                                                */
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

  // Clear the visited tiles
  game.visited = new Set();

  // Reset the game state
  game.level    = level_id;
  game.player_x = level.start[0];
  game.player_y = level.start[1];
  game.status   = 'playing';

  // Draw the level
  level_draw(game.level);
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
  const level = levels[game.level];
  const tile  = level.map[game.player_y][game.player_x];

  // Handle the tile's effect
  switch(tile)
  {
    // Deadly tile
    case 'X':
      player_die();
      break;

    // Jump pad
    case 'J':
      await player_move(direction, 2);
      break;
  }
}




/**
 * Moves the player one tile in the requested direction.
 *
 * @param   {string}  direction  The direction to move (up, down, left, right).
 * @param   {number}  distance   The number of tiles to move.
 *
 * @returns {void}
 */

async function player_move( direction     ,
                            distance = 1  )
{
  // Stop here if the player isn't allowed to move
  if(game.status !== 'playing')
    return;

  // Fetch the current level
  const level = levels[game.level];

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

  // Check for row borders
  if(next_y < 0 || next_y >= level.map.length)
  {
    // Being thrust into the row border kills the player
    if(distance > 1)
      player_die();

    return;
  }

  // Check for column borders
  if(next_x < 0 || next_x >= level.map[next_y].length)
  {
    // Being thrust into the column border kills the player
    if(distance > 1)
      player_die();

    return;
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




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      CONTROLS                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

// React to keyboard input
document.addEventListener('keydown', function(event)
{
  // Ignore keyboard shortcuts
  if(event.ctrlKey || event.altKey || event.metaKey)
    return;

  // Don't hijack forms
  if(['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName) || event.target.isContentEditable)
    return;

  // Handle inputs
  switch(event.code)
  {
    // Move the player up
    case 'ArrowUp':
      event.preventDefault();
      if(!event.repeat)
        player_move('up');
      break;

    // Move the player down
    case 'ArrowDown':
      event.preventDefault();
      if(!event.repeat)
        player_move('down');
      break;

    // Move the player left
    case 'ArrowLeft':
      event.preventDefault();
      if(!event.repeat)
        player_move('left');
      break;

    // Move the player right
    case 'ArrowRight':
      event.preventDefault();
      if(!event.repeat)
        player_move('right');
      break;

    // Restart the level
    case 'Space':
      event.preventDefault();
      if(!event.repeat)
        level_restart();
      break;
  }
});




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   INITIALIZATION                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Load the first level
level_load(0);