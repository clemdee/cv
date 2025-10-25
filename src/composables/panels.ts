import type { Ref } from 'vue';
import type { Item } from '~/stores/data';
import { reactive, readonly, ref, watch } from 'vue';

const panels = new Set<Ref<boolean>>();

export const definePanel = (panel: Ref<boolean>) => {
  panels.add(panel);

  watch(panel, () => {
    panels.forEach((_panel) => {
      if (_panel === panel) return;
      _panel.value = false;
    });
  });
};

export const useItemPanel = (() => {
  const item = ref<Item>();
  const opened = ref(false);

  const set = (newItem: Item) => {
    const oldItem = item.value;
    item.value = newItem;
    if (oldItem?.id === newItem.id) {
      opened.value = false;
    }
    else {
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
