const Pointer = {
    current: 0,
    moveRight: () => {
        if (Pointer.current < Note.notes.length) {
            Pointer.current++;
            $(Note).trigger('change');
        }
    },
    moveLeft: () => {
        if (Pointer.current > 0) {
            Pointer.current--;
            $(Note).trigger('change');
        }
    },
    moveWordRight: () => {
        do {
            Pointer.current++;

            if (Note.notes[Pointer.current] >> 4 === 0b1101) {
                break;
            }
        } while (Note.notes[Pointer.current]);

        if (Pointer.current >= Note.notes.length) {
            Pointer.current = Note.notes.length;
        }
        $(Note).trigger('change');
    },
    moveWordLeft: () => {
        do {
            Pointer.current--;

            if (Note.notes[Pointer.current] >> 4 === 0b1101) {
                break;
            }
        } while (Note.notes[Pointer.current - 1]);

        if (Pointer.current < 0) {
            Pointer.current = 0;
        }
        $(Note).trigger('change');
    },
    moveBeginLine: () => {
        do {
            Pointer.current--;
        } while (Pointer.current > 0 && Note.notes[Pointer.current - 1] !== SANSHIN.NEWLINE);

        if (Pointer.current < 0) {
            Pointer.current = 0;
        }
        $(Note).trigger('change');
    },
    moveEndLine: () => {
        do {
            Pointer.current++;
        } while (Pointer.current < Note.notes.length && Note.notes[Pointer.current] !== SANSHIN.NEWLINE);

        if (Pointer.current >= Note.notes.length) {
            Pointer.current = Note.notes.length;
        }
        $(Note).trigger('change');
    },
    moveUp: () => {
        let lengthFromNewLine = 0;
        let index = Pointer.current;
        while (index > 0 && Note.notes[index - 1] !== SANSHIN.NEWLINE) {
            index--;
            lengthFromNewLine++;
        }

        if (index > 0) {
            index--;
            const currentNewLine = index;
            do {
                index--;
            }
            while (index > 0 && Note.notes[index] !== SANSHIN.NEWLINE);

            const previousNewLine = index;
            const previousLineSize = currentNewLine - previousNewLine;
            index = previousLineSize > lengthFromNewLine ? previousNewLine + lengthFromNewLine : currentNewLine;
        }
        
        if (index < 0) {
            index = 0;
        }

        Pointer.current = index;
        $(Note).trigger('change');
    },
    moveDown: () => {
        let lengthFromNewLine = 0;
        let index = Pointer.current;
        while (index > 0 && Note.notes[index - 1] !== SANSHIN.NEWLINE) {
            index--;
            lengthFromNewLine++;
        }

        let nextNewLine = Pointer.current;
        while (nextNewLine < Note.notes.length) {
            if (Note.notes[nextNewLine] === SANSHIN.NEWLINE) {
                break;
            }
            nextNewLine++;
        }

        if (nextNewLine < Note.notes.length) {
            let nextNextNewLine = nextNewLine;
            do {
                nextNextNewLine++;
                if (Note.notes[nextNextNewLine] === SANSHIN.NEWLINE) {
                    break;
                }
            } while (nextNextNewLine < Note.notes.length);  
            const nextNewLineSize = nextNextNewLine - nextNewLine + 1;
            index = nextNewLineSize > lengthFromNewLine ? nextNewLine + 1 + lengthFromNewLine : nextNextNewLine;
        } else {
            index = Note.notes.length;
        }

        if (index > Note.notes.length) {
            index = Note.notes.length;
        }

        Pointer.current = index;
        $(Note).trigger('change');
    },
    keyUp: e => {
        if (e.keyCode === 37) {
            if (e.ctrlKey) {
                Pointer.moveWordLeft();
            } else {
                Pointer.moveLeft();
            }

            return true;
        } else if (e.keyCode === 39) {
            if (e.ctrlKey) {
                Pointer.moveWordRight();
            } else {
                Pointer.moveRight();
            }

            return true;
        } else if (e.keyCode === 36) {
            Pointer.moveBeginLine();
            return true;
        } else if (e.keyCode === 35) {
            Pointer.moveEndLine();
            return true;
        } else if (e.keyCode === 38) {
            Pointer.moveUp();
            return true;
        } else if (e.keyCode === 40) {
            Pointer.moveDown();
            return true;
        }

        return false;
    }
};