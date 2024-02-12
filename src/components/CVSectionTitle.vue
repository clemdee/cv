<template>
  <h2 class="cv-section-title">
    <CVAnchor :id="anchorId" />
    <div class="title">
      <slot />
    </div>
  </h2>
</template>

<script lang="ts" setup>
import CVAnchor from '~/components/CVAnchor.vue';

defineProps<{
  anchorId: string,
}>();
</script>

<style lang="scss" scoped>
h2.cv-section-title {
  position: relative;
  display: inline-block;
  font-size: 1rem;
  break-after: avoid;

  .title {
    padding: 0.2rem 1rem;
    margin-bottom: 1rem;
    border-radius: 0.1rem;
    font-family: 'roboto-thin';
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08rem;
    cursor: pointer;
    transition: all 250ms;

    border-left: 0.5rem solid var(--colorscheme-secondary);
    color: var(--colorscheme-content-title-text);
    background-color: var(--colorscheme-content-title-background)
  }

  .anchor {
    position: absolute;
    right: 100%;
    top: 0.3rem;
    padding-right: 0.4rem;
  }

  &:hover {
    .anchor {
      opacity: 0.5;
    }
  }
}
</style>
