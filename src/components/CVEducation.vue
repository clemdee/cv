<template>
  <section class="cv-education">
    <CVSectionTitle anchor-id="education">
      <CVText :text="t('education.title')" />
    </CVSectionTitle>

    <CVEducationItem
      v-for="education in data.education"
      :key="education.id"
      :education="education"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';

import CVText from '~/components/CVText.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVEducationItem from '~/components/CVEducationItem.vue';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
.cv-education {
  margin-bottom: 2rem;
}
</style>
