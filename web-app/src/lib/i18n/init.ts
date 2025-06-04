import { initReactI18next } from 'react-i18next'
import * as i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import * as en from './dictionaries/en.json'
import * as es from './dictionaries/es.json'
import * as fr from './dictionaries/fr.json'
import * as enLong from './dictionaries/long/en.json'
import * as esLong from './dictionaries/long/es.json'
import * as frLong from './dictionaries/long/fr.json'

export default i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: { ...en, long: enLong },
      },
      fr: {
        translation: { ...fr, long: frLong },
      },
      es: {
        translation: { ...es, long: esLong },
      },
    },
  })
