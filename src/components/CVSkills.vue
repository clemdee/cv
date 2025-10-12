<template>
  <div
    v-if="props.skills.length > 0"
    class="skills"
  >
    <CVSkill
      v-for="skill in props.skills"
      :key="skill.id"
      :skill="skill"
    />
  </div>
</template>

<script lang="ts" setup>
import { useData, type Skill } from '~/stores/data';
import { useConfig } from '~/stores/config';

import CVSkill from '~/components/CVSkill.vue';

const data = useData();
const config = useConfig();

const props = defineProps<{
  skills: Skill[],
}>();
</script>

<style lang="scss" scoped>
.skills {
  display: flex;
  flex-flow: row wrap;
  gap: 0.2rem;
}
</style>
