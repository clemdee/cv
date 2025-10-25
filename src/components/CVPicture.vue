<template>
  <div
    v-if="url"
    class="cv-picture"
    :style="frameStyles"
  >
    <img
      :src="url"
      alt="Profile Picture"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { resolvePicture } from '~/composables/profilePicture';
import { frames } from '~/composables/profileFrame';
import { useConfig } from '~/stores/config';

const config = useConfig();

const filename = computed(() => config.profile.filename);
const picture = computed(() => resolvePicture(filename.value));

const isCompressed = computed(() => config.profile.compressed);

const url = computed(() => {
  if (isCompressed.value && picture.value?.compressed?.url) {
    return picture.value.compressed.url;
  }
  return picture.value?.url;
});

const frameId = computed(() => config.profile.frame);
const frameStyles = computed(() => frames[frameId.value]);
</script>

<style lang="scss" scoped>
.cv-picture {
  align-self: center;

  border: 0.2rem solid white;
  width: 11rem;
  height: 11rem;
  overflow: hidden;
  transition: all linear 250ms;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
  }
}
</style>
