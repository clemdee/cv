<template>
  <div class="cv-aside">
    <CVPicture />
    <CVAsideCoordinates />

    <CVAsideArticle
      v-if="data.objective"
      :title="t('objective.title')"
      anchor-id="objective"
    >
      <CVText :text="data.objective" />
    </CVAsideArticle>
    <CVAsideLanguage />
    <CVAsideSkills v-if="showSkills" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CVAsideArticle from '~/components/CVAsideArticle.vue';
import CVAsideCoordinates from '~/components/CVAsideCoordinates.vue';
import CVAsideLanguage from '~/components/CVAsideLanguage.vue';
import CVPicture from '~/components/CVPicture.vue';
import CVText from '~/components/CVText.vue';
import { useConfig } from '~/stores/config';
import { useData } from '~/stores/data';
import CVAsideSkills from './CVAsideSkills.vue';

const { t } = useI18n();
const config = useConfig();
const data = useData();

const showSkills = computed(() => config.skills.show && config.skills.position === 'aside');
</script>

<style lang="scss" scoped>
.cv-aside {
  float: left;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  padding: 2rem;
  width: 16rem;
  min-height: var(--page-height);

  color: var(--colorscheme-main-text);
  background-color: var(--colorscheme-main);

  .cv-picture {
    margin-bottom: 2rem;
  }
}
</style>
