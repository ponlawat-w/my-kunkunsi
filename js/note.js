const NOTE_STR = {
    0b00000: '〇',
    0b01000: '合',
    0b01001: '乙',
    0b01010: '老',
    0b01011: '下老',
    0b10000: '四',
    0b10001: '上',
    0b10010: '中',
    0b10011: '尺',
    0b10100: '下尺',
    0b11000: '工',
    0b11001: '五',
    0b11010: '六',
    0b11011: '七',
    0b11100: '八',
    0b11101: '九'
};

const SPECIAL_STR = {
    0b10000000: '♯',
    0b01000000: '♭',
    0b11010000: '↳',
    0b11010001: '↰'
};

const Note = {
    notes: [],
    isValid: note => {
        if (note == SANSHIN.PAUSE
            || note == SANSHIN.NEWLINE
            || note == SANSHIN.END
            || note == SANSHIN.REPEAT.START
            || note == SANSHIN.REPEAT.END) {
            return true;
        }

        if ((note & 0b11000000) === 0b11000000) {
            // Invalid SharpFlat
            return false;
        }

        if (!(note & 0b00011000)) {
            // Invalid Line
            return false;
        }

        return true;
    },
    isSingleDiminutive: index => {
        if (index < 0 || index >= Note.notes.length) {
            return false;
        }

        if (Lyric.getLyric(index)) {
            return false;
        }

        return (Note.notes[index] & SANSHIN.MINI)
            && !(Note.notes[index - 1] & SANSHIN.MINI) 
            && !(Note.notes[index + 1] & SANSHIN.MINI);
    },
    add: note => {
        if (!Note.isValid(note)) {
            return;
        }

        if (Pointer.current < Note.notes.length) {
            Note.notes.splice(Pointer.current, 0, note);
            Lyric.lyrics.splice(Pointer.current, 0, []);
        } else {
            Note.notes.push(note);
        }
        Pointer.moveRight();
        $(Note).trigger('change');
    },
    shrink: () => {
        const index = Pointer.current >= Note.notes.length ? Note.notes.length - 1 : Pointer.current;
        if (index > -1) {
            let note = Note.notes[index];
            if (note >> 6 === 0b11) {
                return;
            }

            const currentMini = note & SANSHIN.MINI;
            if (currentMini) {
                note &= ~SANSHIN.MINI;
            } else {
                note |= SANSHIN.MINI;
            }

            Note.notes[index] = note;
            $(Note).trigger('change');
        }
    },
    pushFromStream: note => {
        if (!Note.isValid(note)) {
            return;
        }

        Note.notes.push(note);
    },
    backspace: () => {
        Note.notes.splice(Pointer.current - 1, 1);
        Lyric.lyrics.splice(Pointer.current - 1, 1);

        Pointer.current--;
        if (Pointer.current < 0) {
            Pointer.current = 0;
        }
        $(Note).trigger('change');
    },
    delete: () => {
        if (Pointer.current < Note.notes.length) {
            Note.notes.splice(Pointer.current, 1);
            Lyric.lyrics.splice(Pointer.current, 1);
            $(Note).trigger('change');
        }
    },
    backspaceWord: () => {
        let startIndex = Pointer.current - 1;
        while (Note.notes[startIndex - 1]
            && Note.notes[startIndex - 1] >> 4 !== 0b1101
            && Note.notes[startIndex - 1] !== SANSHIN.NEWLINE) {
            startIndex--;
        }
        if (startIndex < 0) {
            startIndex = 0;
        }
        const size = Pointer.current - startIndex;
        Note.notes.splice(startIndex, size);
        Lyric.lyrics.splice(startIndex, size);
        Pointer.current -= size;
        $(Note).trigger('change');
    },
    deleteWord: () => {
        let lastIndex = Pointer.current + 1;
        while (Note.notes[lastIndex]
            && Note.notes[lastIndex] >> 4 !== 0b1101
            && Note.notes[lastIndex] !== SANSHIN.NEWLINE) {
            lastIndex++;
        }
        if (lastIndex > Note.notes.length) {
            lastIndex = Note.notes.length;
        }
        const size = lastIndex - Pointer.current;
        if (!size) {
            return;
        }
        Note.notes.splice(Pointer.current, size);
        Lyric.lyrics.splice(Pointer.current, size);
        $(Note).trigger('change');
    },
    clear: () => {
        Note.notes = [];
        Lyric.lyrics = [];
        Pointer.current = 0;
        $(Note).trigger('change');
    },
    toStr: val => {
        if (val >> 4 === 0b1101 || val === SANSHIN.NEWLINE) {
            // Repeat mark
            return SPECIAL_STR[val];
        }

        let note = NOTE_STR[val & 0b0011111];
        let sharpFlat = val & 0b11000000;
        if (sharpFlat) {
            note += SPECIAL_STR[sharpFlat];
        }
        return note;
    }
};