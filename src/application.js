import editor from "./editor";
import text2speech from "./text2speech";
import speech2ext from "./speech2ext";
import Layout from "./layout";
import Image2Text from "./image2text";
import help from "./help";
import share from "./share";

export default {
    init: () => {
        // Loading
        const divs = document.querySelectorAll('.loading-hide');
        [].forEach.call(divs, function (div) {
            // do whatever
            div.classList.remove("loading-hide");
        });
        const elem = document.querySelector('.loader');
        if(elem) {
            elem.parentNode.removeChild(elem);
        }

        // get locale (and optional shared text) from URL
        const params = new URLSearchParams(window.location.search);
        let locale = params.get('locale') || 'fr-FR';
        const sharedText = params.get('text');

        // Initializing editor
        editor.init("#editor", '#toolbar-container', locale);

        // If a shared text was passed in the URL, load it into the editor
        if (sharedText) {
            editor.setText(sharedText);
            editor.applyColors();
        }

        text2speech.init('.btn-editor-speak', editor);
        speech2ext.init(
            document.getElementById('btn-editor-listen'),
            editor
        );

        // Initializing Layout
        const layt = new Layout;
        layt.init(locale);

        // Initializing image2text
        const image2text = new Image2Text(editor);
        image2text.init('#photo', locale);

        // Help modal and share button
        help.init(locale);
        share.init(editor, locale);
    }
}
