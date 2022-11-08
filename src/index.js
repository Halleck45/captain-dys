import './styles/app.less';
import application from './application';

document.addEventListener('DOMContentLoaded', (event) => {
    application.init();
}, {once: true});
