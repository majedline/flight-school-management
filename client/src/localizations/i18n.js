import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './locales/en.json';
import translationFr from './locales/fr.json';

const resources = {
    en: { translation: translationEn },
    fr: { translation: translationFr }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'en'
    });

export default i18n;