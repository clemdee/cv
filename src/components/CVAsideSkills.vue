<template>
  <CVAsideArticle
    :title="t('skills.title')"
    anchor-id="skills"
  >
    <CVSkillsGroup
      v-for="(skillsGroup, index) in config.skills.groups"
      :key="index"
      :skills-group="skillsGroup"
    />
  </CVAsideArticle>
</template>

<script lang="ts" setup>
import { t } from '~/i18n';
import { useConfig } from '~/stores/config';
import CVAsideArticle from './CVAsideArticle.vue';
import CVSkillsGroup from './CVSkillsGroup.vue';

const config = useConfig();
</script>

<style lang="scss" scoped>
:deep(.skills-group) {
  padding-inline: 0rem;

  .cv-skill-item {
    color: var(--colorscheme-content-text);
    background-color: var(--colorscheme-content-background);
  }
}
</style>
