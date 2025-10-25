<template>
  <CVAsideArticle
    :title="t('languages.title')"
    anchor-id="languages"
  >
    <ul>
      <li
        v-for="(languageString, key) in displayedLanguages"
        :key="key"
      >
        <CVText :text="languageString" />
      </li>
    </ul>
  </CVAsideArticle>
</template>

<script lang="ts" setup>
import type { Skill } from '~/stores/data';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CVAsideArticle from '~/components/CVAsideArticle.vue';
import CVText from '~/components/CVText.vue';
import { languageLevels, useData } from '~/stores/data';

const { t } = useI18n();
const data = useData();

const getLanguageLevel = (language: Skill) => {
  return Object.entries(languageLevels)
    .toSorted(([, thresholdA], [, thresholdB]) => thresholdB - thresholdA)
    .find(([, threshold]) => language.level >= threshold)?.[0];
};

const getLanguageLevelTitle = (language: Skill) => {
  return t(`languages.levels.${getLanguageLevel(language)}`);
};

const languages = data.skills.filter(skill => skill.tags?.includes('language'));

const displayedLanguages = computed(() => {
  return languages.map((language) => {
    const languageLevelTitle = getLanguageLevelTitle(language);
    return `${language.title} (${languageLevelTitle})`;
  });
});
</script>

<style lang="scss" scoped>
ul {
  list-style-position: inside;
}
</style>
