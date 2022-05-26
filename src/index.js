//import 'quill/dist/quill.snow.css'

import './styles/app.less';

import editor from './editor'
import text2speech from './text2speech';
import Layout from './layout';
import Syllaber from "./syllaber";

let loader;

document.addEventListener('DOMContentLoaded', (event) => {

    // Loading
    var divs = document.querySelectorAll('.loading-hide');
    [].forEach.call(divs, function(div) {
        // do whatever
        div.classList.remove("loading-hide");
    });
    var elem = document.querySelector('.loader');
    elem.parentNode.removeChild(elem);


    // Initializing
    editor.init("#editor", '#toolbar-container');
    text2speech.init('.btn-editor-speak', editor);

    // Layout
    const layt = new Layout;
    layt.init();



}, {once: true});
