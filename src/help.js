import locales from './locales/locales';

const help = {

    init: (locale) => {
        if (!locales.has(locale)) {
            locale = locales.default();
        }
        const translations = locales.get(locale);
        const content = translations.help;

        const modal = document.getElementById('help-modal');
        if (!modal || !content) {
            return;
        }

        // Fill the modal with the localized content
        document.getElementById('help-title').innerHTML = content.title;
        document.getElementById('help-intro').innerHTML = content.intro;

        const list = document.getElementById('help-list');
        list.innerHTML = '';
        content.items.forEach((item) => {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            strong.textContent = item.label + ' : ';
            li.appendChild(strong);
            li.appendChild(document.createTextNode(item.text));
            list.appendChild(li);
        });

        // Open on click of the help button
        document.querySelectorAll('.btn-editor-help').forEach((e) => {
            e.addEventListener('click', help.open);
        });

        // Close on click of the close button or on the overlay background
        const closeBtn = document.getElementById('help-close');
        if (closeBtn) {
            closeBtn.textContent = content.close;
            closeBtn.removeAttribute('data-label');
            closeBtn.addEventListener('click', help.close);
        }
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                help.close();
            }
        });
    },

    open: () => {
        const modal = document.getElementById('help-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    close: () => {
        const modal = document.getElementById('help-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },
};

export default help;
