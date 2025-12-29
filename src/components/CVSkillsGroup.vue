<template>
  <article class="skills-group">
    <div
      v-if="props.skillsGroup.title"
      class="title"
    >
      <CVText :text="props.skillsGroup.title" />
    </div>

    <CVSkills :skills="skills" />
  </article>
</template>

<script lang="ts" setup>
import type { SkillFilter, SkillGroup } from '~/stores/config';
import type { Skill } from '~/stores/data';
import { computed } from 'vue';
import CVText from '~/components/CVText.vue';
import { mergeShallow } from '~/composables/merge';
import { isBetween } from '~/composables/utils';
import { useConfig } from '~/stores/config';
import { useData } from '~/stores/data';
import CVSkills from './CVSkills.vue';

const props = defineProps<{
  skillsGroup: SkillGroup
}>();

const data = useData();
const config = useConfig();

const resolveSkillFilter = (
  skillFilter: Partial<SkillFilter> | undefined,
): Required<SkillFilter> => ({
  id: skillFilter?.id ?? [],
  tag: skillFilter?.tag ?? [],
  level: mergeShallow(
    { min: 0, max: 1 },
    skillFilter?.level,
  ),
});

const groupFilter = computed(() => resolveSkillFilter(props.skillsGroup.filter));
const globalFilter = computed(() => resolveSkillFilter(config.skills.filter));

const resolveFilterList = <T extends string>(list: T[] | undefined) => {
  const whitelist = [] as T[];
  const blacklist = [] as T[];
  list?.forEach((item) => {
    if (item.startsWith('!')) {
      blacklist.push(item.substring(1) as T);
    }
    else {
      whitelist.push(item);
    }
  });
  return {
    whitelist,
    blacklist,
  };
};

const filterById = (skill: Skill) => {
  const { whitelist, blacklist } = resolveFilterList(props.skillsGroup.filter?.id);
  if (blacklist.find(blackId => blackId === skill.id)) return false;
  if (whitelist.length === 0) return true;
  return whitelist.find(whiteId => whiteId === skill.id);
};

const filterByTag = (skill: Skill) => {
  const { whitelist, blacklist } = resolveFilterList(props.skillsGroup.filter?.tag);
  if (blacklist.find(blackTag => skill.tags?.includes(blackTag))) return false;
  if (whitelist.length === 0) return true;
  return whitelist.every(whiteTag => skill.tags?.includes(whiteTag));
};

const filterByLevel = (skill: Skill) => {
  const isBetweenGroupFilter = isBetween(
    skill.level,
    groupFilter.value.level.min,
    groupFilter.value.level.max,
  );
  const isBetweenGlobalFilter = isBetween(
    skill.level,
    globalFilter.value.level.min,
    globalFilter.value.level.max,
  );
  return isBetweenGlobalFilter && isBetweenGroupFilter;
};

const skills = computed(() => data.skills
  .filter(filterById)
  .filter(filterByTag)
  .filter(filterByLevel),
);
</script>

<style lang="scss" scoped>
.skills-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.3rem;

  padding: 0.5rem;
  font-size: 0.8rem;
  break-inside: avoid;

  .title {
    font-weight: bold;
  }
}
</style>
