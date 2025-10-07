<template>
  <section class="cv-skills">
    <CVSectionTitle anchor-id="skills">
      <CVText :text="t('skills.title')" />
    </CVSectionTitle>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.main')" />
      </div>

      <div class="skills">
        <CVSkillItem
          v-for="skill in skillsMain"
          :key="skill.id"
          :skill="skill"
        />
      </div>
    </article>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.secondary')" />
      </div>

      <div class="skills">
        <CVSkillItem
          v-for="skill in skillsSecondary"
          :key="skill.id"
          :skill="skill"
        />
      </div>
    </article>

    <article class="item">
      <div class="title">
        <CVText :text="t('skills.titles.os')" />
      </div>

      <div class="skills">
        <CVSkillItem
          v-for="skill in skillsOS"
          :key="skill.id"
          :skill="skill"
        />
      </div>
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
import CVSkillItem from '~/components/CVSkillItem.vue';

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
  margin-bottom: 2rem;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;

    padding: 0.5rem;
    font-size: 0.8rem;
    break-inside: avoid;

    .title {
      font-weight: bold;
    }

    .skills {
      margin-bottom: 0.5rem;
      display: flex;
      flex-flow: row wrap;
      gap: 0.2rem;
    }
  }
}
</style>
