import Quill from 'quill';
import locales from './locales/locales';

const editor = {
  quill: null,
  colorsAreEnabled: true,
  translations: {},
  init: (selector, toolbarSelector, locale) => {

    if (typeof locale === 'undefined' || !locales.has(locale)) {
        locale = locales.default();
    }
    editor.translations = locales.get(locale);

    // icons
    const icons = Quill.import('ui/icons');
    icons.bold = `<b>${editor.translations.toolbar.bold}</b>`;
    icons.italic = `<b>${editor.translations.toolbar.italic}</b>`;
    icons.underline = `<b>${editor.translations.toolbar.underline}</b>`;
    icons.strike = `<b>${editor.translations.toolbar.strike}</b>`;
    icons.list = `<b>${editor.translations.toolbar.list}</b>`;
    icons.image = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
    `;

    // Initialize WYSIWYG editor
    const quill = editor.quill = new Quill(selector, {
      theme: 'snow',
      modules: {
        toolbar: toolbarSelector,
      },
      placeholder: '...',
    });

    quill.root.setAttribute('spellcheck', false);
    quill.focus();

    if (quill.getLength() === 1) {
      // If is blank, add a Welcome message
      quill.insertText(0, editor.translations.editor.welcome);
    }


    // @todo font is removed on paste
    // https://github.com/quilljs/quill/issues/1184

    quill.on('text-change', function (delta, oldDelta, source) {
      if (source != 'user') {
        return;
      }
      editor.applyColors();
    });


    editor.applyColors();
    editor.dealWithCopyPaste();
  },

  applyColors: () => {

    // reset format
    let quill = editor.quill;
    quill.formatText(0, quill.getText().length, {color: '#333'});

    if (!editor.colorsAreEnabled) {
      return;
    }

    // Color of letters
    const toColor = editor.translations.editor.colors;

    let text = quill.getText(); // remember to not trim text from break lines, otherwise positions are false

    if (text.length === 0) {
      return;
    }

    let pattern, indice;


    for (pattern of toColor) {
      let indices = editor.getIndicesOf(pattern.regex, text);

      if (0 == indices.length) {
        continue;
      }

      for (indice of indices) {
        quill.removeFormat(indice.end, 0);
      }
    }
  },

  toggleColor: (enabled) => {
    editor.colorsAreEnabled = enabled;
    editor.applyColors();
  },

  dealWithCopyPaste: () => {
    editor.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      let ops = [];
      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert
          });
        }
      });
      delta.ops = ops;
      return delta;
    });
  },

  getSelectedText: () => {
    let selection = editor.quill.getSelection();

    if (!selection) {
      return editor.getAllText();
    }

    let selectedContent = editor.quill.getContents(selection.index, selection.length);
    let tempContainer = document.createElement('div');
    let tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    let text = tempContainer.querySelector('.ql-editor').innerText;
    tempContainer.remove();

    return text;
  },

  getAllText: () => {
    return editor.quill.getText();
  },

  getIndicesOf: (searchStr, str,) => {

    let matches, indices = [];
    const regexp = RegExp(searchStr, 'gi');
    let captured, startAt = 0;
    while ((matches = regexp.exec(str)) !== null) {
      if (typeof (matches[1]) != 'undefined') {
        captured = matches[1];
        startAt = matches[0].indexOf(captured); // skip first chars
      } else {
        captured = matches[0];
        startAt = 0;
      }

      indices.push({
        start: matches.index + startAt,
        end: matches.index + startAt + captured.length,
        len: captured.length,
      });
    }
    return indices;
  },
  setText(text) {
    editor.quill.setText(text);
  }
};


export default editor;
