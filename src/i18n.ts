import { createI18n } from 'vue-i18n';

import en from '~/locales/en.json';
import fr from '~/locales/fr.json';
import es from '~/locales/es.json';

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    es,
  },
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});
