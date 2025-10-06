<template>
  <div class="cv-aside">
    <CVPicture />
    <CVCoordinates />

    <CVAsideSection
      :title="t('objective.title')"
      anchorId="objective"
    >
      <CVText :text="t('objective.content')" />
    </CVAsideSection>
    <CVAsideSectionLanguage />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';
import CVPicture from '~/components/CVPicture.vue';
import CVCoordinates from '~/components/CVCoordinates.vue';
import CVAsideSection from '~/components/CVAsideSection.vue';
import CVAsideSectionLanguage from '~/components/CVAsideSectionLanguage.vue';

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
