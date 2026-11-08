/*********************************************************************************************************************/
/*                                                                                                                   */
/*  colorblind_load     Loads the saved colorblind mode preferences.                                                 */
/*                                                                                                                   */
/*  ending_show         Display the ending screen.                                                                   */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Loads the saved colorblind mode preferences.
 *
 * @returns {void}
 */

function colorblind_load()
{
  // Default to off
  let enabled = false;

  // Attempt to read the saved preference from the browser's local storage
  try
  {
    enabled = localStorage.getItem('brainheater-colorblind') === 'true';
  }
  catch(error)
  {
    console.warn('Could not load the colorblind preference.', error);
  }

  // Apply the preference and update the checkbox accordingly
  document.documentElement.classList.toggle('colorblind', enabled);
  document.getElementById('colorblind_toggle').checked = enabled;
}




/**
 * Displays the ending screen.
 *
 * @returns {void}
 */

function ending_show()
{
  // Fetch the ending screen element
  const ending = document.getElementById('ending_screen');

  // Show the ending screen (unless it is already showing)
  if(!ending.open)
    ending.showModal();
}




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