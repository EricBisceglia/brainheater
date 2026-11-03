/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      LEVELS                                                       */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * Temporary structure.
 * Player always starts top left.
 * dots are empty tiles, J is a jump pad, X is a hazard, G is the end goal.
 */

const levels = [
  {
    name: 'First level',
    start: [0, 0],
    map: [
      '....',
      '.JX.',
      '.XX.',
      '...G'
    ]
  }
];