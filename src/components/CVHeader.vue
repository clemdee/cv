<template>
  <header>
    <h1>
      <CVText :text="t('title')" />
    </h1>
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: -2rem;
  margin-right: -2rem;

  h1 {
    flex-grow: 1;

    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'roboto-thin';
    white-space: pre-line;
  }
}
</style>
