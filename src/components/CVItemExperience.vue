<template>
  <CVBaseItem
    class="cv-experience-item"
    :item="experience"
    :anchor-id="`experience-${experience.id}`"
    :visible="isVisible"
  >
    <div class="experience-content">
      <div class="experience-header">
        <div class="date">
          {{ formatDateSpan(props.experience.date) }}
        </div>

        <div class="title">
          <CVText :text="experience.title" />
        </div>
      </div>

      <div class="experience-body">
        <div class="details">
          <div class="description">
            <CVText :text="experience.description" />
          </div>

          <ul
            v-if="experience.duties.length > 0"
            class="duties"
          >
            <CVText
              v-for="(text, index) in experience.duties"
              :key="index"
              tag="li"
              :text="text"
            />
          </ul>

          <CVSkills
            class="skills"
            :skills="experience.skills"
          />
        </div>
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Experience } from '~/stores/data';
import { computed } from 'vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVText from '~/components/CVText.vue';
import { formatDateSpan } from '~/i18n';
import { useConfig } from '~/stores/config';
import CVSkills from './CVSkills.vue';

const props = defineProps<{
  experience: Experience
}>();

const config = useConfig();

const isVisible = computed(() =>
  !config.experience?.filter?.id
  || (config.experience.filter.id as unknown as string).includes(props.experience.id),
);
</script>

<style lang="scss" scoped>
.cv-experience-item {
  .experience-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.3rem;
  }

  .title {
    font-weight: bold;
  }

  .details {
    display: flex;
    flex-flow: column;
    gap: 0.2rem;

    ul.duties {
      padding-left: 0.8rem;
    }

    .skills {
      margin-top: 0.2rem;
    }
  }
}
</style>
