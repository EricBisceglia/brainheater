/*********************************************************************************************************************/
/*                                                                                                                   */
/*  progress_save         Saves the current game progression.                                                        */
/*  progress_load         Loads the saved game progression.                                                          */
/*  progress_reset        Resets (deletes) saved game progression.                                                   */
/*                                                                                                                   */
/*  levelset_completed    Checks whether every level in a levelset has been completed.                               */
/*  levelset_unlocked     Checks whether all previous levlesets have been completed.                                 */
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
    const progress = { completed: [...game.completed] };
    localStorage.setItem('brainheater-completed-levels', JSON.stringify(progress));
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
    const progress = JSON.parse(localStorage.getItem('brainheater-completed-levels') || 'null');

    // Stop here if there is no valid save to work with
    if(!progress || !Array.isArray(progress.completed))
      return;

    // Fetch all available level ids
    const available = new Set(levels.map(function(level)
    {
      return level.id;
    }));

    // Filter out invalid / oob level ids
    game.completed = new Set(progress.completed.filter(function(level_id)
    {
      return typeof level_id === 'string' && available.has(level_id);
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
  const confirmed = window.confirm(string_translate('reset_confirm'));

  // Stop here if the player changed their mind
  if(!confirmed)
    return;

  // Clear the completed levels
  game.completed.clear();

  // Save the cleared progression
  progress_save();

  // Return to the first level
  level_load(0);

  // Close the settings menu
  document.getElementById('settings_menu').close();

  // Return keyboard control to the board (else the game will become unplayable)
  document.getElementById('brain_board').focus({ preventScroll: true });
}




/**
 * Checks whether every level in a levelset has been completed.
 *
 * @param   {number}  set_id  The levelset's ID.
 *
 * @returns {boolean}
 */

function levelset_completed(set_id)
{
  // Fetch all levels IDs belonging to the requested levelset
  const set_levels = levels.filter(function(level)
  {
    return level.set === set_id;
  });

  // Check completion status of all levels in the levelset
  return set_levels.length > 0 && set_levels.every(function(level)
  {
    return game.completed.has(level.id);
  });
}




/**
 * Checks whether all previous levlesets have been completed.
 *
 * @param   {number}  set_id  The levelset's ID.
 *
 * @returns {boolean}
 */

function levelset_unlocked(set_id)
{
  // Fetch the requested levelset's id
  const set_index = levelsets.findIndex(function(levelset)
  {
    return levelset.id === set_id;
  });

  // Stop here if the levelset does not exist
  if(set_index === -1)
    return false;

  // Check completion of every levelset with a lower id
  return levelsets.slice(0, set_index).every(function(levelset)
  {
    return levelset_completed(levelset.id);
  });
}