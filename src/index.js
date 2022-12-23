import './styles/app.less';
import application from './application';

document.addEventListener('DOMContentLoaded', () => {
    application.init();
}, {once: true});
