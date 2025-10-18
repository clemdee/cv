import { reactive } from 'vue';
import { i18n } from '~/i18n';

export const useState = () => {
  return reactive({
    locale: i18n.global.locale,
  });
};
