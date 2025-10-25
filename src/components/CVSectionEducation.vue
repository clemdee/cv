<template>
  <section class="cv-education">
    <CVSectionTitle anchor-id="education">
      <CVText :text="t('education.title')" />
    </CVSectionTitle>

    <CVItemEducation
      v-for="education in data.education"
      :key="education.id"
      :education="education"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVItemEducation from '~/components/CVItemEducation.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVText from '~/components/CVText.vue';
import { useData } from '~/stores/data';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
.cv-education {
  margin-bottom: 1.5rem;
}
</style>
