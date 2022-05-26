import Quill from 'quill';

var editor = {
  quill: null,
  colorsAreEnabled: true,
  init: (selector, toolbarSelector) => {

    // icons
    var icons = Quill.import('ui/icons');
    icons['bold'] = '<b>Gras</b>';
    icons['italic'] = '<em>Italique</em>';
    icons['underline'] = '<u>Souligné</u>';
    icons['strike'] = '<strike>Barré</strike>';
    icons['list'] = '• Liste';
    icons['image'] = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
    `;

    var quill = editor.quill = new Quill(selector, {
      theme: 'snow',
      modules: {
        toolbar: toolbarSelector,
      },
      placeholder: '...',
    });

    quill.root.setAttribute('spellcheck', false);


    quill.focus();

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

    const toColor = [
      // muet
      {regex: "(t)['-\\s+\\.,;\!\?]", color: '#CCC'}, // end t
      {regex: "(?:[nm])([nm])", color: '#CCC'}, // double n/m
      {regex: "(?:p)(p)", color: '#CCC'}, // double n/m
      {regex: "(?:l)(l)", color: '#CCC'}, // double ll
      {regex: "(?:(?<!ou))(s)['-\\s+\\.,;\!\?]", color: '#CCC'}, // end s

      // sounds
      {regex: "(a[nm])(?![aeiyounm])", color: '#60A5FA'}, // an not followed by vowel or n/m
      {regex: "(e[nm])(?![aeiyounm])", color: '#60A5FA'}, // en not followed by vowel or n/m
      {regex: "(ai)(?:(?![nm])|([nm][aeiyou]))", color: '#059669'}, // ai not followed by n,m, or followed by n,m but without vowel after
      {regex: "(ai[nm]?)(?![aeiyou])", color: '#DB2777'}, // ain / aim not followed by vowel
      {regex: "(ou)", color: '#D97706'}, // ou
      {regex: "(oi)", color: '#60A5FA'}, // ou
      {regex: "(ion)[\\s+\\.,;\!\?]", color: '#A78BFA'}, // ion
      {regex: "(gn)", color: '#3B82F6'}, // gn
      {regex: "(?:(?<!i))(on)", color: '#10B981'}, // on not previoused by vowel
      {regex: "ch", color: '#3B82F6'}, // ch
      {regex: "eu", color: '#3B82F6'}, // eu
      {regex: "(?:q)(u)", color: '#CCC'}, // qu (fix bug)
      {regex: "(?:g)(u)", color: '#CCC'}, // qu (fix bug)
      {regex: "(un)(?![aeiyounm])", color: '#F59E0B'}, // un not followed by vowel
      {regex: "(un[aeiyounm])", color: '#10B981'}, // un +  vowel
      {regex: "(œu)", color: '#F59E0B'}, //œu
      {regex: "(ien)['-\\s+\\.,;\!\?]", color: '#F59E0B'}, // ien

      // tool words
      {regex: "['-\\s+\\.,;\!\?](et|est)['-\\s+\\.,;\!\?]", color: '#A78BFA'}, // et
      {regex: "['-\\s+\\.,;\!\?](où)['-\\s+\\.,;\!\?]+", color: '#A78BFA'}, // où
    ];


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

      //console.log(pattern, indices, 'text', text);
      for (indice of indices) {
        let delta = quill.formatText(indice.start, indice.len, {
          color: pattern.color
        }, true);

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
      let ops = []
      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert
          })
        }
      })
      delta.ops = ops
      return delta
    })
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
