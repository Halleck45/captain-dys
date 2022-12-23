import editor from "./editor";
import text2speech from "./text2speech";
import speech2ext from "./speech2ext";
import Layout from "./layout";

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

        // get locale from URL
        let locale = window.location.search.replace('?locale=', '');
        if (!locale) {
            locale = 'fr-FR';
        }

        // Initializing editor
        editor.init("#editor", '#toolbar-container', locale);
        text2speech.init('.btn-editor-speak', editor);
        speech2ext.init(
            document.getElementById('btn-editor-listen'),
            editor
        );

        // Initializing Layout
        const layt = new Layout();
        layt.init(locale);
    }
};
