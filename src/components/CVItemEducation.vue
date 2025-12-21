<template>
  <CVBaseItem
    class="cv-education-item"
    :item="education"
    :anchor-id="`education-${education.id}`"
    :visible="isVisible"
  >
    <div class="education-content">
      <div class="education-header">
        <div class="title">
          <Icon
            v-if="education.certifications.length > 0"
            icon="mdi:school-outline"
            title="Diploma"
          />
          <CVText :text="props.education.title" />
        </div>

        <div class="date">
          {{ formatDateSpan(props.education.date) }}
        </div>
      </div>

      <div class="education-body">
        <div class="location">
          <Icon icon="mdi:home-city-outline" />
          <CVText :text="props.education.location?.name" />
          <br />
          <Icon icon="mdi:map-marker-outline" />
          <CVText :text="props.education.location?.location" />
        </div>

        <div class="details">
          <CVText
            v-if="config.education.items.show.description"
            :text="props.education.description"
          />
        </div>
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Education } from '~/stores/data';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVText from '~/components/CVText.vue';
import { formatDateSpan } from '~/i18n';
import { useConfig } from '~/stores/config';

const props = defineProps<{
  education: Education
}>();

const config = useConfig();

const isVisible = computed(() =>
  !config.education?.filter?.id
  || (config.education.filter.id as unknown as string).includes(props.education.id),
);
</script>

<style lang="scss" scoped>
.cv-education-item {
  .education-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1rem;

    .education-header {
      flex-shrink: 0;
      width: 10rem;
    }

    .education-body {
      width: fit-content;
    }
  }

  .title,
  .location {
    font-weight: bold;
  }
}
</style>
