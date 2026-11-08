/*********************************************************************************************************************/
/*                                                                                                                   */
/*  animate_player      Animate the player's movement on the board.                                                  */
/*  animate_impact      Animate the player's impact with a wall.                                                     */
/*  animate_win         Animate the player's victory.                                                                */
/*  animate_death       Animate the player's death.                                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/


/**
 * Animates the player moving to another tile.
 *
 * @param   {number}  next_x  The destination column.
 * @param   {number}  next_y  The destination row.
 *
 * @returns {Promise<void>}
 */

async function animate_player(next_x, next_y)
{
  // Fetch the board, the player's current tile, and the destination tile
  const board       = document.getElementById('brain_board');
  const player      = board.querySelector('.player');
  const destination = board.querySelector('[data-x="' + next_x + '"][data-y="' + next_y + '"]');

  // Don't animate if tiles are missing (uh oh)
  if(!player || !destination)
    return;

  // Get the measurements of the starting and destination tiles
  const start = player.parentElement.getBoundingClientRect();
  const end   = destination.getBoundingClientRect();

  // Calculate the distance between the tiles' centers
  const distance_x = (end.left + end.width / 2) - (start.left + start.width / 2);
  const distance_y = (end.top + end.height / 2) - (start.top + start.height / 2);

  // Give longer movements longer animations (but keep them quick)
  const distance = Math.abs(next_x - game.player_x)
                 + Math.abs(next_y - game.player_y);
  const duration = Math.min(360, 120 + Math.max(0, distance - 1) * 30);

  // Smoothly animate the player's movement
  const animation = player.animate(
    [
      { transform: 'translate(0px, 0px) rotate(-12deg)'                                   } ,
      { transform: 'translate(' + distance_x + 'px, ' + distance_y + 'px) rotate(-12deg)' }
    ] ,
    { duration: duration , easing: 'ease-out' , fill: 'forwards' }
  );

  // Keep a reference to this animation so it can be cancelled if the player restarts the level
  game.animation = animation;

  // Wait for the animation to finish
  try
  {
    await animation.finished;
  }

  // Cancellation is expected if the player restarts the level
  catch(error)
  {
    if(error.name !== 'AbortError')
      throw error;
  }

  // Clear the animation reference once it's done (if it hasn't been replaced yet)
  finally
  {
    if(game.animation === animation)
      game.animation = null;
  }
}




/**
 * Animate the player's impact with a wall.
 *
 * @param   {string}  direction  The direction of impact.
 *
 * @returns {void}
 */

function animate_impact(direction)
{
  // Fetch the board's element id
  const board = document.getElementById('brain_board');

  // Cancel any ongoing bump animation
  if(game.bump)
    game.bump.cancel();

  // Determine an offset for the impact animation
  let offset_x = 0;
  let offset_y = 0;

  // Update the offset based on the direction of impact
  switch(direction)
  {
    case 'up':    offset_y = -2; break;
    case 'down':  offset_y =  2; break;
    case 'left':  offset_x = -2; break;
    case 'right': offset_x =  2; break;
  }

  // Animate the board with the calculated offset to simulate an impact
  const animation = board.animate(
    [
      { transform: 'translate(0px, 0px)' },
      { transform: 'translate(' + offset_x + 'px, ' + offset_y + 'px)' },
      { transform: 'translate(' + (-offset_x / 2) + 'px, ' + (-offset_y / 2) + 'px)' },
      { transform: 'translate(0px, 0px)' }
    ],
    { duration: 160, easing: 'ease-out' }
  );

  // Keep a reference to this animation so it can be cancelled
  game.bump = animation;

  // Clear the animation reference once the effect finishes
  animation.onfinish = function()
  {
    if(game.bump === animation)
      game.bump = null;
  };
}




/**
 * Animate the player's victory
 *
 * @returns {Promise<void>}
 */

async function animate_win()
{
  // Fetch the board and the player
  const board  = document.getElementById('brain_board');
  const player = board.querySelector('.player');

  // Stop here if there is no player (uh oh)
  if(!player)
    return;

  // Dissolve the player
  const animation = player.animate(
    [
      { offset: 0,    transform: 'rotate(-12deg) scale(1)',    opacity: 1 },
      { offset: 0.35, transform: 'rotate(6deg) scale(1.18)',   opacity: 1 },
      { offset: 1,    transform: 'rotate(18deg) scale(1.65)',  opacity: 0 }
    ],
    { duration: 800, easing: 'ease-out', fill: 'forwards' }
  );

  // Allow (re)loading a level to cancel this animation
  game.animation = animation;

  // Wait for the animation to finish
  try
  {
    await animation.finished;
  }

  // Handle errors just in case
  catch(error)
  {
    if(error.name !== 'AbortError')
      throw error;
  }

  // Clear the animation reference once the victory effect is finished
  finally
  {
    if(game.animation === animation)
      game.animation = null;
  }
}




/**
 * Animates the player's death.
 *
 * @returns {Promise<void>}
 */

async function animate_death()
{
  // Track which attempt this animation belongs to
  const generation = game.generation;

  // Fetch the player
  const board  = document.getElementById('brain_board');
  const player = board.querySelector('.player');

  // Stop here if the player tile is missing (uh oh)
  if(!player)
    return;

  // Shrink and fade the player
  const animation = player.animate(
    [
      { offset: 0,    transform: 'translateX(0px) rotate(-12deg) scale(1)',     opacity: 1    },
      { offset: 0.2,  transform: 'translateX(-4px) rotate(-20deg) scale(1.1)',  opacity: 1    },
      { offset: 0.4,  transform: 'translateX(4px) rotate(0deg) scale(1)',       opacity: 1    },
      { offset: 1,    transform: 'translateX(0px) rotate(-30deg) scale(0.2)',   opacity: 0.2  }
    ],
    { duration: 500, easing: 'ease-out', fill: 'forwards' }
  );

  // Keep a reference to this animation so it can be cancelled if the player restarts the level
  game.animation = animation;

  // Wait for the animation to finish
  try
  {
    await animation.finished;
  }

  // Cancellation is expected if the player restarts the level
  catch(error)
  {
    if(error.name !== 'AbortError')
      throw error;
  }

  // Clear the animation reference once it's done (if it hasn't been replaced yet)
  finally
  {
    if(game.animation === animation)
      game.animation = null;
  }

  // Stop here if the player restarted during the animation
  if(generation !== game.generation || game.status !== 'dead')
    return;

  // Show the death message once the animation finishes
  document.getElementById('death_message').hidden = false;
}