<template>
  <div
    ref="root"
    class="overlay-wrapper"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue';

const root = useTemplateRef('root');

const viewport = window.visualViewport;
const dx = ref(0);
const dy = ref(0);
const scale = ref(1);

const scaleFactor = ref(0.5);

const viewportHandler = () => {
  if (!viewport) return;
  if (!root.value) return;
  dx.value = document.body.clientWidth - viewport.width - viewport.offsetLeft;
  dy.value = document.body.clientHeight - viewport.height - viewport.offsetTop;
  scale.value = 1 / viewport.scale;
}

onMounted(() => {
  viewportHandler();
});

window.visualViewport?.addEventListener("scroll", viewportHandler, { passive: true });
window.visualViewport?.addEventListener("resize", viewportHandler, { passive: true });
</script>

<style lang="scss" scoped>
.overlay-wrapper {
  --dx: calc(v-bind('dx') * 1px);
  --dy: calc(v-bind('dy') * 1px);
  --scale: v-bind('scale');

  --margin: 1rem;

  position: fixed;
  right: calc(var(--margin) * var(--scale) + var(--dx));
  bottom: calc(var(--margin) * var(--scale) + var(--dy));
  display: inline-flex;
  transform-origin: bottom right;
  scale: pow(var(--scale), v-bind('scaleFactor'));
  display: inline-flex;
  filter: drop-shadow(0rem 0rem 0.2rem #7773);

  @media print {
    display: none;
  }
}
</style>
