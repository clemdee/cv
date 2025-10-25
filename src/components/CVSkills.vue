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
import type { Skill } from '~/stores/data';
import CVSkill from '~/components/CVSkill.vue';

const props = defineProps<{
  skills: Skill[]
}>();
</script>

<style lang="scss" scoped>
.skills {
  display: flex;
  flex-flow: row wrap;
  gap: 0.2rem;
}
</style>
