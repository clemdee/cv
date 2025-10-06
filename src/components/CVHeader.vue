<template>
  <header>
    <h1>
      <CVText :text="t('title')" />
    </h1>
    <h2>
      <CVText :text="t('subtitle')" />
    </h2>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: -2rem;
  margin-right: -2rem;

  h1 {
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'roboto-thin';
  }

  h2 {
    text-align: center;
    white-space: pre-line;
  }
}
</style>
