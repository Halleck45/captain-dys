import frFR from './fr-FR';
import enEN from './en-EN';


const locales = {
    available: () => {
        return {
            'fr-FR': frFR,
            'en-EN': enEN,
        };
    },

    get: (locale) => {
        return locales.available()[locale];
    },

    has: (locale) => {
        return locales.available().hasOwnProperty(locale);
    },

    default: () => {
        return 'fr-FR';
    }

}

export default locales;