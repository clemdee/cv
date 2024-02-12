<template>
  <div class="options-locale">
    <label
      class="locale"
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
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { availableLocales, locale } = useI18n();
</script>

<style lang="scss" scoped>
.options-locale {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  filter: drop-shadow(0rem 0rem 0.2rem #7773);

  @media print {
    display: none;
  }

  .locale {
    --border-radius: 1rem;
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

    input[type="radio"] {
      display: none;
    }

    &:has(input:checked) {
      background-color: var(--colorscheme-main);
      color: var(--colorscheme-main-text);
      cursor: default;
    }

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
}
</style>
