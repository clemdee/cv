<template>
  <div
    ref="root"
    class="cv-content"
  >
    <CVHeader />
    <CVEducation />
    <CVExperience />
    <CVHobbies />
    <CVSkills />
  </div>
</template>

<script lang="ts" setup>
import { ref, customRef } from 'vue';
import { useResizeObserver } from '@vueuse/core'

import CVHeader from '~/components/CVHeader.vue';
import CVEducation from '~/components/CVEducation.vue';
import CVExperience from '~/components/CVExperience.vue';
import CVHobbies from './CVHobbies.vue';
import CVSkills from '~/components/CVSkills.vue';

const root = ref<HTMLElement | null>(null);
const pageCount = customRef((track, trigger) => {
  useResizeObserver(root, () => {
    trigger();
  });
  return {
    get () {
      track();
      return root.value?.getClientRects().length ?? 1;
    },
    set () {},
  }
});
</script>

<style lang="scss" scoped>

.cv-content {
  --page-count: v-bind('pageCount');
  min-height: var(--page-height);
  height: calc(var(--page-count) * var(--page-height) - 4rem);
  padding: 2rem;
  background-color: var(--colorscheme-content-background);
  color: var(--colorscheme-content-text);
}

</style>
