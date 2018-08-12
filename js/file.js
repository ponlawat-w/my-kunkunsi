const FileIO = {
    export: (notes, fileName = 'mynote') => {
        fileName = fileName.trim();
        fileName = fileName ? fileName : 'mynote';

        const blobData = new Blob([new Uint8Array(notes)], {type: 'data:application/kunkunsi-note'});
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
        arrayBuffer.forEach(note => Note.pushFromStream(note));
        Pointer.current = Note.notes.length;
        $(Note).trigger('change');
    },
    readFile: file => {
        const fileReader = new FileReader();
        fileReader.onload = f => {
            FileIO.import(f.target.result);
        };
        fileReader.readAsArrayBuffer(file);
    }
};