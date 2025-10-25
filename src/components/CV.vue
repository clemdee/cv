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
import { computed } from 'vue';
import CVAside from '~/components/CVAside.vue';
import CVContent from '~/components/CVContent.vue';
import CVOverlaySettings from '~/components/CVOverlaySettings.vue';
import { colorschemes } from '~/composables/colorscheme';
import { useItemPanel, useSettingsPanel } from '~/composables/panels';
import { useConfig } from '~/stores/config';
import CVPanelItem from './CVPanelItem.vue';
import CVPanelSettings from './CVPanelSettings.vue';

const config = useConfig();
const itemPanel = useItemPanel();
const settingsPanel = useSettingsPanel();

const currentColorscheme = computed(() => config.colorscheme.preset);
const currentColorschemeStyles = computed(() => {
  return colorschemes[currentColorscheme.value].styles;
});
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
