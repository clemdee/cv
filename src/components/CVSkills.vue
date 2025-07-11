<template>
  <section class="cv-skills">
    <CVSectionTitle anchor-id="skills">
      <CVText :text="t('skills.title')" />
    </CVSectionTitle>
    <article class="skills-container">
      <CVSkillItem
        v-for="skill in programmingLanguages"
        :key="skill.id"
        :skill="skill"
      />
    </article>

    <article class="item">
      <div class="head">
        <div class="title">
          <CVText :text="t('skills.os.title')" />
        </div>
      </div>
      <div class="body">
        <div class="detail">
          <CVText :text="osString" />
        </div>
      </div>
    </article>

    <article class="item">
      <div class="head">
        <div class="title">
          <CVText :text="t('skills.softwares.title')" />
        </div>
      </div>
      <div class="body">
        <div class="detail">
          <CVText :text="softwaresString" />
        </div>
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

const programmingLanguages = computed(() =>
  data.skills.programmingLanguages
    .filter(skill => skill.level > (config.skills?.level?.min ?? 0))
);

const osString = computed(() => data.skills.os
  .map(os => t(`skills.os.items.${os.id}`))
  .join('\n')
);

const softwaresString = computed(() => data.skills.softwares
  .map(software => t(`skills.softwares.items.${software.id}`))
  .join(', ')
);
</script>

<style lang="scss" scoped>
.cv-skills {

  .skills-container {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-flow: row wrap;
  }

  .item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 0.5rem;
    font-size: 0.8rem;
    break-inside: avoid;

    .head {
      width: 10rem;
      padding-right: 0.2rem;

      .title {
        font-weight: bold;
      }
    }

    .body {
      width: 70%;

      .location {
        font-weight: bold;
      }
    }
  }
}
</style>
