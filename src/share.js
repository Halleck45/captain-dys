import locales from './locales/locales';

const share = {

    editor: null,
    locale: null,

    init: (editor, locale) => {
        share.editor = editor;
        share.locale = locales.has(locale) ? locale : locales.default();

        document.querySelectorAll('.btn-editor-share').forEach((e) => {
            e.addEventListener('click', share.share);
        });
    },

    // Build a link that reopens the app with the current text (?text=... in the URL)
    buildUrl: () => {
        const text = share.editor.getAllText().trim();
        const url = new URL(window.location.href);
        url.searchParams.set('locale', share.locale);
        url.searchParams.set('text', text);
        return url.toString();
    },

    share: async () => {
        const text = share.editor.getAllText().trim();
        const url = share.buildUrl();
        const title = 'Captain Dys';

        // Web Share API (mobile-friendly: native share sheet on Android/iOS)
        if (navigator.share) {
            try {
                await navigator.share({title, text, url});
            } catch (err) {
                // user cancelled the share sheet: nothing to do
            }
            return;
        }

        // Fallback: copy the link to the clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(url);
                share.feedback();
                return;
            } catch (err) {
                // clipboard blocked: fall through to prompt
            }
        }

        // Last resort: show the link so the user can copy it manually
        window.prompt(title, url);
    },

    feedback: () => {
        document.querySelectorAll('.btn-editor-share').forEach((e) => {
            e.classList.add('active');
            setTimeout(() => e.classList.remove('active'), 1200);
        });
    },
};

export default share;
