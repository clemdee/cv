<template>
  <CVBaseItem
    class="cv-education-item"
    :anchor-id="`education-${education.id}`"
    :visible="isVisible"
    @click="panel.set(education)"
  >
    <template #left>
      <div class="title">
        <Icon
          v-if="education.certifications.length > 0"
          icon="mdi:school-outline"
          title="diplome"
        />
        <CVText :text="props.education.title" />
      </div>

      <div class="date">
        <CVText :text="props.education.date.from?.toString()" />
        -
        <CVText :text="props.education.date.to?.toString()" />
      </div>
    </template>

    <template #right>
      <div class="location">
        <Icon icon="mdi:home-city-outline" />
        <CVText :text="props.education.location?.name" />
        <br/>
        <Icon icon="mdi:map-marker-outline" />
        <CVText :text="props.education.location?.location" />
      </div>

      <div class="details">
        <CVText :text="props.education.description" />
      </div>
    </template>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { Education } from '~/stores/data';
import { computed } from 'vue';
import { useConfig } from '~/stores/config';
import { usePanel } from './CVItemPanel.vue';

import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';

const config = useConfig();
const panel = usePanel();

const props = defineProps<{
  education: Education,
}>();

const isVisible = computed(() =>
  !config.education?.show?.id
  || (config.education.show.id as unknown as string).includes(props.education.id)
);
</script>

<style lang="scss" scoped>
.cv-education-item {
  .title,
  .location {
    font-weight: bold;
  }
}
</style>
