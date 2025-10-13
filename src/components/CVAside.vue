<template>
  <div class="cv-aside">
    <CVPicture />
    <CVAsideCoordinates />

    <CVAsideArticle
      :title="t('objective.title')"
      anchorId="objective"
    >
      <CVText :text="t('objective.content')" />
    </CVAsideArticle>
    <CVAsideLanguage />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';
import CVPicture from '~/components/CVPicture.vue';
import CVAsideCoordinates from '~/components/CVAsideCoordinates.vue';
import CVAsideArticle from '~/components/CVAsideArticle.vue';
import CVAsideLanguage from '~/components/CVAsideLanguage.vue';

const { t } = useI18n();
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
