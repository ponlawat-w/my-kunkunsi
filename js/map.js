const SANSHIN = {
    男: {
        合: 0b001000,
        乙: 0b001001,
        老: 0b001010,
        下老: 0b001011
    },
    中: {
        四: 0b010000,
        上: 0b010001,
        中: 0b010010,
        尺: 0b010011,
        下尺: 0b010100,
    },
    女: {
        工: 0b100000,
        五: 0b100001,
        六: 0b100010,
        七: 0b100011,
        八: 0b100100,
        九: 0b100101
    },
    PAUSE: 0,
    他: {
        〇: 0
    }
};

const KEY_NAME = {
    0: '〇',
    0b001000: '合',
    0b001001: '乙',
    0b001010: '老',
    0b001011: '下老',
    0b010000: '四',
    0b010001: '上',
    0b010010: '中',
    0b010011: '尺',
    0b010100: '下尺',
    0b100000: '工',
    0b100001: '五',
    0b100010: '六',
    0b100011: '七',
    0b100100: '八',
    0b100101: '九'
};

const KEY_MAPPING = {
    QWERTY: {
        113: SANSHIN.男.合,
        119: SANSHIN.男.乙,
        101: SANSHIN.男.老,
        114: SANSHIN.男.下老,
        97: SANSHIN.中.四,
        115: SANSHIN.中.上,
        100: SANSHIN.中.中,
        102: SANSHIN.中.尺,
        103: SANSHIN.中.下尺,
        122: SANSHIN.女.工,
        120: SANSHIN.女.五,
        99: SANSHIN.女.六,
        118: SANSHIN.女.七,
        98: SANSHIN.女.八,
        110: SANSHIN.女.九,
        32: SANSHIN.PAUSE
    }
};