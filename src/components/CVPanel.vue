<template>
  <aside
    v-on-click-outside="() => opened = false"
    class="panel"
    :class="{
      opened,
    }"
    :inert="!opened"
  >
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components';
import { onKeyStroke } from '@vueuse/core';
import { watch } from 'vue';
import { definePanel } from '~/composables/panels';
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

<style lang="scss" scoped>
.panel {
  --panel-padding: 2rem;
  position: fixed;
  inset-block: 0rem;
  inset-inline-end: 0rem;
  translate: 100% 0rem;
  z-index: var(--z-panel);

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
