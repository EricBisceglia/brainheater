/*********************************************************************************************************************/
/*                                                                                                                   */
/*  draw_level  Draw a level on the game board.                                                                      */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Draw a level on the game board.
 *
 * @param   {number}  level_id  The id of the level to display.
 *
 * @returns {void}
 */

function draw_level(level_id)
{
  // Fetch the requested level
  const level = levels[level_id];

  // Stop here if the requested level does not exist
  if(!level)
    return;

  // Fetch the board's element id
  const board = document.getElementById('brain_board');

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
      if(x === level.start[0] && y === level.start[1])
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


/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                   INITIALIZATION                                                  */
/*                                                                                                                   */
/*********************************************************************************************************************/
// Draw the level on the game board
draw_level(0);