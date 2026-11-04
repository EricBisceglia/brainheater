/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   INITIALIZATION                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/

// Determine the interface language
language_load();

// Load saved progression
progress_load();

// Find the first level that hasn't been completed yet
const first_unfinished = levels.findIndex(function(level)
{
  return !game.completed.has(level.id);
});

// Load the first unfinished level, or return to the beginning if everything is complete
level_load(first_unfinished === -1 ? 0 : first_unfinished);

// Translate the interface
language_apply();