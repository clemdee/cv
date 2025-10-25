<template>
  <section class="cv-hobby">
    <CVSectionTitle anchor-id="hobbies">
      <CVText :text="t('hobbies.title')" />
    </CVSectionTitle>

    <CVItemHobby
      v-for="hobby in data.hobbies"
      :key="hobby.id"
      :hobby="hobby"
    />
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVText from '~/components/CVText.vue';
import { useData } from '~/stores/data';
import CVItemHobby from './CVItemHobby.vue';

const { t } = useI18n();
const data = useData();
</script>

<style lang="scss" scoped>
.cv-hobby {
  margin-bottom: 1.5rem;
}
</style>
