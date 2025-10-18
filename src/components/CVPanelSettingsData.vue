<template>
  <article class="data">
    <h3>Data</h3>

    <div class="edit-mode">
      <label>
        <span>
          Toggle Edit mode
        </span>

        <InputToggle
          v-model="state.isEditing"
        />
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useState } from '~/stores/state';
import InputToggle from './InputToggle.vue';

const state = useState();
</script>

<style lang="scss" scoped>
article.data {
  --toggle-color-on: var(--colorscheme-secondary);
  --toggle-color-off: #444;
  --toggle-height: 1.5rem;

  .edit-mode {
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
