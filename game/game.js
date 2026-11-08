/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     GAMESTATE                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/
/* Updates as the game is played, acts as the only source of truth for the game's state.                             */
/*********************************************************************************************************************/

const game = {
  level:      0         , // Current level ID
  generation: 0         , // Level generation counter (incremented on reset and victory)
  map:        []        , // Current level map
  player_x:   0         , // Player's current position
  player_y:   0         , // Player's current position
  erasers:    0         , // Number of available erasers
  status:     'playing' , // Current game status ('playing', 'moving', 'dead', 'won')
  animation:  null      , // Ongoing player animation
  bump:       null      , // Ongoing wall impact animation
  chain:      new Map() , // Movement states experienced during the current move
  visited:    new Set() , // Tiles visited by the player in the current generation
  completed:  new Set()   // Levels completed by the player
};




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                    GAME EVENTS                                                    */
/*                                                                                                                   */
/*********************************************************************************************************************/
/*                                                                                                                   */
/*  level_load            Loads a level.                                                                             */
/*  level_restart         Restarts the current level.                                                                */
/*                                                                                                                   */
/*  player_die            Kills the player and triggers the death animation.                                         */
/*  player_win            Marks the level as completed and loads the next one.                                       */
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

  // Stop here if the level does not exist or has not been unlocked yet
  if(!level || !levelset_unlocked(level.set))
    return;

  // Increment the level generation counter
  game.generation++;

  // Cancel any active movement animation
  if(game.animation)
  {
    game.animation.cancel();
    game.animation = null;
  }

  // Create an copy of the level's map for the game state
  game.map = level.map.map(function(row)
  {
    return row.split('');
  });

  // Clear the visited tiles
  game.visited = new Set();

  // Clear the movement chain
  game.chain.clear();

  // Reset the game state
  game.level    = level_id;
  game.player_x = 0;
  game.player_y = 0;
  game.erasers  = 0;
  game.status   = 'playing';

  // Cancel any ongoing impact animation
  if(game.bump)
  {
    game.bump.cancel();
    game.bump = null;
  }

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

  // Cancel any ongoing impact animation
  if(game.bump)
  {
    game.bump.cancel();
    game.bump = null;
  }

  // Draw the level in its lost state
  level_draw(game.level);

  // Animate the player's death
  animate_death();
}




/**
 * Marks the current level as completed and loads the next one.
 *
 * @returns {Promise<void>}
 */

async function player_win()
{
  // Stop here if the game can't be won at the moment
  if(game.status !== 'playing')
    return;

  // Track the current attempt's generation
  const generation = game.generation;

  // Prevent further player input
  game.status = 'won';

  // Keep track of whether this level was unfinished before beating it
  const first_completion = !game.completed.has(levels[game.level].id);

  // Mark the level as completed
  game.completed.add(levels[game.level].id);

  // Save level completion
  progress_save();

  // Cancel any ongoing wall crash animations
  if(game.bump)
  {
    game.bump.cancel();
    game.bump = null;
  }

  // Drew the board in the state it is after winning
  level_draw(game.level);

  // Play the victory animation
  await animate_win();

  // Stop if the player restarts or changes level
  if(generation !== game.generation || game.status !== 'won')
    return;

  // Show the ending when completing the final unbeated level
  if(first_completion && levels.every(function(level)
  {
    return game.completed.has(level.id);
  }))
  {
    ending_show();
    return;
  }

  // Find the next unbeated level within unlocked levelsets
  let next_level = levels.findIndex(function(level, index)
  {
    return index > game.level
        && levelset_unlocked(level.set)
        && !game.completed.has(level.id);
  });

  // If all upcoming levels have been beaten, looked for previous unbeaten ones
  if(next_level === -1)
  {
    next_level = levels.findIndex(function(level)
    {
      return levelset_unlocked(level.set)
          && !game.completed.has(level.id);
    });
  }

  // If there is no next unbeaten level, just advance to the next one in order
  if(next_level === -1)
    next_level = (game.level + 1) % levels.length;

  // Advance to the next level once the victory animation has finished
  level_load(next_level);
}