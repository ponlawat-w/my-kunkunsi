$(document).ready(() => {
    let songName = '';
    const $songNameSpan = $('#song-name-span');
    const $songNameInput = $('#song-name-input');
    const $songNameSubmitBtn = $('#song-name-submit-btn');

    const $newBtn = $('#new-btn');
    const $printBtn = $('#print-btn');
    const $exportBtn = $('#export-btn');
    const $importFile = $('#import-file');
    const $noteArea = $('#note-area');
    const $notePrototype = $('<div>').addClass('note');
    const $pointerPrototype = $('<div>&nbsp;</div>').addClass('note pointer no-print').attr('id', 'pointer');

    const keyMapping = KEY_MAPPING.QWERTY;

    $('button, input').keyup(e => {
        e.preventDefault();
        return false;
    });

    $(this).keydown(e => {
        if (e.shiftKey || e.altKey) {
            return false;
        }
    });

    $(this).keyup(e => {

        if (Pointer.keyUp(e)) {
            return;
        }

        if (e.keyCode === 8) {
            if (e.ctrlKey) {
                Note.backspaceWord();
            } else {
                Note.backspace();
            }
        } else if (e.keyCode === 46) {
            if (e.ctrlKey) {
                Note.deleteWord();
            } else {
                Note.delete();
            }
        } else if (e.keyCode === 32) {
            Note.add(SANSHIN.PAUSE);
        } else if (e.key === '1') {
            Note.shrink();
        } else {
            let note = keyMapping[e.key.toLowerCase()];

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

    const changeSongName = newName => {
        songName = newName;

        if (songName.trim()) {
            $songNameSpan.html(' - ' + songName);
        } else {
            $songNameSpan.html('');
        }
    };

    $songNameSubmitBtn.click(() => {
        changeSongName($songNameInput.val());
        $songNameInput.val('');
    });

    $newBtn.click(() => {
        Note.clear();
        changeSongName('');
    });
    $printBtn.click(() => {
        window.print();
    });
    $exportBtn.click(() => {
        FileIO.export(Note.notes, songName);
    });
    $importFile.change(() => {
        const file = $importFile[0].files[0];
        const fileName = file.name.split('.');
        changeSongName(fileName.splice(0, fileName.length - 1).join(''));

        FileIO.readFile(file)
        $importFile.val(null);
    });

    $notePrototype.click(function() {
        Pointer.current = $(this).attr('note-index');
        render();
    });
    
    const render = () => {
        $noteArea.html('');
    
        let index = 0;
        Note.notes.forEach(note => {
            const noteString = Note.toStr(note);
            const $note = $notePrototype
                            .clone(true)
                            .html(noteString)
                            .attr('note-index', index);
            if (note & SANSHIN.MINI) {
                $note.addClass('diminutive');
            }
    
            $note.appendTo($noteArea);
    
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