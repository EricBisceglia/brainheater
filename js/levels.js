/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      LEVELS                                                       */
/*                                                                                                                   */
/*********************************************************************************************************************/

const levelsets = [
  {
    name: 'The first pages'
  },
  {
    name: 'More pages'
  }
];

/**
 * . empty tile
 * J jump pad
 * X hazard
 * G end goal
 */

const levels = [
  {
    name: 'First level',
    set: 0,
    start: [0, 0],
    map: [
      '.J.J',
      '.JXX',
      '.XX.',
      '.J.G'
    ]
  },
  {
    name: 'Second level',
    set: 0,
    start: [0, 0],
    map: [
      '.J.J.',
      '.JXX.',
      '.XX..',
      '.J...',
      '....G'
    ]
  },
  {
    name: 'Third level',
    set: 1,
    start: [0, 0],
    map: [
      '.J.J..',
      '.JXX..',
      '.XX...',
      '.J....',
      '......',
      '.....G'
    ]
  }
];