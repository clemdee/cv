<template>
  <div class="cv">
    <div class="cv-wrapper">
      <CVAside />
      <CVContent />
      <CVPanelItem v-model="itemPanel.opened" />
      <CVPanelSettings v-model="settingsPanelOpened" />
      <Teleport to="body" >
        <SettingsOverlay
          @settings-click="settingsPanelOpened = !settingsPanelOpened"
        />
      </Teleport>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CVAside from '~/components/CVAside.vue';
import CVContent from '~/components/CVContent.vue';
import CVPanelItem from './CVPanelItem.vue';
import { useItemPanel } from '~/composables/itemPanel';
import CVPanelSettings from './CVPanelSettings.vue';
import SettingsOverlay from '~/components/SettingsOverlay.vue';
import { ref } from 'vue';

const itemPanel = useItemPanel();
const settingsPanelOpened = ref(false);
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
