<template>
  <article class="profiles">
    <h3>Profile Picture</h3>

    <div class="profiles-select">
      <label
        v-for="profile in profiles"
        :key="profile.filename"
        class="profile"
        :class="{
          current: profile.filename === currentProfileFilename
        }"
      >
        <input
          v-model="currentProfileFilename"
          type="radio"
          :value="profile.filename"
        />
        <img :src="profile.url" />
        <div class="filename">
          {{ profile.filename }} ({{ profile.size }})
        </div>
      </label>

      <label
        class="profile none"
        :class="{
          current: currentProfileFilename === ''
        }"
      >
        <input
          v-model="currentProfileFilename"
          type="radio"
          value=""
        />
        <div class="icon-wrapper">
          <Icon icon="radix-icons:value-none" />
        </div>
        <div class="filename">
          no picture
        </div>
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, reactive, ref, toRef } from 'vue';
import { asyncComputed } from '@vueuse/core';
import { formatStorage } from '~/composables/utils';
import { useConfig } from '~/stores/config';

const config = useConfig();

interface ModuleImportInterface {
  default: string;
}

const profiles = Object.values(import.meta.glob<ModuleImportInterface>('/src/stores/profiles/*', {
  base: './cv/',
  eager: true,
  query: '?url',
})).map((module) => {
  const url = ref(module.default);
  const filename = computed(() => url.value.match(/^.*\/([^/]+)$/)?.[1] ?? '');
  const blob = asyncComputed<Blob>(async () => {
    const response = await fetch(url.value);
    return await response.blob();
  });
  const size = computed(() => {
    const size = blob.value?.size;
    if (!size) return '';
    return formatStorage(size);
  });
  return reactive({
    url,
    filename,
    blob,
    size,
  });
});

const currentProfileFilename = toRef(config.profile, 'name');
</script>

<style lang="scss" scoped>
.profiles {
  .profiles-select {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    .profile {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      aspect-ratio: 1;
      width: 5rem;
      cursor: pointer;

      &.current {
        img {
          box-shadow: 0rem 0rem 0rem 0.1rem var(--colorscheme-secondary);
        }

        .icon-wrapper {
          border: 0.1rem solid var(--colorscheme-secondary);
        }
      }

      input[type="radio"] {
        display: none;
      }

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
      }

      .icon-wrapper {
        display: grid;
        place-items: center;
        aspect-ratio: 1;
        width: 100%;
        border: 0.1rem solid currentColor;
        color: rgba(from currentColor r g b / 0.3);
        font-size: 4rem;
      }

      .filename {
        font-size: 0.8rem;
        color: rgba(from currentColor r g b / 0.7);
        text-align: center;
      }
    }
  }
}
</style>
