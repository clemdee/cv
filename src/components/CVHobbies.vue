<template>
  <section class="cv-hobby">
    <CVSectionTitle anchor-id="hobbies">
      <CVText :text="t('hobbies.title')" />
    </CVSectionTitle>

    <CVHobbyItem
      v-for="hobby in data.hobbies"
      :key="hobby.id"
      :hobby="hobby"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';

import CVText from '~/components/CVText.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVHobbyItem from './CVHobbyItem.vue';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
.cv-hobby {
  margin-bottom: 2rem;
}
</style>
