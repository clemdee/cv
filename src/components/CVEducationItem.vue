<template>
  <CVBaseItem
    class="cv-education-item"
    :anchor-id="`education-${education.id}`"
    :visible="isVisible"
  >
    <template #left>
      <div class="title">
        <Icon
          v-if="education.certification"
          icon="mdi:school-outline"
          title="diplome"
        />
        <CVText :text="t(`education.items.${education.id}.title`)" />
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
        <CVText :text="t(`locations.items.${location?.id}.name`)" />
        <br/>
        <Icon icon="mdi:map-marker-outline" />
        <CVText :text="t(`locations.items.${location?.id}.location`)" />
      </div>

      <div class="details">
        <CVText :text="t(`education.items.${education.id}.description`)" />
      </div>
    </template>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { JSONEducation } from '~/stores/data';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';
import { useConfig } from '~/stores/config';

import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';

const { t } = useI18n();
const data = useData();
const config = useConfig();

const props = defineProps<{
  education: JSONEducation,
}>();

const isVisible = computed(() =>
  !config.education?.show?.id
  || config.education.show.id.includes(props.education.id)
);

const location = computed(() => data.locations.find(location => location.id === props.education.location));
</script>

<style lang="scss" scoped>
.cv-education-item {
  .title,
  .location {
    font-weight: bold;
  }
}
</style>
