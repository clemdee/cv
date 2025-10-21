<template>
  <Tippy appendTo="parent">
      <transition
        name="collapse"
        @enter="updateScrollWidth"
        @leave="updateScrollWidth"
      >
        <GlintWrapper
          class="cv-skill-item"
          :class="{
            editing,
            hidden: !isVisible,
          }"
          @click="editing && input?.click()"
          v-show="editing || isVisible"
        >
          <input
            type="checkbox"
            v-if="editing"
            :checked="isVisible"
            @change="isVisible = input?.checked ?? false"
            ref="input"
          />
          <CVText :text="skillName" />
        </GlintWrapper>
      </transition>

    <template #content>
      {{ skillName }}: {{ skillLevel * 100 }}/100
    </template>
  </Tippy>
</template>

<script lang="ts" setup>
import { type Skill } from '~/stores/data';
import { ref, computed, useTemplateRef } from 'vue';
import { useConfig } from '~/stores/config';

import { Tippy } from 'vue-tippy';
import CVText from '~/components/CVText.vue';
import GlintWrapper from '~/components/GlintWrapper.vue';

const config = useConfig();

const props = defineProps<{
  skill: Skill,
}>();

const skillName = computed(() => props.skill.title);
const skillLevel = computed(() => props.skill.level);

const input = useTemplateRef('input');

const editing = ref(false);

const isVisible = computed(() =>
  !config.skills?.show?.id
  || (config.skills.show.id as unknown as string).includes(props.skill.id)
);

const scrollWidth = ref('0px');
const updateScrollWidth = (el: Element) => {
  scrollWidth.value = `${ el.scrollWidth }px`;
}

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
