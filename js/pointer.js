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
        } while (Note.notes[Pointer.current]);

        if (Pointer.current >= Note.notes.length) {
            Pointer.current = Note.notes.length;
        }
        $(Note).trigger('change');
    },
    moveWordLeft: () => {
        do {
            Pointer.current--;
        } while (Note.notes[Pointer.current - 1]);

        if (Pointer.current < 0) {
            Pointer.current = 0;
        }
        $(Note).trigger('change');
    },
    toFirst: () => {
        Pointer.current = 0;
        $(Note).trigger('change');
    },
    toLast: () => {
        Pointer.current = Note.notes.length;
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
            Pointer.toFirst();
            return true;
        } else if (e.keyCode === 35) {
            Pointer.toLast();
            return true;
        }

        return false;
    }
};