import { createI18n } from 'vue-i18n';

import en from '~/locales/en.json';
import fr from '~/locales/fr.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
  },
  missing: () => '',
  missingWarn: true,
  fallbackWarn: false,
});

type I18nGlobal = (typeof i18n)['global'];

export const t: I18nGlobal['t'] = i18n.global.t;
export const tm: I18nGlobal['tm'] = i18n.global.tm;
