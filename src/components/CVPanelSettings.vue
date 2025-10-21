<template>
  <CVPanel
    v-model="opened"
    class="settings-panel"
  >
    <header>
      <h2>
        Settings
      </h2>

      <div
        class="close"
        @click="opened = false"
      >
        <Icon icon="material-symbols-light:close" />
      </div>
    </header>

    <section class="content">
      <CVPanelSettingsColorscheme />

      <CVPanelSettingsProfile />

      <CVPanelSettingsData />
    </section>
  </CVPanel>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import CVPanel from './CVPanel.vue';
import CVPanelSettingsColorscheme from './CVPanelSettingsColorscheme.vue';
import CVPanelSettingsProfile from './CVPanelSettingsProfile.vue';
import CVPanelSettingsData from './CVPanelSettingsData.vue';

const opened = defineModel<boolean>({ required: false });
</script>

<style lang="scss" scoped>
.settings-panel {
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h2 {
      font-family: "roboto-thin";
    }

    .close {
      margin-left: 1rem;
      cursor: pointer;

      svg {
        font-size: 2rem;
        opacity: 0.5;
      }
    }
  }

  .content {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;
    margin-inline: calc(var(--panel-padding) * -1);
    padding-inline: var(--panel-padding);
    overflow-y: auto;
  }
}

:deep(article) {
  display: flex;
  flex-flow: column;
  gap: 1.5rem;

  h3 {
    padding-bottom: 0.3rem;
    border-bottom: 0.01rem solid rgba(from currentColor r g b / 0.5);
    font-family: "roboto-thin";
  }
}
</style>
