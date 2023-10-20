import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruTranslation from './language/ru.json';

const resources = {
  ru: {
    translation: ruTranslation
  }
};

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    lng: 'ru', // Set the default language here.
    fallbackLng: 'ru', // Fallback language if a translation is missing.
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default.
    }
  });

export default i18n;
