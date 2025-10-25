<template>
  <div class="cv-section-title">
    <h2>
      <CVAnchor :id="anchorId" />
      <div class="title">
        <slot />
      </div>
    </h2>
  </div>
</template>

<script lang="ts" setup>
import CVAnchor from '~/components/CVAnchor.vue';

defineProps<{
  anchorId: string
}>();
</script>

<style lang="scss" scoped>
.cv-section-title {
  break-after: avoid;

  h2 {
    position: relative;
    display: flex;
    font-size: 1rem;

    .title {
      width: 100%;
      padding: 0.2rem 1rem;
      margin-bottom: 1rem;
      border-radius: 0.1rem;
      font-family: 'roboto-thin';
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08rem;

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
}
</style>
