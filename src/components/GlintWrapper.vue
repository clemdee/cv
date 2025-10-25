<template>
  <div
    class="glint-wrapper"
    @mouseenter="runGlintEffect"
  >
    <span
      ref="glint"
      class="glint-effect"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

const glintElement = useTemplateRef('glint');

const runGlintEffect = async () => {
  if (!glintElement.value) return;
  // If animation is currently running, don't restart it
  const currentAnimation = glintElement.value.getAnimations()
    .find(animation => animation.id === 'glint-animation');
  if (currentAnimation?.playState === 'running') return;
  glintElement.value?.animate([
    { left: '-0.6rem' },
    { left: 'calc(100% + 0.6rem)' },
  ], {
    id: 'glint-animation',
    duration: 400,
    easing: 'ease-out',
    iterations: 1,
  });
};
</script>

<style lang="scss" scoped>
.glint-wrapper {
  position: relative;
  overflow: hidden;

  /* Glint */

  .glint-effect {
    position: absolute;
    top: 0rem;
    left: -0.6rem;
    width: 0.5rem;
    transform: skew(-10deg);
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, #fffb 70%, 90%, transparent);
    backface-visibility: hidden; /* For hardware acceleration */

    @media print {
      display: none;
    }
  }
}
</style>
