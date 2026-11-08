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