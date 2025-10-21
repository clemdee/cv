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
          <CVText :text="props.education.date.from?.toString()" />
          <span v-if="props.education.date.to"> - </span>
          <CVText :text="props.education.date.to?.toString()" />
        </div>
      </div>

      <div class="education-body">
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
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { Education } from '~/stores/data';
import { computed } from 'vue';
import { useConfig } from '~/stores/config';
import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';

const config = useConfig();

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
