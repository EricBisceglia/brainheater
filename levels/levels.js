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
 * .    Empty
 * X    Loss
 * J    Jump
 * L    Launcher
 * ^    Up arrow
 * v    Down arrow
 * <    Left arrow
 * >    Right arrow
 * K    Key
 * D    Lock
 * C    Crumbling
 * E    Eraser
 * 1-9  Portals
 * G    Goal
 */

const levels = [
  {
    id:   '0101',
    set:  1     ,
    map:  [
      ".....",
      "XXXX.",
      ".....",
      ".XXXX",
      "....G"
    ]
  },
  {
    id:   '0102',
    set:  1     ,
    map:  [
      "..J..",
      "XXXX.",
      ".XJ..",
      ".XXXX",
      "....G"
    ]
  },
  {
    id:   '0103',
    set:  1     ,
    map:  [
      ".XXXXX",
      ".JXJ.X",
      ".JXXXX",
      "..JXX.",
      "X.JXJ.",
      "X.J.XG"
    ]
  },
  {
    id:   '0104',
    set:  1     ,
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
    id:   '0105',
    set:  1     ,
    map:  [
      "..J.J.JX",
      "XJXXXXXJ",
      "XX...JX.",
      "XJ... XJ",
      "XX...JXX",
      "XJ....XJ",
      "XXXXJJX.",
      "...J..XG"
    ]
  },
  {
    id:   '0106',
    set:  1     ,
    map:  [
      ".XX...XX.",
      ".XX.J.XX.",
      "....X....",
      "JJJJJJJJJ",
      "XXXXXXXXX",
      "JJJJJJJJJ",
      "XXXX.....",
      "JXJX.XXXX",
      "XXXX..JXG"
    ]
  },
  {
    id:   '0107',
    set:  1,
    map:  [
      "..JJXX....X",
      ".XJXX..X..X",
      ".XJJ...X..X",
      ".X.JX..X.J.",
      ".X...X.X.JX",
      "JX.XJ..X.JX",
      ".J.J.JJXX.J",
      ".XXX.XX.XJ.",
      ".XJJXXX..XX",
      "......X....",
      "J.X..X....G"
    ]
  },
  {
    id:   '0108',
    set:  1,
    map:  [
      "...X.J.J.XXXX",
      "JJXJ.JXXXX...",
      "X.JX...X.X...",
      "X......XJXJ..",
      "XX.JXXXJ...XJ",
      "..JX..JJX..JX",
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
    id:   '0201',
    set:  2     ,
    map:  [
      "..J.K",
      "DXXXJ",
      "..J..",
      "..JDX",
      "..XDG"
    ]
  },
  {
    id:   '0301',
    set:  3     ,
    map:  [
      ".><..",
      "v.X^J",
      "v.JXX",
      "v><J.",
      ".J.^G"
    ]
  },
  {
    id:   '0401',
    set:  4     ,
    map:  [
      ".XX....",
      "..X...X",
      "LLXJJJL",
      "..LXXX.",
      "..XXLXX",
      "..X....",
      "X.X...G"
    ]
  },
  {
    id:   '0501',
    set:  5     ,
    map:  [
      ".CCJC",
      "CCCCC",
      "JCXCC",
      "CCCCX",
      "CJCCG"
    ]
  },
  {
    id:   '0601',
    set:  6     ,
    map:  [
      ".EEEE",
      "XXXXX",
      "XXXXX",
      "XXXXX",
      "XXXXG"
    ]
  },
  {
    id:   '0701',
    set:  7     ,
    map:  [
      "..J.1",
      "XXXXX",
      "1.XX2",
      "X.XX.",
      "X2XXG"
    ]
  },
  {
    id:   '0801',
    set:  8     ,
    map:  [
      "..",
      ".G"
    ]
  }
];
