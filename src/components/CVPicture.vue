<template>
  <div
    v-if="url"
    class="cv-picture"
  >
    <img
      :src="url"
      alt="Profile Picture"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useConfig } from '~/stores/config';

const config = useConfig();
const filename = computed(() => config.profile.name);
const url = computed(() => {
  if (!filename.value) return '';
  return new URL(`../stores/profiles/${filename.value}`, import.meta.url).href
});
</script>

<style lang="scss" scoped>
.cv-picture {
  align-self: center;

  border: 0.2rem solid white;
  width: 11rem;
  height: 11rem;
  border-radius: 1rem 0 1rem 0;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
  }
}
</style>
