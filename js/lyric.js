const Lyric = {
    lyrics: [],
    currentVerse: 0,
    elements: {
        $prevBtn: null,
        $nextBtn: null,
        $verseSpan: null
    },
    init: () => {
        Lyric.$prevBtn = $('#previous-verse-btn');
        Lyric.$nextBtn = $('#next-verse-btn');
        Lyric.$verseSpan = $('#verse-span');

        Lyric.$verseSpan.html(Lyric.verseStr());
        Lyric.$prevBtn.click(Lyric.nextVerse);
        Lyric.$nextBtn.click(Lyric.previousVerse);
    },
    nextVerse: () => {
        if (Lyric.currentVerse > 0) {
            Lyric.currentVerse--;
            Lyric.$verseSpan.html(Lyric.verseStr());
            $(Note).trigger('change');
        }
    },
    previousVerse: () => {
        Lyric.currentVerse++;
        Lyric.$verseSpan.html(Lyric.verseStr());
        $(Note).trigger('change');
    },
    verseStr: () => {
        return `歌詞：${Lyric.currentVerse + 1}番目`;
    },
    getLyric: (index) => {
        const verse = Lyric.currentVerse;
        if (typeof Lyric.lyrics[index] === 'undefined') {
            return null;
        }
        if (typeof Lyric.lyrics[index][verse] === 'undefined') {
            return null;
        }

        return Lyric.lyrics[index][verse];
    },
    setLyric: (index, lyric) => {
        const verse = Lyric.currentVerse;
        if (typeof Lyric.lyrics[index] === 'undefined') {
            for (let i = Lyric.lyrics.length; i <= index; i++) {
                Lyric.lyrics.push([]);
            }
        }

        if (Lyric.lyrics[index].length - 1 < verse) {
            for (let i = Lyric.lyrics[index].length; i < verse; i++) {
                Lyric.lyrics[index].push(null);
            }
        }
        Lyric.lyrics[index][verse] = lyric;
    },
    openEditor: () => {
        const index = Pointer.current < Note.notes.length ? Pointer.current : Note.notes.length - 1;
        $block = Block.selectBlock(index);

        const $openingEditor = $('#note-area .lyric-editor');
        if ($openingEditor.length) {
            const $openingBlock = $openingEditor.closest('.block');
            const openingIndex = $openingBlock.attr('note-index');
            const openingLyric = Lyric.getLyric(openingIndex);
            $openingBlock.find('.lyric').html(openingLyric ? openingLyric : '&nbsp;');
        }

        const $editor = $('#lyric-editor-prototype').clone(true);
        const $input = $editor.find('input');
        const $pointer = $('#pointer');

        $editor.attr('id', null).show();
        $pointer.hide();
        $block.find('.lyric').html($editor);
        $input.val(Lyric.getLyric(index)).focus();
        $input.keyup(e => {
            if (e.keyCode === 13) {
                Lyric.setLyric(index, $input.val());
                Pointer.current++;
                if (Pointer.current > Note.notes.length) {
                    Pointer.current = Note.notes.length;
                }
                $(Note).trigger('change');
                if (Pointer.current < Note.notes.length) {
                    Lyric.openEditor();
                }
            } else if (e.keyCode === 27) {
                let lyric = Lyric.getLyric(index);
                $block.find('.lyric').html(lyric ? lyric : '&nbsp;');
                $pointer.show();
            }
        });
    },
    keyUp: e => {
        if (e.keyCode === 33) {
            Lyric.previousVerse();
            return true;
        } else if (e.keyCode === 34) {
            Lyric.nextVerse();
            return true;
        }
        return false;
    }
};