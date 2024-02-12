import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useState = defineStore('state', () => {

  const { locale } = useI18n();

  return {
    locale,
  }
});
