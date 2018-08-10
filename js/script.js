$(document).ready(() => {
    const $newBtn = $('#new-btn');
    const $printBtn = $('#print-btn');
    const $noteArea = $('#note-area');
    const $notePrototype = $('<div>').addClass('note');
    const $pointerPrototype = $('<div>&nbsp;</div>').addClass('note pointer no-print').attr('id', 'pointer');

    const keyMapping = KEY_MAPPING.QWERTY;

    $(this).keydown(e => {
        if (e.shiftKey || e.altKey) {
            return false;
        }
    });

    $(this).keyup(e => {

        if (Pointer.keyUp(e)) {
            return;
        }

        console.log(e.keyCode);

        if (e.keyCode === 8) {
            Note.backspace();
        } else if (e.keyCode === 32) {
            Note.add(SANSHIN.PAUSE);
        } else if (e.keyCode === 46) {
            Note.delete();
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

    $('button').click(() => {
        $('body').focus();
    });

    const render = () => {
        $noteArea.html('');
        
        let index = 0;
        Note.toStrArr().forEach(noteStr => {
            $noteArea.append(
                $notePrototype
                    .clone()
                    .html(noteStr)
                    .attr('note-index', index)
            );
            index++;
        });

        if (Pointer.current < Note.notes.length) {
            $pointerPrototype.clone().insertBefore($('div.note[note-index=' + Pointer.current + ']'));
        } else {
            $pointerPrototype.clone().appendTo($noteArea);
        }

        $('#pointer')[0].scrollIntoView();
    };

    $(Note).change(render);

    render();
});