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
      "XJ....XJ",
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
      "LLLLLXXXXX",
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
    id:   '0603',
    set:  6     ,
    map: [
      "..L..X..",
      "..C.J.<v",
      "X..J.^.J",
      "JX.X.XXE",
      ".XXX.XL.",
      "XXJXXJXX",
      "X...X.X.",
      "X.<.JX.G"
    ]
  },
  {
    id:   '0604',
    set:  6     ,
    map: [
      "..X.EXE.",
      ".EX..XE.",
      "XXXXXXXX",
      "..X..X.E",
      "J.X.JX..",
      "XXXXXDDD",
      "..X..D..",
      ".KX..D.G"
    ]
  },
  {
    id:   '0605',
    set:  6     ,
    map: [
      "..X..JX.K",
      ".X..J..X.",
      "..J.J..XJ",
      "..XX..X..",
      ".J.XXXX.J",
      "..X.X.XX.",
      "..JXJ.XXX",
      ".JX.XE.DX",
      "X.J.JX.DG"
    ]
  },
  {
    id:   '0606',
    set:  6     ,
    map: [
      "...LXE.J..",
      "....XX.L..",
      "..JX..XXXX",
      ".X...JXJ..",
      "JEJX...X..",
      "..XJ.XX..X",
      "J.XXX.XEXX",
      "..X.J.JXXX",
      "JXXXX.XXXX",
      "..J...XXXG"
    ]
  },
  {
    id:   '0607',
    set:  6     ,
    map: [
      "..J..X.J..E",
      "..XJXXXX.XX",
      ".J.J.XJ....",
      "X.X..XX.XJ.",
      ".JX.JX.J...",
      "XXXXXXXXXXX",
      "...XJX..J..",
      "X.J..XXJ.X.",
      "JX...X..J.X",
      ".XJX.XJ.XXD",
      "K..JXX.XXDG"
    ]
  },
  {
    id:   '0608',
    set:  6     ,
    map: [
      "....X......",
      "..EEXX...XX",
      "XX...XXXXX.",
      ".XXX.XXXX..",
      "...XXXXEX..",
      "...XXXX.XXE",
      "X...X.X..XX",
      "XXXXX...XXX",
      "..XXXX.XX..",
      ".XXE.XXXX..",
      "EXX....X..G"
    ]
  },
  {
    id:   '0701',
    set:  7     ,
    map: [
      "....1",
      "XXXXX",
      "1.X2.",
      "..XX.",
      ".2XXG"
    ]
  },
  {
    id:   '0702',
    set:  7     ,
    map: [
      "...JX.",
      ".J.1..",
      "X.X.XX",
      ".1.X.2",
      "..XJ.X",
      "2.X..G"
    ]
  },
  {
    id:   '0703',
    set:  7     ,
    map: [
      "..X..3.",
      "X..1.X.",
      "4XX..X.",
      ".3X.X2.",
      "...1.X.",
      "XXX..XX",
      "E.2.X4G"
    ]
  },
  {
    id:   '0704',
    set:  7     ,
    map: [
      "...X1X...",
      "..J.L.JX.",
      ".J...X.XJ",
      "X.1..X.X.",
      "2.XXXD3.J",
      "3.XD.J.J.",
      "LX4...X.X",
      "..X..X...",
      "XK.J2..4G"
    ]
  },
  {
    id:   '0705',
    set:  7     ,
    map: [
      "..1.X....5",
      "....X.2.X.",
      "..2.9X..6X",
      ".3..X.XXXX",
      "..XX..9X.4",
      "XX.41..X..",
      "..X...XX7.",
      ".3.XXX8XXX",
      "...X7...6X",
      "5.X.8....G"
    ]
  },
  {
    id:   '0706',
    set:  7     ,
    map: [
      "..JDJ1JJJJ..",
      "...XX.XXXX..",
      "3..J.JX5.XJJ",
      "J.J.4..X.X..",
      "XX...XJXJJ3J",
      "J.XXX.2X..J.",
      "DX4..XDJX..J",
      ".XXJJ.JX5XX.",
      "..J....X.X.2",
      "..JXJ.XX.J..",
      "XX....D.J.XX",
      "K.1..XX....G"
    ]
  },
  {
    id:   '0801',
    set:  8     ,
    map: [
      "..1E",
      "L..X",
      "212.",
      ".XXG"
    ]
  },
  {
    id:   '0802',
    set:  8     ,
    map: [
      ".CKX.",
      ".XXXJ",
      ".>...",
      "vXLvD",
      ".CC^G"
    ]
  },
  {
    id:   '0803',
    set:  8     ,
    map: [
      "..LXKE",
      "..X^^^",
      "LX.JX<",
      "X<.J.1",
      "J<XX><",
      "E<1DLG"
    ]
  },
  {
    id:   '0804',
    set:  8     ,
    map: [
      "..CX3CC",
      "C1.XC2.",
      ".CCXJ.C",
      "XXXDXXX",
      "X.3XJCE",
      "K1JX^2X",
      "X<CX.XG"
    ]
  },
  {
    id:   '0805',
    set:  8     ,
    map: [
      ".1CCCCCX",
      "CXCXCLCC",
      "CCLXCCCE",
      "CXXXXXXX",
      "CCCKC1CC",
      "XXJXCDDD",
      "JXXXCDXX",
      "CCCXCDXG"
    ]
  },
  {
    id:   '0806',
    set:  8     ,
    map: [
      "...DXJDX.",
      "..CJJ.JJ.",
      "1JXXX.C..",
      "X.J.J.XJJ",
      "C^J..XX.1",
      ".X...C..J",
      ".K>J..X..",
      "XLX.X..XD",
      ".D.XJ.XDG"
    ]
  },
  {
    id:   '0807',
    set:  8     ,
    map: [
      ".XXXX..JJC",
      ".XX>2..XJ.",
      "..XC.XXX^J",
      "XC.D..CXXX",
      "Cv.....<.K",
      "..JJ.LJX.X",
      "XXJ1...C.J",
      ".X>XJ..vX.",
      ".XL2L..D1.",
      ".....XXX.G"
    ]
  },
  {
    id:   '0808',
    set:  8     ,
    map: [
      "...1XXX2...",
      "...2XXX.XJ.",
      "...3XXX.XX.",
      "...4XXX3..v",
      "XXXXXXXXXXX",
      "E..EXXXXXXX",
      "XXXXXXXXXXX",
      ".EXEXXX4J.^",
      "..X.XXXXL..",
      "XXXXXEX...X",
      "E.XEX.X1>XG"
    ]
  },
  {
    id:   '0809',
    set:  8     ,
    map: [
      ".J.J.JJJJJJ.",
      "JJ.X..XXXXX.",
      "...XJ.JJJJJ.",
      "..X..J.JXXXX",
      "X.XJX.J.JJ..",
      "XJX.XJ.J.XX.",
      ".X.JXJXXXJ..",
      "..J.XJX.X.J.",
      ".J.XXJXJ.X.J",
      "J.J.XJX.J.X.",
      ".J.XXJXJ.J.X",
      "..J.J.X.J.JG"
    ]
  },
  {
    id:   '0810',
    set:  8     ,
    map: [
      ".JvJJJJJJJJ<1",
      "XELvXJXJ9JXJ<",
      "v6J2vJ7J^JXJ4",
      "LXXXvX>LXXv<v",
      "5XJJJXJXJ<v8<",
      ">LXXXvvJXJ<Xv",
      "3DDJvvL>JJvKJ",
      ">LCC7JC^2<LJ<",
      ">JCJC6C4vJCJ<",
      "^CC^8>>J3>vL5",
      ">JCv^C>LCJvv<",
      "9CC>^CJCJ^>Lv",
      ">J1JCJ^>^^<CG"
    ]
  }
];
