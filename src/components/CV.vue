<template>
  <div
    class="cv"
    :style="currentColorschemeStyles"
  >
    <div class="cv-wrapper">
      <CVAside />
      <CVContent />
      <CVOverlaySettings />
      <CVPanelItem v-model="itemPanel.opened" />
      <CVPanelSettings v-model="settingsPanel.opened" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CVAside from '~/components/CVAside.vue';
import CVContent from '~/components/CVContent.vue';
import CVPanelItem from './CVPanelItem.vue';
import { useItemPanel, useSettingsPanel } from '~/composables/panels';
import CVPanelSettings from './CVPanelSettings.vue';
import CVOverlaySettings from '~/components/CVOverlaySettings.vue';
import { computed, ref } from 'vue';
import { colorschemes } from '~/composables/colorscheme';
import { useConfig } from '~/stores/config';

const config = useConfig();
const itemPanel = useItemPanel();
const settingsPanel = useSettingsPanel();

const currentColorscheme = computed(() => config.colorscheme.preset);
const currentColorschemeStyles = computed(() => {
  return colorschemes[currentColorscheme.value].styles;
})
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
