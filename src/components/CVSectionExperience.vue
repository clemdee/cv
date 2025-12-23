<template>
  <section class="cv-experience">
    <CVSectionTitle anchor-id="experience">
      <CVText :text="t('experience.title')" />
    </CVSectionTitle>

    <CVItemExperience
      v-for="experience in data.experience"
      :key="experience.id"
      :experience="experience"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVItemExperience from '~/components/CVItemExperience.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVText from '~/components/CVText.vue';
import { useData } from '~/stores/data';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
</style>
