<template>
  <div
    ref="root"
    class="settings-overlay"
  >
    <label
      class="settings-overlay-item locale"
      v-for="availableLocale in availableLocales"
      :key="availableLocale"
    >
      <input
        type="radio"
        name="locale"
        :value="availableLocale"
        v-model="locale"
      />
      <span>{{ availableLocale }}</span>
    </label>

    <button
      class="settings-overlay-item edit-mode"
      @click="state.isEditing = !state.isEditing"
    >
      <Icon icon="material-symbols-light:edit-document-outline-rounded" />
    </button>

    <button
      class="settings-overlay-item settings"
      @click="settingsPanel.opened = !settingsPanel.opened"
    >
      <Icon icon="material-symbols-light:settings-outline-rounded" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onMounted, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsPanel } from '~/composables/panels';
import { useState } from '~/stores/state';

const root = useTemplateRef('root');

const { availableLocales, locale } = useI18n();
const settingsPanel = useSettingsPanel();
const state = useState();

const viewport = window.visualViewport;
const dx = ref(0);
const dy = ref(0);
const scale = ref(1);

function viewportHandler() {
  if (!viewport) return;
  if (!root.value) return;
  dx.value = document.body.clientWidth - viewport.width - viewport.offsetLeft;
  dy.value = document.body.clientHeight - viewport.height - viewport.offsetTop;
  scale.value = 1 / viewport.scale;
}

onMounted(() => {
  viewportHandler();
});

window.visualViewport?.addEventListener("scroll", viewportHandler, { passive: true });
window.visualViewport?.addEventListener("resize", viewportHandler, { passive: true });
</script>

<style lang="scss" scoped>
.settings-overlay {
  --dx: calc(v-bind('dx') * 1px);
  --dy: calc(v-bind('dy') * 1px);
  --scale: v-bind('scale');

  --margin: 1rem;

  position: fixed;
  right: calc(var(--margin) * var(--scale) + var(--dx));
  bottom: calc(var(--margin) * var(--scale) + var(--dy));
  display: inline-flex;
  transform-origin: bottom right;
  scale: pow(var(--scale), 0.5);
  display: inline-flex;
  filter: drop-shadow(0rem 0rem 0.2rem #7773);

  @media print {
    display: none;
  }

  .settings-overlay-item {
    --border-radius: 0.5rem;
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3rem;
    border: 0.1rem solid #ccc;
    border-left-style: none;
    background-color: var(--colorscheme-content-background);
    color: var(--colorscheme-content-text);
    cursor: pointer;
    user-select: none;
    transition: 300ms;

    &:first-child {
      border-left-style: solid;
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }

  .locale {
    input[type="radio"] {
      display: none;
    }

    &:has(input:checked) {
      background-color: var(--colorscheme-main);
      color: var(--colorscheme-main-text);
      cursor: default;
    }
  }

  .settings,
  .edit-mode {
    font-size: 1.5rem;
  }
}
</style>
