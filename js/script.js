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
    toStrArr: () => Note.notes.map(note => KEY_NAME[note])
};

$(document).ready(() => {
    const $newBtn = $('#new-btn');
    const $printBtn = $('#print-btn');
    const $noteArea = $('#note-area');
    const $notePrototype = $('<div>').addClass('note');

    const keyMapping = KEY_MAPPING.QWERTY;

    $(this).keypress(e => {
        const note = keyMapping[e.keyCode];
        if (typeof note !== 'undefined') {
            Note.add(note);
        }
    });

    $(this).keyup(e => {
        if (e.keyCode === 8) {
            Note.backspace();
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