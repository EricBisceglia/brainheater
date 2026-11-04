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