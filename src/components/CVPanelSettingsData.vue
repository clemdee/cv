<template>
  <article class="data">
    <h3>Data</h3>

    <div class="toggle-wrapper edit-mode">
      <label>
        <span>
          Toggle Edit mode
        </span>

        <InputToggle
          v-model="state.isEditing"
        />
      </label>
    </div>

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
import { useState } from '~/stores/state';
import InputToggle from './InputToggle.vue';

const config = useConfig();
const state = useState();
</script>

<style lang="scss" scoped>
article.data {
  --toggle-color-on: var(--colorscheme-secondary);
  --toggle-color-off: #444;
  --toggle-height: 1.5rem;

  .toggle-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>
