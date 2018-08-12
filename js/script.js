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
    const $blockPrototype = $('#block-prototype');
    const $newLinePrototype = $('<div>').addClass('newline');
    const $pointerPrototype = $('<div>').addClass('pointer no-print').attr('id', 'pointer');
    const $lyricEditorPrototype = $('#lyric-editor-prototype');

    $blockPrototype.hide();
    $lyricEditorPrototype.hide();

    const keyMapping = KEY_MAPPING.QWERTY;

    $('button, input').keyup(e => {
        e.preventDefault();
        return false;
    });

    $(this).keydown(e => {
        if (e.shiftKey || e.altKey
            || e.keyCode == 32 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 33 || e.keyCode === 34) {
            return false;
        }
    });

    $(this).keyup(e => {

        if (Pointer.keyUp(e)) {
            return;
        }

        if (Lyric.keyUp(e)) {
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
        } else if (e.key === '2') {
            Lyric.openEditor();
        } else if (e.keyCode === 13) {
            Note.add(SANSHIN.NEWLINE);
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
        FileIO.export(Note.notes, Lyric.lyrics, songName);
    });
    $importFile.change(() => {
        const file = $importFile[0].files[0];
        const fileName = file.name.split('.');
        changeSongName(fileName.splice(0, fileName.length - 1).join(''));

        FileIO.readFile(file)
        $importFile.val(null);
    });

    const noteClick = e => {
        Pointer.current = $(e.delegateTarget).attr('note-index');
        if ($(e.target).hasClass('lyric')) {
            Lyric.openEditor();
        } else {
            render();
        }
    };

    $blockPrototype.click(noteClick);
    $newLinePrototype.click(noteClick);

    const render = () => {
        $noteArea.html('');
    
        Note.notes.forEach((note, index) => {
            if (note === SANSHIN.NEWLINE) {
                $newLinePrototype
                    .clone(true)
                    .html('')
                    .attr('note-index', index)
                    .appendTo($noteArea);
                return true;
            }

            const noteString = Note.toStr(note);
            const $block = $blockPrototype
                .clone(true)
                .attr('note-index', index)
                .attr('id', null);
            $block.find('.note').html(noteString);
            $block.show();

            if (note & SANSHIN.MINI) {

                if (Note.isSingleDiminutive(index)) {
                    $block.addClass('single-diminutive');

                    Block.selectBlock(index - 1).addClass('no-border-right');
                } else {
                    $block.addClass('diminutive');
                }
            } else if (index > 0) {
                $previousBlock = Block.selectBlock(index - 1);
                if ($previousBlock.hasClass('single-diminutive')) {
                    $block.addClass('no-border-left');
                }
            }

            const lyric = Lyric.getLyric(index);
            if (lyric) {
                $block.find('.lyric').html(lyric);
            }
    
            $block.appendTo($noteArea);
        });
    
        let $pointer = $pointerPrototype.clone();

        if (Pointer.current < Note.notes.length && Block.selectBlock(Pointer.current).hasClass('single-diminutive')) {
            $pointer.hide();
        }

        if (Pointer.current < Note.notes.length) {
            $pointer.insertBefore($noteArea.find('div[note-index=' + Pointer.current + ']'));
        } else {
            $pointer.clone().appendTo($noteArea);
        }

        if (!Note.notes.length ||
            (Pointer.current === Note.notes.length && Note.notes[Note.notes.length - 1] === SANSHIN.NEWLINE) ||
            (Note.notes[0] & SANSHIN.MINI)) {
            $noteArea.find('.pointer').addClass('relative');
        }
    
        $pointer[0].scrollIntoView();
    };

    $(Note).change(render);

    render();
    Lyric.init();
});