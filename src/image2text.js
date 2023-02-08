import Tesseract from 'tesseract.js';

class Image2Text {

    constructor(editor) {
        this.editor = editor;
    }

    init(input, locale) {
        const map = {
            'fr-FR': 'fra',
            'en-EN': 'eng'
        };

        this.lang = map[locale];

        const inputElement = document.querySelector(input);
        inputElement.addEventListener('change', this.handleFileSelect.bind(this), false);
    }

    handleFileSelect(evt)  {
        const files = evt.target.files; // FileList object
        console.log(files, this.lang);
        Tesseract.recognize(
            files[0],
            this.lang,
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            this.editor.setText(text);
            this.editor.applyColors();
        });
    }
}


export default Image2Text;
