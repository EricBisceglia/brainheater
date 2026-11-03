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
  generation: 0
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
/*  move_player    Moves the player one tile in the requested direction.                                             */
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

  // Reset the game state
  game.level    = level_id;
  game.player_x = level.start[0];
  game.player_y = level.start[1];
  game.status   = 'playing';

  // Draw the level
  draw_level(game.level);
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
 * Moves the player one tile in the requested direction.
 *
 * @param   {string}  direction  The direction to move (up, down, left, right).
 *
 * @returns {void}
 */

async function move_player(direction)
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
      next_y--;
      break;

    case 'down':
      next_y++;
      break;

    case 'left':
      next_x--;
      break;

    case 'right':
      next_x++;
      break;

    default:
      return;
  }

  // Stop here if the move hits a row border
  if(next_y < 0 || next_y >= level.map.length)
    return;

  // Stop here if the move hits a column border
  if(next_x < 0 || next_x >= level.map[next_y].length)
    return;

  // Remember which generation this movement belongs to
  const generation = game.generation;

  // Temporarily prevent additional movement
  game.status = 'moving';

  // Animate the player towards the destination
  await animate_player(next_x, next_y);

  // Stop here if the level was restarted during movement
  if(generation !== game.generation)
    return;

  // Update the player's position
  game.player_x = next_x;
  game.player_y = next_y;

  // Allow movement again
  game.status = 'playing';

  // Draw the player inside the destination tile
  draw_level(game.level);
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
        move_player('up');
      break;

    // Move the player down
    case 'ArrowDown':
      event.preventDefault();
      if(!event.repeat)
        move_player('down');
      break;

    // Move the player left
    case 'ArrowLeft':
      event.preventDefault();
      if(!event.repeat)
        move_player('left');
      break;

    // Move the player right
    case 'ArrowRight':
      event.preventDefault();
      if(!event.repeat)
        move_player('right');
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