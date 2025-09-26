<template>
  <CVAsideSection
    :title="t('languages.title')"
    anchorId="languages"
  >
    <ul>
      <li
        v-for="(languageString, key) in displayedLanguages"
        :key="key"
      >
        <CVText :text="languageString" />
      </li>
    </ul>
  </CVAsideSection>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';

import CVText from '~/components/CVText.vue';
import CVAsideSection from '~/components/CVAsideSection.vue';

const data = useData();

// Todo: move to config
const levels = ref({
  motherTongue: 1,
  fluent: 0.8,
  intermediary: 0.5,
  beginner: 0,
});

const { t } = useI18n();

const languages = data.skills.filter(skill => skill.tags?.includes('language'));

const displayedLanguages = computed(() => {
  // For each language
  return languages.map(language => {
    // Find appropriate level and get its translation
    const languageLevel = computed(() => {
      const languageLevelKey = Object.entries(levels.value)
        .sort(([, thresholdA], [, thresholdB]) => thresholdB - thresholdA)
        .find(([, threshold]) => language.level >= threshold)?.[0];
      return t(`languages.levels.${ languageLevelKey }`);
    });
    // Return full text translated
    return `${language.title} (${languageLevel.value})`;
  });
});
</script>

<style lang="scss" scoped>
ul {
  list-style-position: inside;
}
</style>
