<template>
  <OverlayWrapper class="settings-overlay">
    <div class="settings-overlay-group">
      <div class="settings-overlay-sub">
        <div class="settings-overlay-item locale">
          <Icon icon="material-symbols-light:language" />
        </div>

        <div class="settings-overlay-sub-list">
          <label
            v-for="availableLocale in availableLocales"
            :key="availableLocale"
            class="settings-overlay-item locale-item focus-wrapper"
          >
            <input
              v-model="locale"
              type="radio"
              name="locale"
              :value="availableLocale"
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
        title="Edit visible items"
        @click="state.isEditing = !state.isEditing"
      >
        <Icon icon="material-symbols-light:edit-document-outline-rounded" />
      </button>

      <button
        class="settings-overlay-item settings"
        :class="{
          active: settingsPanel.opened,
        }"
        title="Settings"
        @click="settingsPanel.opened = !settingsPanel.opened"
      >
        <Icon icon="material-symbols-light:settings-outline-rounded" />
      </button>
    </div>
  </OverlayWrapper>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { useSettingsPanel } from '~/composables/panels';
import { useState } from '~/stores/state';
import OverlayWrapper from './OverlayWrapper.vue';

const { availableLocales, locale } = useI18n();
const settingsPanel = useSettingsPanel();
const state = useState();
</script>

<style lang="scss" scoped>
.settings-overlay {
  gap: 0.5rem;
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

.locale {
  cursor: default;
}

.locale-item {
  font-size: 1rem;
  outline-color: var(--colorscheme-content-text);

  input[type="radio"] {
    position: absolute;
    inset: 0rem;
    opacity: 0;
    cursor: inherit;
  }

  &:has(input:checked) {
    background-color: var(--colorscheme-secondary);
    color: var(--colorscheme-secondary-text);
    cursor: default;
  }
}

button {
  &.active {
    background-color: var(--colorscheme-secondary);
    color: var(--colorscheme-secondary-text);
    outline-color: var(--colorscheme-content-text);
  }
}
</style>
