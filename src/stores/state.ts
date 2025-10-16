import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

export const useState = () => {
  return reactive({
    locale,
  });
};
