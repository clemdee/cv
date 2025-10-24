<template>
  <article class="data">
    <h3>Data</h3>

    <div class="toggle-wrapper pronouns">
      <label>
        <span>
          Show pronouns
        </span>

        <InputToggle
          v-model="config.coordinates.showPronouns"
        />
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useConfig } from '~/stores/config';
import InputToggle from './InputToggle.vue';

const config = useConfig();
</script>

<style lang="scss" scoped>
</style>
