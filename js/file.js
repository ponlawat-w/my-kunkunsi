const FileIO = {
    export: (notes, lyrics, fileName = 'mynote') => {
        fileName = fileName.trim();
        fileName = fileName ? fileName : 'mynote';

        if (notes[notes.length - 1] !== SANSHIN.END) {
            notes.push(SANSHIN.END);
        }

        const footer = {
            title: fileName,
            lyrics: lyrics
        };
        const footerJSON = JSON.stringify(footer);

        const blobData = new Blob([new Uint8Array(notes), footerJSON], {type: 'data:application/kunkunsi-note'});
        const $a = $('<a>');
        const url = window.URL.createObjectURL(blobData);
        $a.attr('href', url)
            .attr('download', fileName + '.kks').appendTo($('body'));
        $a[0].click();
        window.URL.revokeObjectURL(url);
        $a.remove();
    },
    import: data => {
        let arrayBuffer = new Uint8Array(data);
        Note.notes = [];
        let lastIndex = -1;
        for (let i = 0; i < arrayBuffer.length; i++) {
            const byte = arrayBuffer[i];
            if (byte === SANSHIN.END) {
                lastIndex = i;
                break;
            }
            Note.pushFromStream(byte);
        }

        let title = null;
        if (lastIndex > -1) {
            arrayBuffer = arrayBuffer.slice(lastIndex + 1);
            const string = (new TextDecoder('utf-8')).decode(arrayBuffer);
            if (string) {
                const jsonFooter = JSON.parse(string);
                if (jsonFooter) {
                    Lyric.lyrics = typeof jsonFooter.lyrics === 'undefined' ? [] : jsonFooter.lyrics;
                    title = typeof jsonFooter.title === 'undefined' ? null : jsonFooter.title;
                }
            }
        }
    
        Pointer.current = Note.notes.length;
        $(Note).trigger('change');

        return title;
    },
    readFile: file => {
        const fileReader = new FileReader();
        fileReader.onload = f => {
            FileIO.import(f.target.result);
        };
        fileReader.readAsArrayBuffer(file);
    }
};