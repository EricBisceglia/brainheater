/*********************************************************************************************************************/
/*                                                                                                                   */
/*  level_draw      Draw a level on the game board.                                                                  */
/*                                                                                                                   */
/*  animate_player  Animate the player's movement on the board.                                                      */
/*  animate_death   Animate the player's death.                                                                      */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Draw a level on the game board.
 *
 * @param   {number}  level_id  The id of the level to display.
 *
 * @returns {void}
 */

function level_draw(level_id)
{
  // Fetch the requested level
  const level = levels[level_id];

  // Stop here if the requested level does not exist
  if(!level)
    return;

  // Fetch the board's element id
  const board = document.getElementById('brain_board');

  // Hide any previous death message
  document.getElementById('death_message').hidden = true;

  // Update the board's death state
  board.classList.toggle('dead', game.status === 'dead');

  // Update the level info
  document.getElementById('level_name').textContent   = level.name;
  document.getElementById('level_number').textContent = String(level_id + 1).padStart(2, '0')
                                                      + ' / '
                                                      + String(levels.length).padStart(2, '0');

  // Update the size of the board
  board.style.setProperty('--grid_size', level.map.length);

  // Delete any previously existing level
  board.replaceChildren();

  // Loop through rows
  for(let y = 0; y < level.map.length; y++)
  {
    // Loop through columns
    for(let x = 0; x < level.map[y].length; x++)
    {
      // Fetch the tile type
      const tile_type = level.map[y][x];

      // Draw the tile
      const tile = document.createElement('div');
      tile.classList.add('tile');

      // Store the tile's coordinate
      tile.dataset.x = x;
      tile.dataset.y = y;

      // Determine the tile's appearance
      switch(tile_type)
      {
        case 'X':
          tile.classList.add('tile_loss');
          tile_symbol = 'X';
          tile_name   = 'Loss';
          break;

        case 'J':
          tile.classList.add('tile_jump');
          tile_symbol = 'X';
          tile_name   = 'Jump';
          break;

        case 'G':
          tile.classList.add('tile_exit');
          tile_symbol = '⚑';
          tile_name   = 'Exit';
          break;

        default:
          tile_symbol = '';
          tile_name   = 'Empty';
          break;
      }

      // Name the tile
      tile.setAttribute('aria-label', tile_name);

      // Add the tile symbol if required
      if(tile_symbol)
      {
        const symbol = document.createElement('span');
        symbol.textContent = tile_symbol;
        symbol.setAttribute('aria-hidden', 'true');
        tile.append(symbol);
      }

      // Handle the player's starting position
      if(x === game.player_x && y === game.player_y)
      {
        const player = document.createElement('span');
        player.classList.add('player');
        player.setAttribute('role', 'img');
        player.setAttribute('aria-label', 'Player');
        tile.append(player);
        tile.classList.add('tile_player');
      }

      // Place the tile on the board
      board.append(tile);
    }
  }
}




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

  // Smoothly animate the player's movement
  const animation = player.animate(
    [
      { transform: 'translate(0px, 0px) rotate(-12deg)'                                   } ,
      { transform: 'translate(' + distance_x + 'px, ' + distance_y + 'px) rotate(-12deg)' }
    ] ,
    { duration: 120 , easing: 'ease-out' , fill: 'forwards' }
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
    { duration: 280, easing: 'ease-out', fill: 'forwards' }
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