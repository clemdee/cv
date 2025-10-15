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

    <div class="tbd">
      TBD
    </div>
  </CVPanel>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import CVPanel from './CVPanel.vue';

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
}
</style>
