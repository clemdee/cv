<template>
  <section class="cv-experience">
    <CVSectionTitle anchor-id="experience">
      <CVText :text="t('experience.title')" />
    </CVSectionTitle>

    <CVExperienceItem
      v-for="experience in data.experience"
      :key="experience.id"
      :experience="experience"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';

import CVText from '~/components/CVText.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVExperienceItem from '~/components/CVExperienceItem.vue';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
.cv-experience {
  margin-bottom: 2rem;
}
</style>
