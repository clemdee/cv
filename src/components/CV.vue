<template>
  <div class="cv">
    <div class="cv-wrapper">
      <CVAside />
      <CVContent />
      <CVItemPanel />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CVAside from '~/components/CVAside.vue';
import CVContent from '~/components/CVContent.vue';
import CVItemPanel from './CVPanelItem.vue';
</script>

<style lang="scss" scoped>

.cv {
  width: var(--page-width);
  height: var(--page-height);

  font-family: arial;
  color: var(--colorscheme-main-text);

  column-width: var(--page-width);
  column-gap: 1rem;

  .cv-wrapper {
    box-decoration-break: clone;

    .cv-aside {
      margin-right: 2rem;
    }
  }

  @media print {
    width: 100%;
    min-height: 100%;
    height: max-content;
  }
}

</style>
