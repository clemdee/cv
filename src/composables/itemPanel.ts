

import { type Item } from '~/stores/data';
import { ref, readonly, reactive, watchEffect, watch } from 'vue';
import { wait } from '~/composables/utils';

const item = ref<Item>();
const opened = ref(false);
let isClosing = false;

const open = () => {
  opened.value = true;
};

const close = () => {
  opened.value = false;
};

const toggle = () =>{
  if (opened.value) {
    close();
  } else {
    open();
  }
};

const set = (newItem: Item) => {
  const oldItem = item.value;
  item.value = newItem;
  if (oldItem?.id === newItem.id && isClosing) {
    close();
  } else {
    isClosing = false;
    open();
  }
};

watch(opened, async () => {
  if (!opened.value) {
    isClosing = true;
    await wait(1);
    if (isClosing) {
      item.value = undefined;
    }
  }
})

export const useItemPanel = () => {
  return reactive({
    item: readonly(item),
    set,
    opened,
    open,
    close,
    toggle,
  });
};