const Block = {
    selectBlock: index => {
        return $(`#note-area div[note-index=${index}]`);
    }
};