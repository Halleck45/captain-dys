import locales from './locales/locales';
import application from './application';
import printer from './printer';
import sidebar from './sidebar';

class Layout {
  init(locale) {

    if (!locales.has(locale)) {
      locale = locales.default();
    }
    const translations = locales.get(locale);

    // Translations of page
    let elements = document.querySelectorAll('[data-label]');
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let key = element.getAttribute('data-label');
      if(typeof translations.layout[key] !== 'undefined') {
        element.innerHTML = translations.layout[key];
      }
    }

    // Selection of locale
    // data-role="locale-select"
    elements = document.querySelectorAll('[data-role="locale-select"]');
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.innerHTML = '';
      for (let availableLocale in locales.available()) {
        let option = document.createElement('option');
        option.value = availableLocale;
        option.innerHTML = locales.get(availableLocale).name;
        if (availableLocale === locale) {
          option.selected = true;
        }
        element.appendChild(option);
      }

      // deal with change: set the "locale" parameter in the URL
      element.addEventListener('change', (event) => {
        let url = new URL(window.location.href);
        url.searchParams.set('locale', event.target.value);
        let newRelativePathQuery = window.location.pathname + '?' + url.searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
        application.init();
      });
    }

    document.querySelectorAll('.burger-link').forEach(e => {
      e.removeEventListener('click', sidebar.toggle);
      e.addEventListener('click', sidebar.toggle);
    });
    document.querySelectorAll('.sidebar-outer').forEach(e => {
      e.removeEventListener('click', sidebar.toggle);
      e.addEventListener('click', sidebar.toggle);
    });
    document.querySelectorAll('.btn-editor-print').forEach(e => {
      e.removeEventListener('click', printer.print);
      e.addEventListener('click', printer.print);
    });
  }
}

export default Layout
