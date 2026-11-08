/*********************************************************************************************************************/
/*                                                                                                                   */
/*  player_move           Moves the player one tile in the requested direction.                                      */
/*  player_launch         Launches the player to the edge of the board in the requested direction.                   */
/*  player_teleport       Teleports the player through a portal.                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Moves the player one tile in the requested direction.
 *
 * @param   {string}  direction  The direction to move (up, down, left, right).
 * @param   {number}  distance   The number of tiles to move.
 * @param   {boolean} forced     Whether the movement is forced (eg. by a directional arrow).
 * @param   {boolean} impact     Whether the movement will trigger an impact animation upon hitting a wall.
 *
 * @returns {Promise<void>}
 */

async function player_move( direction         ,
                            distance  = 1     ,
                            forced    = false ,
                            impact    = false )
{
  // Stop here if the player isn't allowed to move
  if(game.status !== 'playing')
    return;

  // Each move initiated by the player starts a chain
  if(!forced)
    game.chain.clear();

  // Fetch the player's current position
  let next_x = game.player_x;
  let next_y = game.player_y;

  // Calculate the requested position after moving
  switch(direction)
  {
    case 'up':
      next_y -= distance;
      break;

    case 'down':
      next_y += distance;
      break;

    case 'left':
      next_x -= distance;
      break;

    case 'right':
      next_x += distance;
      break;

    default:
      return;
  }

  // Check whether the player hit the edge of the game board
  const hit_wall = next_x < 0
                || next_y < 0
                || next_x >= game.map[0].length
                || next_y >= game.map.length;

  // Handle hitting the edge of the board
  if(hit_wall)
  {
    // Prevent walking outside of the board
    if(!forced && distance === 1)
      return;

    // Kill players sent outside of the board by an arrow
    if(distance === 1)
    {
      player_die();
      return;
    }

    // Shorten any jump to the last tile of the board to avoid being sent OOB
    next_x = Math.max(0, Math.min(next_x, game.map[0].length - 1));
    next_y = Math.max(0, Math.min(next_y, game.map.length - 1));

    // When sent at a wall, trigger the impact animation
    if(next_x === game.player_x && next_y === game.player_y)
    {
      animate_impact(direction);
      return;
    }
  }

  // Remember which generation this movement belongs to
  const generation = game.generation;

  // Temporarily prevent additional movement
  game.status = 'moving';

  // Animate the player towards the destination
  await animate_player(next_x, next_y);

  // Stop here if the level was restarted during movement
  if(generation !== game.generation)
    return;

  // Collapse any crumbled tiles
  if(game.map[game.player_y][game.player_x] === 'C')
    game.map[game.player_y][game.player_x] = '#';

  // Remember the coordinates of the tile the player has just left
  game.visited.add(game.player_x + ',' + game.player_y);

  // Update the player's position
  game.player_x = next_x;
  game.player_y = next_y;

  // Allow movement to resume
  game.status = 'playing';

  // Draw the level after the player has moved
  level_draw(game.level);

  // Trigger an impact animation when a player is thrown at a wall
  if(impact || hit_wall)
    animate_impact(direction);

  // Resolve the effects of the tile the player landed on
  await tile_resolve(direction);
}




/**
 * Launches the player to the edge of the board in the requested direction.
 *
 * @param   {string}  direction  The direction to launch the player in (up, down, left, right).
 *
 * @returns {Promise<void>}
 */

async function player_launch(direction)
{
  // Calculate the distance to the edge of the board in the requested direction
  let distance = 0;
  switch(direction)
  {
    case 'up':
      distance = game.player_y;
      break;

    case 'down':
      distance = game.map.length - 1 - game.player_y;
      break;

    case 'left':
      distance = game.player_x;
      break;

    case 'right':
      distance = game.map[0].length - 1 - game.player_x;
      break;
  }

  // Stop here if the player is already at the edge
  if(distance === 0)
    return;

  // Move the player to the edge and resolve the landing tile
  await player_move(direction, distance, true, true);
}




/**
 * Teleports the player through a portal.
 *
 * @param   {string}  direction  The direction in which the player travels through the portal.
 *
 * @returns {Promise<void>}
 */

async function player_teleport(direction)
{
  // Fetch the portal's number
  const number = game.map[game.player_y][game.player_x];

  // Find all other portals with the same number
  const pair = [];

  for(let y = 0; y < game.map.length; y++)
  {
    for(let x = 0; x < game.map[y].length; x++)
    {
      if(game.map[y][x] === number)
        pair.push([x, y]);
    }
  }

  // Ignore wrong portal pairs
  if(pair.length !== 2)
  {
    console.warn('Portal ' + number + ' is not paired.');
    return;
  }

  // Find the portal's exit
  const destination = pair.find(function(position)
  {
    return position[0] !== game.player_x
        || position[1] !== game.player_y;
  });

  // Remember the portal through which the player entered
  game.visited.add(game.player_x + ',' + game.player_y);

  // Move the player to the exit portal
  game.player_x = destination[0];
  game.player_y = destination[1];
  level_draw(game.level);

  // Define the exit offsets based on the direction the player is moving
  const directions = {
    up:    [ 0, -1],
    right: [ 1,  0],
    down:  [ 0,  1],
    left:  [-1,  0]
  };

  // Determine the position in which the player will step after exiting the portal
  const step   = directions[direction];
  const next_x = game.player_x + step[0];
  const next_y = game.player_y + step[1];

  // If the exit faces a wall, stop on the portal and shake the board
  if(next_x < 0 || next_y < 0 || next_x >= game.map[0].length || next_y >= game.map.length)
  {
    animate_impact(direction);
    return;
  }

  // Step out of the portal and resolve the landing tile
  await player_move(direction, 1, true);
}