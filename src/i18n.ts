import type { DateSpan } from './stores/data';
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

export const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  const options: Intl.DateTimeFormatOptions = {};
  if (year) options.year = 'numeric';
  if (month) options.month = 'short';
  if (day) options.day = '2-digit';

  const formatter = new Intl.DateTimeFormat(
    i18n.global.locale.value,
    options,
  );
  return formatter.format(new Date(date));
};

export const formatDateSpan = (dateSpan: DateSpan | undefined = {}) => {
  const from = dateSpan.from
    ? formatDate(dateSpan.from)
    : '';
  const to = dateSpan.to
    ? formatDate(dateSpan.to)
    : '';
  const sep = from && to ? ' - ' : '';
  return `${from}${sep}${to}`;
};
