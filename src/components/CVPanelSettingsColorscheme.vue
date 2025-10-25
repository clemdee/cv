<template>
  <article class="colorscheme">
    <h3>Colorscheme</h3>

    <div
      class="colorscheme-select"
      :class="{
        transitioning: transitioning,
      }"
    >
      <label
        v-for="(colorscheme, name) in colorschemes"
        :key="name"
        class="colorscheme"
        :class="{
          current: name === currentColorscheme
        }"
        :style="colorscheme.styles"
      >
        <div class="wrapper focus-wrapper">
          <input
            v-model="currentColorscheme"
            name="colorscheme"
            type="radio"
            :value="name"
          />
          <div class="aside">
            <Icon icon="material-symbols-light:text-fields-rounded" />
            <div class="secondary" />
          </div>
          <div class="content">
            <Icon icon="material-symbols-light:text-fields-rounded" />
            <div class="title" />
          </div>
        </div>
        <div class="name">
          {{ colorscheme.title }}
        </div>
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ref, toRef, watch } from 'vue';
import { useConfig } from '~/stores/config';
import { colorschemes } from '~/composables/colorscheme';

const config = useConfig();
const currentColorscheme = toRef(config.colorscheme, 'preset');

const transitioning = ref(false);
const transitionDurationMS = 250;

let timeoutId: ReturnType<typeof setTimeout>;

watch(currentColorscheme, () => {
  clearTimeout(timeoutId);

  transitioning.value = true;
  timeoutId = setTimeout(
    () => { transitioning.value = false; },
    transitionDurationMS
  );
}, {
  flush: 'sync',
});
</script>

<style lang="scss" scoped>
article.colorscheme {
  .colorscheme-select {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    .colorscheme {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      aspect-ratio: 1;
      cursor: pointer;

      &.current {
        .wrapper {
          border: 0.1rem solid var(--colorscheme-secondary);
        }
      }

      .wrapper {
        position: relative;
        width: 5rem;
        aspect-ratio: 1;
        border: 0.1rem solid currentColor;

        input[type="radio"] {
          position: absolute;
          inset: 0rem;
          opacity: 0;
          cursor: inherit;
        }

        .aside,
        .content {
          position: absolute;
          inset: 0rem;
          display: grid;
          place-items: center;
          font-size: 3rem;
        }

        .aside {
          background-color: var(--colorscheme-main);
          color: var(--colorscheme-main-text);
          clip-path: polygon(0% 0%, 0% 100%, 100% 0%);

          .secondary {
            position: absolute;
            top: 0.3rem;
            left: 0.3rem;
            height: 1.2rem;
            aspect-ratio: 1;
            border-radius: 0.2rem 0.1rem 0.1rem 0.1rem;
            background-color: var(--colorscheme-secondary);
            clip-path: polygon(0% 0%, 0% 100%, 0.15rem 100%, 100% 0.15rem, 100% 0%);
          }
        }

        .content {
          background-color: var(--colorscheme-content-background);
          color: var(--colorscheme-content-text);
          clip-path: polygon(100% 100%, 0% 100%, 100% 0%);

          .title {
            position: absolute;
            bottom: 0.4rem;
            right: 0.4rem;
            height: 0.8rem;
            aspect-ratio: 1;
            border-radius: 100dvw;
            background-color: var(--colorscheme-content-title-background);
          }
        }
      }

      .name {
        font-size: 0.8rem;
        color: rgba(from currentColor r g b / 0.7);
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss">
html:has(.colorscheme-select.transitioning) {
  --transition-duration: 150ms;

  * {
    transition: all linear var(--transition-duration);
  }
}
</style>
