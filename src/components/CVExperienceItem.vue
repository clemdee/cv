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
        <CVText :text="experience.description" />
      </div>
      <div class="skills">
        <CVSkillItem
          v-for="skill in experience.skills"
          :key="skill.id"
          :skill="skill"
        />
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

  .skills {
    margin-top: 0.4rem;
    display: flex;
    flex-flow: row wrap;
    gap: 0.2rem;
  }
}

</style>
