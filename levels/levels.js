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
    id:   '0202',
    set:  2     ,
    map: [
      ".X.J.K",
      "JXJXXD",
      ".J.JJ.",
      "J.JXXX",
      "JX.D..",
      ".D.D.G"
    ]
  },
  {
    id:   '0203',
    set:  2     ,
    map: [
      ".JD.JXK",
      "JXXJXJ.",
      "X.JX.DJ",
      "KX..JX.",
      "JD..DX.",
      ".X.JX.X",
      ".J.X..G"
    ]
  },
  {
    id:   '0204',
    set:  2     ,
    map: [
      ".......X",
      ".XDXJXXX",
      ".XKX.J..",
      ".XXXJ..J",
      "J.J.JJ..",
      "....J...",
      "J...JJXD",
      ".J.X..XG"
    ]
  },
  {
    id:   '0205',
    set:  2     ,
    map: [
      "...JXJXXX",
      "...JXJ...",
      "JJJJXJJJJ",
      "XXXXXXXXX",
      "JJJJXJJJJ",
      ".J.JXJ...",
      "XJXJXJXKX",
      "...JXJXXX",
      ".D.JXJ.JG"
    ]
  },
  {
    id:   '0206',
    set:  2     ,
    map: [
      ".JJXXJXDJ",
      "..XJX.X.D",
      "JJJJXK.X.",
      ".X..JJJJD",
      "X...JJXD.",
      "XXJJJJ.XJ",
      ".JXJX..XX",
      "....D.X..",
      "J.XXD..XG"
    ]
  },
  {
    id:   '0207',
    set:  2     ,
    map: [
      "....DDJXJ.",
      ".XJ.DDJX.X",
      "J..JDDJXX.",
      ".JJ.DDJXXJ",
      ".XJ.DDJX.X",
      "JX.JDDJXJ.",
      "KX.XDDJXXJ",
      "XJ.JDDJX.X",
      "J.JXDDJXXJ",
      "...XDDJXXG"
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
    id:   '0302',
    set:  3     ,
    map: [
      ".JJ>vXJ",
      "...^<XX",
      "vJJ.XXX",
      "X.>.XXX",
      "X<.<.XJ",
      "v.JXv.X",
      "^..X..G"
    ]
  },
  {
    id:   '0303',
    set:  3     ,
    map: [
      "..JXJXX",
      "^vXX>J.",
      "...X.vv",
      "XXJJ.^J",
      "J.J>^JX",
      "....><v",
      ">J.JX^G"
    ]
  },
  {
    id:   '0304',
    set:  3     ,
    map: [
      ".>J.v.<X",
      ".X.v<vJ^",
      ".J.J.^X.",
      ">J..J.JJ",
      "..<>JX.^",
      ".X.X^...",
      ".J.J^<<X",
      ".J.JX>.G"
    ]
  },
  {
    id:   '0305',
    set:  3     ,
    map: [
      "..JDvv<X",
      "...XJ.^K",
      ".JX.J.J.",
      "JXX.Jv<<",
      "X<X..vXX",
      ">.XJ.JDX",
      "v.^XXX>D",
      "XDJ<JX^G"
    ]
  },
  {
    id:   '0306',
    set:  3     ,
    map: [
      ".J.JJJJ.X",
      "XXJXXXX..",
      "...X..vJJ",
      "J.JX..XJ<",
      "^.JX..JJJ",
      "JXJX<>^<J",
      ">JJXJJ..^",
      ".X.JXJX^X",
      ".JXJXJ..G"
    ]
  },
  {
    id:   '0307',
    set:  3     ,
    map: [
      "....XX<...",
      "JJJJXXJJJJ",
      "XXXXXXXXXX",
      "JJJJXXJJJJ",
      ".<..XX^^..",
      "v^.>XX.><.",
      "JJJJXXJJJJ",
      "XXXXXXXXXX",
      "JJJJXXJJJJ",
      "><>>JX..<G"
    ]
  },
  {
    id:   '0308',
    set:  3     ,
    map: [
      "...J.J.v..K",
      "..J.JXvJ...",
      ".J.DX>J.J.^",
      "J.>^.^.J.J<",
      ".J....J.X..",
      "J.J.^K.J.XJ",
      "^JJ.J^>>J.^",
      "JJ..<..^.^.",
      "..<.D.^.X^.",
      "vXv.X.J.J^v",
      "K.^.X.J.>^G"
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
    id:   '0402',
    set:  4     ,
    map: [
      ".LKX.XJ.",
      ".LX...X<",
      ".LX.XX.X",
      ".LKJ..J.",
      "DDDDDDDD",
      ".LX.JL.X",
      ".LKX..X.",
      "DLD.XX.G"
    ]
  },
  {
    id:   '0403',
    set:  4     ,
    map: [
      ".X...XL..",
      ".LJJXXX.X",
      ".J.XLJXJ.",
      "...LXJXXX",
      "..XXXXXJL",
      "J.X.LXJX.",
      "XXJXLJ..X",
      ".JXJJLLXX",
      "X...X...G"
    ]
  },
  {
    id:   '0404',
    set:  4     ,
    map: [
      "..L.X.....",
      "..L.XLLLXX",
      "..L.......",
      "LLLLLLXXXX",
      "..L.......",
      "..LXX...XX",
      "..L..X..X.",
      "LLL..XLLLL",
      "..L..L..XX",
      ".XL.XL..XG"
    ]
  },
  {
    id:   '0405',
    set:  4     ,
    map: [
      "....XXX..XL.",
      "XX.LX.....X.",
      ".L.LX.LXX.X.",
      "XX..X..LX..X",
      ".L..XL..XL.X",
      ".X.LXL.XL..X",
      "XL.X...X..LX",
      "LX....XX.LX.",
      ".X.LLX...XX.",
      "..XXX..LXXLX",
      "......LXXLXX",
      ".LXXXXX..XXG"
    ]
  },
  {
    id:   '0406',
    set:  4     ,
    map: [
      ".JXJ.J.J.JX..",
      "..JXJ.JJ.XXL.",
      "X.X..L<<L..XJ",
      "....J.J^J.J.v",
      "JXvXX......X.",
      "...<^.JJJ.J.K",
      "X^XXX.J.J.J.X",
      "....J.XJ...XL",
      ".JX..J.^..X..",
      "...X..X.v..XJ",
      "XJ.LX..XX..J.",
      "...J.JKJJJ.^D",
      "..X...JX.J.XG"
    ]
  },
  {
    id:   '0501',
    set:  5     ,
    map: [
      "..XXK",
      "..CC.",
      "J.XJ.",
      "XCXXX",
      "...DG"
    ]
  },
  {
    id:   '0502',
    set:  5     ,
    map: [
      ".J.C..",
      ".C.XXJ",
      "JX.JXK",
      ".X.X.X",
      "CJXCX.",
      ".XCCDG"
    ]
  },
  {
    id:   '0503',
    set:  5     ,
    map: [
      "..CKXK.",
      "..XXCX.",
      "J.J..JX",
      "CD.J..J",
      "..J.DC.",
      "XCX.CDD",
      "XKX.J.G"
    ]
  },
  {
    id:   '0504',
    set:  5     ,
    map: [
      ".C.XKC.J.",
      "C..L<XX.^",
      "..L...X.v",
      "XLX..^.J.",
      "X...X.JXX",
      "CJ.JX.C..",
      "J....XJL.",
      ".JX>XKJCX",
      "...J.CXDG"
    ]
  },
  {
    id:   '0505',
    set:  5     ,
    map: [
      ".CCCXXXCXX",
      "CXXCCXJCCC",
      "XCCJCCCCLC",
      "CCCXXCXXCC",
      "CJCXXXXXCX",
      "CCCXLCCCCC",
      "CCLXXXXCXC",
      "CCCCKCXCKC",
      "CXCXXCXXXX",
      "KXCCCCXXDG"
    ]
  },
  {
    id:   '0601',
    set:  6     ,
    map: [
      ".XEX.",
      ".X.XX",
      ".X.XE",
      ".X.XX",
      "EX.XG"
    ]
  },
  {
    id:   '0602',
    set:  6     ,
    map: [
      ".JJJ..J",
      "XXXXX..",
      "XXXJ..X",
      ".E.X..X",
      "..J..XJ",
      "XJXJXXJ",
      ".XJX..G"
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
    map: [
      "...XXJDX.",
      "...Jv.JJ.",
      ">XXXX.C..",
      "X.J.J.XJJ",
      "C^J.^XX..",
      ".X...C...",
      ".K>J..C..",
      "X.X.X..CD",
      ".D.XJXXDG"
    ]
  },
  {
    id:   '0802',
    set:  8     ,
    map: [
      ".X.JX.X..",
      "vJ.X1....",
      "J<DJX..J.",
      ".JX..D.>.",
      "...JJX..J",
      "..XX...XX",
      "J...K.X.X",
      ".X..>J.1.",
      "..J..<..G"
    ]
  },
  {
    id:   '0803',
    set:  8     ,
    map: [
      ".XXXJ..JJC",
      ".XX>2X.XJX",
      "..XC.XXX^.",
      "XC.DK.CXXX",
      "Cv.....<..",
      "..JJ.LJX.X",
      "XXJ1J..C.J",
      ".X>XJ..vX.",
      ".XL2L..D1.",
      "J....XXX.G"
    ]
  }
];
