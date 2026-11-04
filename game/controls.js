/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      CONTROLS                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

// React to keyboard input
document.addEventListener('keydown', function(event)
{
  // Leave keyboard input to the settings menu if it is open
  if(document.getElementById('settings_menu').open)
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




// Handle language selection
document.getElementById('language_select').addEventListener('change', function(event)
{
  language_change(event.target.value);
});




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