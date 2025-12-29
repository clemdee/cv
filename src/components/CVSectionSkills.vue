<template>
  <section class="cv-skills">
    <CVSectionTitle anchor-id="skills">
      <CVText :text="t('skills.title')" />
    </CVSectionTitle>

    <CVSkillsGroup
      v-for="(skillsGroup, index) in config.skills.groups"
      :key="index"
      :skills-group="skillsGroup"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVText from '~/components/CVText.vue';
import { useConfig } from '~/stores/config';
import CVSkillsGroup from './CVSkillsGroup.vue';

const config = useConfig();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
</style>
