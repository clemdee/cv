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
      {{ skillName }}: {{ skill.level * 100 }}%
    </template>
  </Tippy>
</template>

<script lang="ts" setup>
import type { JSONSkill } from '~/stores/data';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useConfig } from '~/stores/config';

import { Tippy } from 'vue-tippy';
import CVText from '~/components/CVText.vue';
import GlintWrapper from '~/components/GlintWrapper.vue';

const config = useConfig();

const props = defineProps<{
  skill: JSONSkill,
}>();

const { t } = useI18n();
const skillName = t(`skills.items.${ props.skill.id }`);

const input = ref<HTMLInputElement | null>(null);

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
  --level: calc( v-bind('skill.level') * 100%);
  padding: 0.15rem 0.5rem;
  margin: 0.1rem;
  border-radius: 0.3rem;
  background-color: var(--colorscheme-main);
  background-image: linear-gradient(100deg,
    transparent 0%,
    var(--level, 0%),
    #fff4 var(--level, 0%),
  );
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
