<template>
  <CVBaseItem
    class="cv-experience-item"
    :anchor-id="`experience-${experience.id}`"
    :visible="isVisible"
    @click="panel.set(experience)"
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
        <CVText :text="experience.title" />
      </div>

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
          <CVSkillItem
            v-for="skill in experience.skills"
            :key="skill.id"
            :skill="skill"
          />
        </div>
      </div>
    </template>

  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Experience } from '~/stores/data';
import { computed } from 'vue';
import { useConfig } from '~/stores/config';
import { usePanel } from './CVItemPanel.vue';

import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVSkillItem from './CVSkillItem.vue';

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
      display: flex;
      flex-flow: row wrap;
      gap: 0.2rem;
    }
  }
}

</style>
