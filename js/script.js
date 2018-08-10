const Note = {
    notes: [],
    add: note => {
        Note.notes.push(note);
        $(Note).trigger('change');
    },
    backspace: () => {
        Note.notes.splice(Note.notes.length - 1);
        $(Note).trigger('change');
    },
    clear: () => {
        Note.notes = [];
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

$(document).ready(() => {
    const $newBtn = $('#new-btn');
    const $printBtn = $('#print-btn');
    const $noteArea = $('#note-area');
    const $notePrototype = $('<div>').addClass('note');

    const keyMapping = KEY_MAPPING.QWERTY;

    $(this).keydown(e => {
        if (e.shiftKey || e.altKey) {
            return false;
        }
    });

    $(this).keyup(e => {
        if (e.keyCode === 8) {
            Note.backspace();
        } else if (e.keyCode === 32) {
            Note.add(SANSHIN.PAUSE);
        } else {
            let note = keyMapping[e.keyCode] ? keyMapping[e.keyCode] : keyMapping[e.keyCode + 32];

            if (typeof note !== 'undefined') {

                if (!(e.shiftKey & e.altKey)) {
                    if (e.shiftKey) {
                        note |= SANSHIN.SHARP;
                    } else if (e.altKey) {
                        note |= SANSHIN.FLAT;
                    }
                }

                Note.add(note);
            }
        }
    });

    $newBtn.click(() => {
        Note.clear();
    });

    $printBtn.click(() => {
        window.print();
    });

    const render = () => {
        $noteArea.html('');
        Note.toStrArr().forEach(noteStr => {
            $noteArea.append($notePrototype.clone().html(noteStr));
        });
        window.scrollTo(0, document.body.scrollHeight);
    };

    $(Note).change(render);
});