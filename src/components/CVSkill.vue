<template>
  <Tippy append-to="parent">
    <transition
      name="collapse"
      @enter="updateScrollWidth"
      @leave="updateScrollWidth"
    >
      <GlintWrapper
        v-show="editing || isVisible"
        class="cv-skill-item"
        :class="{
          editing,
          hidden: !isVisible,
        }"
        @click="editing && input?.click()"
      >
        <input
          v-if="editing"
          ref="input"
          type="checkbox"
          :checked="isVisible"
          @change="isVisible = input?.checked ?? false"
        />
        <CVText :text="skillName" />
      </GlintWrapper>
    </transition>

    <template #content>
      <div class="tippy-content">
        <div class="skill-name">
          {{ skillName }}
        </div>
        <div class="skill-level">
          <div
            class="meter"
            :style="{
              '--percentage': `${props.skill.level * 100}%`,
            }"
          />
          <span class="title">{{ skillLevel }}</span>
        </div>
      </div>
    </template>
  </Tippy>
</template>

<script lang="ts" setup>
import type { Skill } from '~/stores/data';
import { computed, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tippy } from 'vue-tippy';
import CVText from '~/components/CVText.vue';
import GlintWrapper from '~/components/GlintWrapper.vue';
import { useConfig } from '~/stores/config';
import { skillLevels } from '~/stores/data';

const props = defineProps<{
  skill: Skill
}>();

const { t } = useI18n();
const config = useConfig();

const getSkillLevel = (skill: Skill) => {
  return Object.entries(skillLevels)
    .toSorted(([, thresholdA], [, thresholdB]) => thresholdB - thresholdA)
    .find(([, threshold]) => skill.level >= threshold)?.[0];
};

const getSkillLevelTitle = (skill: Skill) => {
  return t(`skills.levels.${getSkillLevel(skill)}`);
};

const skillName = computed(() => props.skill.title);
const skillLevel = computed(() => getSkillLevelTitle(props.skill));

const input = useTemplateRef('input');

const editing = ref(false);

const isVisible = computed(() =>
  !config.skills?.filter?.id
  || (config.skills.filter.id as unknown as string).includes(props.skill.id),
);

const scrollWidth = ref('0px');
const updateScrollWidth = (el: Element) => {
  scrollWidth.value = `${el.scrollWidth}px`;
};
</script>

<style lang="scss" scoped>
.collapse-enter-active,
.collapse-leave-active {
  width: v-bind('scrollWidth');
  transition:
    width 0.5s ease,
    padding 0.5s ease,
    margin 0.5s ease;
  overflow-y: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  width: 0px;
  padding: 0px;
  margin: 0px;
}

.cv-skill-item {
  position: relative;
  padding: 0.05rem 0.5rem;
  border-radius: 0.3rem;
  background-color: var(--colorscheme-main);
  backface-visibility: hidden; /* For hardware acceleration */

  font-size: 0.8rem;
  color: var(--colorscheme-main-text);
  white-space: nowrap;
  cursor: default;

  /* input */

  input[type="checkbox"] {
    margin-right: 0.3rem;
    font-size: 0.8rem;
    filter: grayscale(100%);
    pointer-events: none;
  }

  /* Editing mode */

  &.editing {
    cursor: pointer;

    &.hidden {
      opacity: 0.5;
    }
  }
}
</style>

<style lang="scss">
.tippy-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.2rem;

  .skill-name {
    font-weight: bold;
  }

  .skill-level {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    .meter {
      display: inline-block;
      height: 0.5rem;
      width: 5rem;
      border-radius: 0.5rem;
      background-image: linear-gradient(
        to right,
        var(--colorscheme-secondary) 0% var(--percentage),
        currentColor var(--percentage) 100%
      );
    }

    .title {
      font-style: italic;
      text-transform: capitalize;
    }
  }
}
</style>
