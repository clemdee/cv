
import { type Item } from '~/stores/data';
import { ref, readonly, reactive, watch } from 'vue';

export const useItemPanel = (() => {
  const item = ref<Item>();
  const opened = ref(false);

  const set = (newItem: Item) => {
    const oldItem = item.value;
    item.value = newItem;
    if (oldItem?.id === newItem.id) {
      opened.value = false;
    } else {
      opened.value = true;
    }
  };

  watch(opened, async () => {
    if (!opened.value) {
      item.value = undefined;
    }
  });

  return () => {
    return reactive({
      item: readonly(item),
      opened,
      set,
    });
  };
})();

export const useSettingsPanel = (() => {
  const opened = ref(false);

  return () => {
    return reactive({
      opened,
    });
  };
})();
