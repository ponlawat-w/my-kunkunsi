const Note = {
    notes: [],
    isValid: note => {
        if (!note) {
            return true;
        }

        const line = note & 0b00111000;

        if (line != 0b00001000 && line != 0b00010000 && line != 0b00100000) {
            return false;
        }

        return true;
    },
    add: note => {
        if (!Note.isValid(note)) {
            return;
        }

        if (Pointer.current < Note.notes.length) {
            Note.notes.splice(Pointer.current, 0, note);
        } else {
            Note.notes.push(note);
        }
        Pointer.moveRight();
        $(Note).trigger('change');
    },
    pushFromStream: note => {
        if (!Note.isValid(note)) {
            return;
        }

        Note.notes.push(note);
    },
    backspace: () => {
        Note.notes.splice(Pointer.current - 1, 1);
        Pointer.moveLeft();
        $(Note).trigger('change');
    },
    delete: () => {
        if (Pointer.current < Note.notes.length) {
            Note.notes.splice(Pointer.current, 1);
            $(Note).trigger('change');
        }
    },
    backspaceWord: () => {
        let startIndex = Pointer.current - 1;
        while (Note.notes[startIndex - 1]) {
            startIndex--;
        }
        if (startIndex < 0) {
            startIndex = 0;
        }
        const size = Pointer.current - startIndex;
        Note.notes.splice(startIndex, size);
        Pointer.current -= size;
        $(Note).trigger('change');
    },
    deleteWord: () => {
        let lastIndex = Pointer.current + 1;
        while (Note.notes[lastIndex]) {
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
        $(Note).trigger('change');
    },
    clear: () => {
        Note.notes = [];
        Pointer.current = 0;
        $(Note).trigger('change');
    },
    toStr: val => {
        let note = KEY_NAME[val & 0b00111111];
        let sharpFlat = val & 0b11000000;
        if (sharpFlat) {
            note += KEY_NAME[sharpFlat];
        }
        return note;
    },
    toStrArr: () => Note.notes.map(note => Note.toStr(note))
};