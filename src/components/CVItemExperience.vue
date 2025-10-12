<template>
  <CVBaseItem
    class="cv-experience-item"
    :anchor-id="`experience-${experience.id}`"
    :visible="isVisible"
    @click="panel.set(experience)"
  >
    <div class="experience-content">
      <div class="experience-header">
        <div class="date">
          <CVText :text="experience.date.from?.toString()" />
          <span v-if="experience.date.to"> - </span>
          <CVText :text="experience.date.to?.toString()" />
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

          <div class="skills">
            <CVSkill
              v-for="skill in experience.skills"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Experience } from '~/stores/data';
import { computed } from 'vue';
import { useConfig } from '~/stores/config';
import { usePanel } from './CVPanelItem.vue';

import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVSkill from './CVSkill.vue';

const config = useConfig();
const panel = usePanel();

const props = defineProps<{
  experience: Experience,
}>();

const isVisible = computed(() =>
  !config.experience?.show?.id
  || (config.experience.show.id as unknown as string).includes(props.experience.id)
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
      display: flex;
      flex-flow: row wrap;
      gap: 0.2rem;

      &:not(:empty) {
        margin-top: 0.2rem;
      }
    }
  }
}

</style>
