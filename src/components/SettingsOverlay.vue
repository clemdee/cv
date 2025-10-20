<template>
  <div
    ref="root"
    class="settings-overlay"
  >
    <div class="settings-overlay-group">
      <div class="settings-overlay-sub">
        <div class="settings-overlay-item locale">
          <Icon icon="material-symbols-light:language" />
        </div>

        <div class="settings-overlay-sub-list">
          <label
            class="settings-overlay-item locale-item"
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
        </div>
      </div>
    </div>

    <div class="settings-overlay-group">
      <button
        class="settings-overlay-item edit-mode"
        :class="{
          active: state.isEditing,
        }"
        @click="state.isEditing = !state.isEditing"
      >
        <Icon icon="material-symbols-light:edit-document-outline-rounded" />
      </button>

      <button
        class="settings-overlay-item settings"
        :class="{
          active: settingsPanel.opened,
        }"
        @click="settingsPanel.opened = !settingsPanel.opened"
      >
        <Icon icon="material-symbols-light:settings-outline-rounded" />
      </button>
    </div>
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
  gap: 0.5rem;
  transform-origin: bottom right;
  scale: pow(var(--scale), 0.5);
  display: inline-flex;
  filter: drop-shadow(0rem 0rem 0.2rem #7773);

  @media print {
    display: none;
  }

  .settings-overlay-group {
    --border-radius: 0.5rem;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-end;

    & > * {
      border: 0.1rem solid #ccc;
      border-left-style: none;
    }

    & > :first-child  {
      border-left-style: solid;
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    & > :last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }

  .settings-overlay-sub {
    position: relative;
    display: flex;
    flex-flow: column-reverse;
    overflow: visible;
    transition: height 100ms ease;

    & > :first-child  {
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }

    & > :last-child {
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }

    &:not(:focus, :has(:focus-visible), :hover) {
      overflow: hidden;
      height: 3rem;
    }
  }

  .settings-overlay-sub-list {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;

    & > :first-child  {
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
    }
  }

  .settings-overlay-item {
    flex-shrink: 0;
    position: relative;
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3rem;
    background-color: var(--colorscheme-content-background);
    font-size: 1.5rem;
    color: var(--colorscheme-content-text);
    cursor: pointer;
    user-select: none;
    transition: 300ms;
  }

  .locale-item {
    font-size: 1rem;

    input[type="radio"] {
      position: absolute;
      inset: 0rem;
      opacity: 0;
      cursor: inherit;
    }

    &:has(input:focus-visible) {
      outline: 0.1rem solid currentColor;
      outline-offset: 0.2rem;
      z-index: 999;
    }

    &:has(input:checked) {
      background-color: var(--colorscheme-secondary);
      color: var(--colorscheme-main-text);
      cursor: default;
    }
  }

  button {
    &.active {
      background-color: var(--colorscheme-secondary);
      color: var(--colorscheme-main-text);
    }
  }
}
</style>
