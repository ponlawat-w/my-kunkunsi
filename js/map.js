const SANSHIN = {
    男: {
        合:   0b00001000,
        乙:   0b00001001,
        老:   0b00001010,
        下老: 0b00001011
    },
    中: {
        四:   0b00010000,
        上:   0b00010001,
        中:   0b00010010,
        尺:   0b00010011,
        下尺: 0b00010100,
    },
    女: {
        工:   0b00011000,
        五:   0b00011001,
        六:   0b00011010,
        七:   0b00011011,
        八:   0b00011100,
        九:   0b00011101
    },
    REPEAT: {
        START:0b11010000,
        END:  0b11010001
    },
    PAUSE:    0b00000000,
    SHARP:    0b10000000,
    FLAT:     0b01000000,
    MINI:     0b00100000,
    NEWLINE:  0b11000000,
    END:      0b11111111
};

const KEY_MAPPING = {
    QWERTY: {
        'z': SANSHIN.男.合,
        'x': SANSHIN.男.乙,
        'c': SANSHIN.男.老,
        'v': SANSHIN.男.下老,
        'a': SANSHIN.中.四,
        's': SANSHIN.中.上,
        'd': SANSHIN.中.中,
        'f': SANSHIN.中.尺,
        'g': SANSHIN.中.下尺,
        'q': SANSHIN.女.工,
        'w': SANSHIN.女.五,
        'e': SANSHIN.女.六,
        'r': SANSHIN.女.七,
        't': SANSHIN.女.八,
        'y': SANSHIN.女.九,
        '[': SANSHIN.REPEAT.START,
        ']': SANSHIN.REPEAT.END,
        32: SANSHIN.PAUSE
    }
};