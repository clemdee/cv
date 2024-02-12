<template>
  <CVBaseItem
    class="cv-experience-item"
    :anchor-id="`experience-${experience.id}`"
    :visible="isVisible"
  >
    <template #left>
      <div class="date">
        <CVText :text="experience.date.from?.toString()" />
        -
        <CVText :text="experience.date.to?.toString()" />
      </div>
    </template>

    <template #right>
      <div class="title">
        <CVText :text="t(`experience.items.${experience.id}.title`)" />
      </div>
      <div class="details">
        <CVText :text="t(`experience.items.${experience.id}.description`)" />
      </div>
    </template>

  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Experience } from '~/stores/data';
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
  experience: Experience,
}>();

const isVisible = computed(() =>
  !config.experience?.show?.id
  || config.experience.show.id.includes(props.experience.id)
);

const location = computed(() => data.locations.find(location => location.id === props.experience.location));
</script>

<style lang="scss" scoped>

.cv-experience-item {

  .title {
    font-weight: bold;
  }

}

</style>
