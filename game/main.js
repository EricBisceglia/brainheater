/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   INITIALIZATION                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Load the saved colorblind mode preference
colorblind_load();

// Determine the interface language
language_load();

// Load saved progression
progress_load();

// Find the first level that hasn't been completed yet and doesn't belong to a locked levelset
const first_unfinished = levels.findIndex(function(level)
{
  return levelset_unlocked(level.set) && !game.completed.has(level.id);
});

// Load the first unfinished level, or return to the beginning if everything is complete
level_load(first_unfinished === -1 ? 0 : first_unfinished);

// Translate the interface
language_apply();