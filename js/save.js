/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                    PROGRESSION                                                    */
/*                                                                                                                   */
/*********************************************************************************************************************/
/*                                                                                                                   */
/*  progress_save   Saves the current game progression.                                                              */
/*  progress_load   Loads the saved game progression.                                                                */
/*  progress_reset  Resets (deletes) saved game progression.                                                         */
/*                                                                                                                   */
/*********************************************************************************************************************/

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