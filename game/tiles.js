/*********************************************************************************************************************/
/*                                                                                                                   */
/*  tile_resolve          Resolves the effect of tile the player is standing on.                                     */
/*                                                                                                                   */
/*  key_collect           Collects a key and removes all matching hazards.                                           */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Resolves the effect of the tile the player is standing on.
 *
 * @param   {string}  direction  The direction the player entered from.
 *
 * @returns {Promise<void>}
 */

async function tile_resolve(direction)
{
  // Fetch the tile under the player
  const tile = game.map[game.player_y][game.player_x];

  // Numbers represent portal pairs
  const portal = /^[1-9]$/.test(tile);

  // Define arrow tile directions
  const arrows = {  '^': 'up'     ,
                    '>': 'right'  ,
                    'v': 'down'   ,
                    '<': 'left'   };

  // Check for repeating movement states
  if(tile === 'J' || tile === 'L' || arrows[tile] || portal)
  {
    // Serialize the current movement state
    const state = JSON.stringify([game.player_x, game.player_y, direction, game.map, game.erasers]);

    // Count how many times this movement state has occurred
    const visits = (game.chain.get(state) || 0) + 1;
    game.chain.set(state, visits);

    // Kill the player after four repetitions
    if(visits > 4)
    {
      player_die();
      return;
    }
  }

  // Handle teleporters
  if(portal)
  {
    await player_teleport(direction);
    return;
  }

  // Handle arrow tiles
  if(arrows[tile])
  {
    await player_move(arrows[tile], 1, true);
    return;
  }

  // Handle other tile effects
  switch(tile)
  {
    // Deadly tile
    case 'X':
      if(game.erasers === 0)
      {
        player_die();
        break;
      }

      // Spend eraser charges on deadly tiles if available
      game.erasers--;
      game.map[game.player_y][game.player_x] = '.';
      level_draw(game.level);
      break;

    // Locked deadly tiles
    case 'D':
    case '#':
      player_die();
      break;

    // Key
    case 'K':
      key_collect();
      break;

    // Jump
    case 'J':
      await player_move(direction, 2, true);
      break;

    // Launcher
    case 'L':
      await player_launch(direction);
      break;

    // Eraser pickups
    case 'E':
      game.erasers++;
      game.map[game.player_y][game.player_x] = '.';
      level_draw(game.level);
      break;

    // Exit
    case 'G':
      await player_win();
      break;
  }
}




/**
 * Collects a key and removes all matching hazards.
 *
 * @returns {void}
 */

function key_collect()
{
  // Remove the collected key
  game.map[game.player_y][game.player_x] = '.';

  // Look through the map for matching hazards
  for(let y = 0; y < game.map.length; y++)
  {
    for(let x = 0; x < game.map[y].length; x++)
    {
      // Turn locked tiles into regular tiles
      if(game.map[y][x] === 'D')
        game.map[y][x] = '.';
    }
  }

  // Update the game board
  level_draw(game.level);
}