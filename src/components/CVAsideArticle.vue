<template>
  <article class="cv-aside-article">
    <h2>
      <CVAnchor :id="anchorId" />
      <CVText :text="title" />
    </h2>
    <div class="content">
      <slot />
    </div>
  </article>
</template>

<script lang="ts" setup>

import CVText from '~/components/CVText.vue';
import CVAnchor from '~/components/CVAnchor.vue';

defineProps<{
  anchorId: string,
  title: string,
}>();
</script>

<style lang="scss" scoped>
.cv-aside-article {
  padding: 0.5rem;
  margin: 0rem -0.5rem;
  margin-top: 1rem;

  &:hover {
    box-shadow:
      -0.2rem -0.2rem 0.2rem #4444,
      0.2rem 0.2rem 0.2rem #4444;
  }

  h2 {
    position: relative;
    margin-bottom: 0.6rem;
    padding-bottom: 0.1rem;
    border-bottom: 2px solid var(--colorscheme-secondary);

    font-family: roboto-thin;
    font-size: 0.99rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.08rem;

    .anchor {
      position: absolute;
      top: 0.2rem;
      right: 100%;
      padding-right: 0.35rem;
      font-size: 0.8rem;
    }
  }

  h2:hover {
    .anchor {
      opacity: 0.5;
    }
  }

  .content {
    width: 100%;
    font-size: 0.8rem;
  }
}
</style>
