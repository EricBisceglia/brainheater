/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                     LEVELSETS                                                     */
/*                                                                                                                   */
/*********************************************************************************************************************/

const levelsets = [
  { id: 1,  name: 'set_first_pages' },
  { id: 2,  name: 'set_keys'        },
  { id: 3,  name: 'set_arrows'      },
  { id: 4,  name: 'set_launchers'   },
  { id: 5,  name: 'set_crumblers'   },
  { id: 6,  name: 'set_erasers'     },
  { id: 7,  name: 'set_portals'     },
  { id: 8,  name: 'set_final_pages' }
];




/*********************************************************************************************************************/
/*                                                                                                                   */
/*                                                      LEVELS                                                       */
/*                                                                                                                   */
/*********************************************************************************************************************/

/**
 * .  Empty
 * X  Loss
 * J  Jump
 * L  Launcher
 * G  Goal
 * K  Key
 * D  Lock
 */

const levels = [
  {
    id:     '0101',
    set:    1,
    map:    [
      ".....",
      "XXXX.",
      ".....",
      ".XXXX",
      "....G"
    ]
  },
  {
    id:     '0102',
    set:    1,
    map:    [
      "..J..",
      "XXXX.",
      ".XJ..",
      ".XXXX",
      "....G"
    ]
  },
  {
    id:     '0103',
    set:    1,
    map:    [
      ".JXXXX",
      ".JXJ.X",
      ".JXXXX",
      "..JXJ.",
      "X.JXX.",
      "X..JXG"
    ]
  },
  {
    id:     '0104',
    set:    1,
    map:    [
      "..J.X..",
      ".XX.XXJ",
      "JX..JX.",
      "XX.XXXJ",
      "JX..X..",
      ".XX.X..",
      ".JX.X.G"
    ]
  },
  {
    id:     '0105',
    set:    1,
    map:    [
      "..J.J.J.",
      "XJXXXXXJ",
      "XX...JX.",
      "XJ...JXJ",
      "XX...JX.",
      "XJ....XJ",
      "XXXXJJX.",
      "...J..XG"
    ]
  },
  {
    id:     '0106',
    set:    1,
    map:    [
      ".XX...XX.",
      ".XX.J.XX.",
      "....X....",
      "JJJJJJJJJ",
      "XXXXXXXXX",
      "JJJJJJJJJ",
      "XXXX.....",
      "JXJX.XJXX",
      "XXXX..JXG"
    ]
  },
  {
    id:     '0107',
    set:    1,
    map:    [
      "..JJX.....X",
      ".XJXX.XX..X",
      ".XJJ...X..X",
      ".X.JX..X.J.",
      ".X...X.X.JX",
      "JX.XJ..X.JX",
      ".J.J.JJXX.J",
      ".XXX.XX.XJ.",
      ".XJJXXX..XX",
      "......X....",
      "JXX..X....G"
    ]
  },
  {
    id:     '0108',
    set:    1,
    map:    [
      "...X.J.J.XXXX",
      "JJXJ.JXXXX...",
      "X.JX...X.X...",
      "X......XJXJ..",
      "XX.JXXXJ...J.",
      "..JX..JJX..J.",
      "J...J.X...XJJ",
      "XXXX...X.XJ.X",
      "X.XJ.X.X...XJ",
      "X.X.XXJJ....X",
      "XX.X.JXJ.X.X.",
      "XXXX.......X.",
      "XXJ..XJX.X.XG"
    ]
  },
  {
    id:     '0201',
    set:    2,
    map:    [
      "..J.K",
      "DXXXJ",
      "..J..",
      "..JDX",
      "..XDG"
    ]
  },
  {
    id:     '0401',
    set:    4,
    map: [
      "..X....",
      "..X...X",
      "..XJJJL",
      "..LXXX.",
      "..XXLXX",
      "..X....",
      "..X..JG"
    ]
  },
];
