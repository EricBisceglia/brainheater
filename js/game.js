/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     GAMESTATE                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/
/* Updates as the game is played, is the only source of truth for the game state                                     */
/*********************************************************************************************************************/

const game = {
  level:      0         , // Current level ID
  player_x:   0         , // Player's current position
  player_y:   0         , // Player's current position
  status:     'playing' , // Current game status ('playing', 'dead', 'completed')
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
/*  player_move     Moves the player one tile in the requested direction.                                            */
/*  player_die      Kills the player and triggers the death animation.                                               */
/*  player_win      Marks the level as completed and loads the next one.                                             */
/*                                                                                                                   */
/*  progress_save   Saves the current game progression.                                                              */
/*  progress_load   Loads the saved game progression.                                                                */
/*  progress_reset  Resets (deletes) saved game progression.                                                         */
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

    // Exit
    case 'G':
      player_win();
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

  // Check whether the player hit the edge of the game board
  const hit_wall = next_x < 0
                || next_y < 0
                || next_x >= level.map[0].length
                || next_y >= level.map.length;

  // Different treatment depending on whether the player walked or was thrust into the edge
  if(hit_wall)
  {
    // Prevent moving into a border
    if(distance === 1)
      return;

    // Shorten jumps to the last valid tile inside the board
    next_x = Math.max(0, Math.min(next_x, level.map[0].length - 1));
    next_y = Math.max(0, Math.min(next_y, level.map.length - 1));
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
  game.completed.add(game.level);

  // Save the updated progression
  progress_save();

  // Move on to the next level, looping back to the start after the final one
  const next_level = (game.level + 1) % levels.length;
  level_load(next_level);
}




/**
 * Saves the current game progression.
 *
 * @returns {void}
 */

function progress_save()
{
  // Convert the set of completed levels into an array in the browser's local storage
  try
  {
    localStorage.setItem('brainheater-completed-levels', JSON.stringify([...game.completed]));
  }

  // Allow play to continue even if progress cannot be saved
  catch(error)
  {
    console.warn("Could not save the game's progression to the browser's local storage.", error);
  }
}




/**
 * Loads the current game progression.
 *
 * @returns {void}
 */

function progress_load()
{
  // Attempt to load the saved progression from the browser's local storage
  try
  {
    // Fetch the current saved progression from local storage
    const completed = JSON.parse(localStorage.getItem('brainheater-completed-levels') || '[]');

    // Skip wrong data
    if(!Array.isArray(completed))
      return;

    // Filter out invalid / oob level ids
    game.completed = new Set(completed.filter(function(level_id)
    {
      return Number.isInteger(level_id) && level_id >= 0 && level_id < levels.length;
    }));
  }

  // Allow play to continue even if loading progress fails
  catch(error)
  {
    console.warn("Could not load the game's progression from the browser's local storage.", error);
  }
}




/**
 * Resets (deletes) saved game progression.
 *
 * @returns {void}
 */

function progress_reset()
{
  // Ask before erasing progression
  const confirmed = window.confirm('Erase all completed levels and start from the beginning?\n\nThis cannot be undone.');

  // Stop here if the player changed their mind
  if(!confirmed)
    return;

  // Clear the completed levels
  game.completed.clear();

  // Save the cleared progression
  progress_save();

  // Return to the first level
  level_load(0);

  // Return keyboard control to the board (else the game will become unplayable)
  document.getElementById('brain_board').focus({ preventScroll: true });
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

// Handle levelset selection
document.getElementById('levelset_select').addEventListener('change', function(event)
{
  // Fetch the selected levelset
  const set_id = Number(event.target.value);

  // Figure out its first level's id
  const level_id = levels.findIndex(function(level)
  {
    return level.set === set_id;
  });

  // Stop here if the levelset has no levels
  if(level_id === -1)
    return;

  // Load the levelset's first level
  level_load(level_id);

  // Return keyboard control to the board (else the game will become unplayable)
  document.getElementById('brain_board').focus({ preventScroll: true });
});

// Handle progression reset
document.getElementById('progress_reset').addEventListener('click', progress_reset);




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   INITIALIZATION                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Load saved progression
progress_load();

// Find the first level that hasn't been completed yet
const first_unfinished = levels.findIndex(function(level, level_id)
{
  return !game.completed.has(level_id);
});

// Load the first unfinished level, or return to the beginning if everything is complete
level_load(first_unfinished === -1 ? 0 : first_unfinished);