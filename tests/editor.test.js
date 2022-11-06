import editor from './../src/editor'

test('Editor initialization configures Quill editor ', () => {
    document.body.innerHTML = `<div><div id="toolbar" /><div id="editor" /></div>`;
    editor.init("#editor", '#toolbar');

    expect(document.body.innerHTML).toContain('ql-toolbar');
    expect(document.body.innerHTML).toContain('contenteditable');
});