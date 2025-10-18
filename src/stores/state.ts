import { reactive, ref } from 'vue';
import { i18n } from '~/i18n';

const isEditing = ref(false);

export const useState = () => {
  return reactive({
    locale: i18n.global.locale,
    isEditing,
  });
};
