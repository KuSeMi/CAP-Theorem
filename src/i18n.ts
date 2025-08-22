import { createI18n } from 'vue-i18n'
import en from './locales/en'
import uk from './locales/uk'

export type MessageLanguages = keyof typeof messages
export type MessageSchema = typeof messages['en']

const messages = {
  en,
  uk
}

export default createI18n<[MessageSchema], MessageLanguages>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})