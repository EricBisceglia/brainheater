/*********************************************************************************************************************/
/*                                                                                                                   */
/*  level_draw          Draw a level on the game board.                                                              */
/*  level_select_draw   Generate the contents of the level selector.                                                 */
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

  // Check for erasers in the level
  const has_erasers = level.map.some(function(row)
  {
    return row.includes('E');
  });

  // Show the eraser inventory on levels that contain erasers
  document.getElementById('eraser_counter').hidden = !has_erasers;
  document.getElementById('eraser_count').textContent = 'x' + game.erasers;

  // Hide any previous death message
  document.getElementById('death_message').hidden = true;

  // Get rid of any death or victory popins
  board.classList.toggle('dead', game.status === 'dead');
  board.classList.toggle('won', game.status === 'won');

  // Fetch the level's grid size
  const grid_size = game.map.length;

  // Calculate the size of the board
  const board_size = 314 + Math.max(0, grid_size - 4) * 32;

  // Update the board and its container
  board.style.setProperty('--grid_size', grid_size);
  board.parentElement.style.setProperty('--board_size', board_size + 'px');

  // Delete any previously existing level
  board.replaceChildren();

  // Loop through rows
  for(let y = 0; y < game.map.length; y++)
  {
    // Loop through columns
    for(let x = 0; x < game.map[y].length; x++)
    {
      // Fetch the tile type
      const tile_type = game.map[y][x];

      // Draw the tile
      const tile = document.createElement('div');
      tile.classList.add('tile');

      // Lighten tiles along repeating diagonals (for decoration)
      if((x + y) % 3 === 0)
        tile.classList.add('tile_light');

      // Style the visited tiles
      if(game.visited.has(x + ',' + y))
        tile.classList.add('tile_visited');

      // Store the tile's coordinate
      tile.dataset.x    = x;
      tile.dataset.y    = y;
      tile.dataset.type = tile_type;

      // Determine the tile's appearance
      let tile_symbol = '';

      // Update it based on the tile's type
      switch(tile_type)
      {
        case 'X':
          tile.classList.add('tile_loss');
          tile_symbol = 'X';
          break;

        case '#':
          tile.classList.add('tile_gap');
          break;

        case 'J':
          tile.classList.add('tile_jump');
          tile_symbol = 'X';
          break;

        case 'G':
          tile.classList.add('tile_exit');
          tile_symbol = '⚑';
          break;

        case 'L':
          tile.classList.add('tile_launcher');
          tile_symbol = '↔';
          break;

        case '^':
          tile.classList.add('tile_arrow');
          tile_symbol = '↑';
          break;

        case '>':
          tile.classList.add('tile_arrow');
          tile_symbol = '→';
          break;

        case 'v':
          tile.classList.add('tile_arrow');
          tile_symbol = '↓';
          break;

        case '<':
          tile.classList.add('tile_arrow');
          tile_symbol = '←';
          break;

        case 'K':
          tile.classList.add('tile_key');
          break;

        case 'D':
          tile.classList.add('tile_loss', 'tile_locked');
          tile_symbol = 'X';
          break;

        case 'C':
          tile.classList.add('tile_crumble');
          const crumble = document.createElement('span');
          crumble.classList.add('crumble_icon');
          tile.append(crumble);
          break;

        case 'E':
          tile.classList.add('tile_eraser');
          const eraser = document.createElement('span');
          eraser.classList.add('eraser_icon');
          tile.append(eraser);
          break;

        default:
          if(/^[1-9]$/.test(tile_type))
          {
            tile.classList.add('tile_portal');
            tile_symbol = tile_type;
          }
          break;
      }

      // Add the tile symbol if required
      if(tile_symbol)
      {
        const symbol = document.createElement('span');
        symbol.textContent = tile_symbol;
        tile.append(symbol);
      }

      // Handle the player's starting position
      if(x === game.player_x && y === game.player_y)
      {
        const player = document.createElement('span');
        player.classList.add('player');
        tile.append(player);
        tile.classList.add('tile_player');
      }

      // Place the tile on the board
      board.append(tile);
    }
  }
}




/**
 * Generates the contents of the level selector.
 *
 * @returns {void}
 */

function level_select_draw()
{
  // Fetch the level selector elements
  const select  = document.getElementById('levelset_select');
  const buttons = document.getElementById('level_buttons');

  // Fetch the current level's levelset
  const current_set = levels[game.level].set;

  // Clear the level selector
  select.replaceChildren();
  buttons.replaceChildren();

  // Make a list of unlocked levelsets (+ the next upcoming levelset)
  for(const levelset of levelsets)
  {
    // Check for unlocked levelsets
    const unlocked = levelset_unlocked(levelset.id);

    // Prepare the data of unlocked levelsets for display
    const option       = document.createElement('option');
    option.value       = levelset.id;
    option.textContent = string_translate(levelset.name);
    option.disabled    = !unlocked;

    // Mention that locked levelsets are locked
    if(!unlocked)
      option.textContent += string_translate('set_locked');

    // Add the levelset to the selector
    select.append(option);

    // Hide everything beyond the next locked levelset
    if(!unlocked)
      break;
  }

  // Make the ending screen accessible at will once all levels have been beaten
  if(levels.every(function(level)
  {
    return game.completed.has(level.id);
  }))
  {
    const option       = document.createElement('option');
    option.value       = 'ending';
    option.textContent = string_translate('set_ending');
    select.append(option);
  }

  // Select the current level's levelset
  select.value = current_set;

  // Make a list of levels belonging to the current levelset
  for(let level_id = 0; level_id < levels.length; level_id++)
  {
    // Fetch each level's data
    const level = levels[level_id];

    // Skip levels belonging to another levelset
    if(level.set !== current_set)
      continue;

    // Fetch the level's completion state and create the level button
    const completed = game.completed.has(level.id);
    const button    = document.createElement('button');
    button.type     = 'button';
    button.classList.add('level_button');
    button.textContent = String(level_id + 1).padStart(2, '0');

    // Highlight the current level
    if(level_id === game.level)
      button.classList.add('selected');

    // Mark cleared levels as completed
    if(completed)
    {
      const check = document.createElement('span');
      check.classList.add('level_check');
      check.textContent = '✓';
      button.append(check);
    }

    // Load levels when clicked on (and return keyboard control to the game board else the game will become unplayble)
    button.addEventListener('click', function()
    {
      level_load(level_id);
      document.getElementById('brain_board').focus({ preventScroll: true });
    });

    // Draw the level buttons
    buttons.append(button);
  }
}