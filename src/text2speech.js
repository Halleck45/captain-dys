import Syllaber from "./syllaber";
import editor from "./editor";

var text2speech = {

    synth: null,

    init: (selector, editor) => {


        if (!'speechSynthesis' in window) {
            console.log('NOT AVAILABLE');
            return;
        }


        text2speech.synth = window.speechSynthesis;
        text2speech.editor = editor;

        document.querySelectorAll(selector).forEach(e => {
            e.addEventListener('click', () => {
                text2speech.speak();
            });
        });

        document.querySelectorAll('.btn-editor-syllabes').forEach(e => {
            e.addEventListener('click', () => {
                const sylab = new Syllaber;

                editor.setText(
                    sylab.split(editor.getAllText())
                );
                editor.applyColors();
            });
        });

        document.querySelectorAll('.chx-toggle-spellcheck').forEach(e => {
            e.addEventListener('change', (event) => {
                editor.quill.root.setAttribute('spellcheck', event.target.checked);
                editor.quill.focus();
            });
        });
        document.querySelectorAll('.chx-toggle-colors').forEach(e => {
            e.addEventListener('change', (event) => {
                editor.toggleColor(event.target.checked);
            });
        });

    },

    speak: () => {

        if (text2speech.synth.speaking) {
            console.error('speechSynthesis.speaking');
            return;
        }

        let whatToSay = text2speech.editor.getSelectedText();
        console.log('Speak', whatToSay);
        if (!whatToSay) {
            whatToSay = text2speech.editor.getAllText();
            console.log('Nothing to say');
        }


        var utterThis = new SpeechSynthesisUtterance();
        utterThis.text = whatToSay;
        utterThis.lang = 'fr-FR';
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        };

        utterThis.pitch = 1;
        utterThis.rate = 1;
        text2speech.synth.cancel();
        text2speech.synth.speak(utterThis);
    }
};

export default text2speech;
