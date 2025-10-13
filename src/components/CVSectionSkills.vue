<template>
  <section class="cv-skills">
    <CVSectionTitle anchor-id="skills">
      <CVText :text="t('skills.title')" />
    </CVSectionTitle>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.main')" />
      </div>

      <CVSkills :skills="skillsMain" />
    </article>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.secondary')" />
      </div>

      <CVSkills :skills="skillsSecondary" />
    </article>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.os')" />
      </div>

      <CVSkills :skills="skillsOS" />
    </article>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';
import { useConfig } from '~/stores/config';

import CVText from '~/components/CVText.vue';
import CVSectionTitle from '~/components/CVSectionTitle.vue';
import CVSkill from '~/components/CVSkill.vue';
import CVSkills from './CVSkills.vue';

const data = useData();
const config = useConfig();

const { t } = useI18n();

const skillsMain = computed(() => data.skills
  .filter(skill => skill.tags?.includes('programming'))
  .filter(skill => skill.tags?.includes('main'))
  .filter(skill => skill.level > (config.skills?.level?.min ?? 0))
);

const skillsSecondary = computed(() => data.skills
  .filter(skill => skill.tags?.includes('programming'))
  .filter(skill => !skill.tags?.includes('main'))
  .filter(skill => skill.level > (config.skills?.level?.min ?? 0))
);

const skillsOS = computed(() => data.skills
  .filter(skill => skill.tags?.includes('os'))
);
</script>

<style lang="scss" scoped>
.cv-skills {
  margin-bottom: 1.5rem;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.3rem;

    padding: 0.5rem;
    font-size: 0.8rem;
    break-inside: avoid;

    .title {
      font-weight: bold;
    }
  }
}
</style>
