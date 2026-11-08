/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      CONTROLS                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

// React to keyboard input
document.addEventListener('keydown', function(event)
{
  // Leave keyboard input to any open dialog box
  if( document.getElementById('settings_menu').open ||
      document.getElementById('ending_screen').open)
  return;

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
/*                                                   LEVEL SELECT                                                    */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Handle levelset selection
document.getElementById('levelset_select').addEventListener('change', function(event)
{
  // Fetch the selected levelset
  const set_id = Number(event.target.value);

  // If the ending is selected, show it instead of loading a level
  if(event.target.value === 'ending')
  {
    event.target.value = levels[game.level].set;
    ending_show();
    return;
  }

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




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     SETTINGS                                                      */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Open settings
document.getElementById('settings_open').addEventListener('click', function()
{
  document.getElementById('settings_menu').showModal();
});

// Close settings
document.getElementById('settings_close').addEventListener('click', function()
{
  document.getElementById('settings_menu').close();
});

// Return keyboard control to the game board after closing settings
document.getElementById('settings_menu').addEventListener('close', function()
{
  document.getElementById('brain_board').focus({ preventScroll: true });
});

// Handle progression reset
document.getElementById('progress_reset').addEventListener('click', progress_reset);

// Handle language selection
document.getElementById('language_select').addEventListener('change', function(event)
{
  language_change(event.target.value);
});

// Handle colorblind mode
document.getElementById('colorblind_toggle').addEventListener('change', function(event)
{
  // Fetch the colorblind toggle's state
  const enabled = event.target.checked;

  // Apply or get rid of colorblind mode
  document.documentElement.classList.toggle('colorblind', enabled);

  // Save the setting
  try
  {
    localStorage.setItem('brainheater-colorblind', String(enabled));
  }
  catch(error)
  {
    console.warn('Could not save the colorblind preference.', error);
  }
});




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   ENDING SCREEN                                                   */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Close the ending screen
document.getElementById('ending_close').addEventListener('click', function()
{
  document.getElementById('ending_screen').close();
});

// Return to the first level when the ending is closed
document.getElementById('ending_screen').addEventListener('close', function()
{
  level_load(0);
  document.getElementById('brain_board').focus({ preventScroll: true });
});



/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                  MOBILE CONTROLS                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Handle touch based controls
const touch_area = document.getElementById('brain_area');

// Track the current swiping gesture
let swipe = null;

// Record the position where a swipe begins
touch_area.addEventListener('pointerdown', function(event)
{
  // Only accept touch or pen swipes
  if(event.pointerType !== 'touch' && event.pointerType !== 'pen')
    return;

  // Ignore secondary swipes and only allow swiping when the game is ongoing
  if(!event.isPrimary || swipe || game.status !== 'playing')
    return;

  // Don't record swipes when popins are open
  if( document.getElementById('settings_menu').open
   || document.getElementById('ending_screen').open
   || event.target.closest('button'))
    return;

  // Initialize the swipe object
  swipe = {
    pointer:    event.pointerId,
    x:          event.clientX,
    y:          event.clientY,
    generation: game.generation
  };

  // Keep tracking the swipe even if it leaves the board
  touch_area.setPointerCapture(event.pointerId);
});

// Execute the movement once the swipe ends
touch_area.addEventListener('pointerup', function(event)
{
  // Stop here if no swipe beginning was recorded or if this is a secondary swipe
  if(!swipe || event.pointerId !== swipe.pointer)
    return;

  // Store the swipe's starting point and reset the swipe tracker
  const start = swipe;
  swipe       = null;

  // Ignore swipes belonging to an older game generation and when the game is not ongoing
  if( start.generation !== game.generation
   || game.status !== 'playing'
   || document.getElementById('settings_menu').open
   || document.getElementById('ending_screen').open)
    return;

  // Measure the swipe's vector
  const distance_x = event.clientX - start.x;
  const distance_y = event.clientY - start.y;

  // Ignore small accidental moves and taps
  if(Math.max(Math.abs(distance_x), Math.abs(distance_y)) < 24)
    return;

  // Calculate the swipe's dominant direction
  let direction;
  if(Math.abs(distance_x) > Math.abs(distance_y))
    direction = distance_x > 0 ? 'right' : 'left';
  else
    direction = distance_y > 0 ? 'down' : 'up';

  // Move the player in the calculated direction
  player_move(direction);
});

// Handle interrupted swipes
touch_area.addEventListener('pointercancel', swipe_cancel);
touch_area.addEventListener('lostpointercapture', swipe_cancel);

// Ignore interrupted swipes
function swipe_cancel(event)
{
  if(swipe && event.pointerId === swipe.pointer)
    swipe = null;
}

// Handle tapping the death message
document.getElementById('death_touch_restart').addEventListener('click', function()
{
  // Stop here if the game isn't in its death state with the death popin open
  if(game.status !== 'dead'
  || document.getElementById('settings_menu').open
  || document.getElementById('ending_screen').open)
    return;

  // Restart the level
  level_restart();

  // Return focus to the game board
  document.getElementById('brain_board').focus({ preventScroll: true });
});