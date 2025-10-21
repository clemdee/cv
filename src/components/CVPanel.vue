<template>
  <aside
    class="panel"
    :class="{
      opened: opened,
    }"
    v-on-click-outside="() => opened = false"
  >
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';
import { onKeyStroke } from '@vueuse/core';
import { wait } from '~/composables/utils';

const opened = defineModel<boolean>({ default: false });
definePanel(opened);

// Fix issue when clicking on the open button outside of the panel
// instantly reopens the panel instead of closing it
let closing = false;

watch(opened, async () => {
  if (opened.value && closing) {
    opened.value = false;
  }
  if (!opened.value) {
    closing = true;
    await wait(1);
    closing = false;
  }
}, { flush: 'sync' });

onKeyStroke('Escape', (event) => {
  if (!opened.value === false) return;
  event.preventDefault();
  opened.value = false;
});
</script>

<script lang="ts">
import { watch, type Ref } from 'vue';
const panels = new Set<Ref<boolean>>();

const definePanel = (panel: Ref<boolean>) => {
  panels.add(panel);

  watch(panel, () => {
    panels.forEach((_panel) => {
      if (_panel === panel) return;
      _panel.value = false;
    })
  });
};
</script>

<style lang="scss" scoped>
.panel {
  --panel-padding: 2rem;
  position: fixed;
  inset-block: 0rem;
  inset-inline-end: 0rem;
  translate: 100% 0rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;

  width: 30rem;
  padding: var(--panel-padding);
  box-shadow: 0rem 0rem 0.5rem black;

  color: var(--colorscheme-content-text);
  background-color: var(--colorscheme-content-background);

  transition: translate 200ms ease;

  &.opened {
    translate: 0rem 0rem;
  }

  @media print {
    display: none;
  }

  @media screen and (width < 60rem) {
    inset-inline: 0rem;
    inset-block-start: unset;
    inset-block-end: 0rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: unset;
    height: 30rem;
  }
}
</style>
