<template>
  <transition
    name="collapse"
    @enter="updateScrollHeight($el)"
    @leave="updateScrollHeight($el)"
  >
    <article
      class="cv-base-item"
      :class="{
        editing,
        hidden: !visible,
      }"
      @click="editing && input?.click()"
      v-show="editing || visible"
    >
      <div class="cv-base-item-wrapper">

        <CVAnchor
          v-if="props.anchorId"
          v-show="!editing"
          :id="props.anchorId"
        />

        <input
          v-if="editing"
          type="checkbox"
          v-model="visible"
          @click.stop
          ref="input"
        />

        <div class="cv-base-item-content">
          <slot />
        </div>

      </div>
    </article>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CVAnchor from '~/components/CVAnchor.vue';

const visible = defineModel('visible', {
  default: true,
  required: true,
});

const props = defineProps<{
  anchorId: string,
}>();

const input = ref<HTMLElement | null>(null);

const editing = ref(false);

const scrollHeight = ref('0px');
const updateScrollHeight = (el: HTMLElement) => {
  scrollHeight.value = `${ el.scrollHeight }px`;
}

</script>

<style lang="scss" scoped>
.collapse-enter-active,
.collapse-leave-active {
  height: v-bind('scrollHeight');
  transition:
    height 0.5s ease,
    margin-bottom 0.5s ease;
  overflow-y: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0px;
  margin-bottom: 0px;
}

.cv-base-item {
  font-size: 0.8rem;
  break-inside: avoid;
  backface-visibility: hidden; /* For animation hardware acceleration */

  .cv-base-item-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1rem;

    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      --hover-color: rgb(from var(--colorscheme-content-text) r g b / 0.15);
      box-shadow:
        -0.1rem 0.1rem 0.2rem var(--hover-color),
        0.1rem 0.1rem 0.2rem var(--hover-color);
    }

    :deep( svg ) {
      font-size: 0.7rem;
      color: hsl(from var(--colorscheme-content-text) h 0 calc(l * 1.2));
      width: 0.8rem;
      margin-right: 0.3rem;
    }

    .cv-base-item-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      gap: 1rem;
    }
  }

  /* anchor */

  .anchor {
    position: absolute;
    top: 0.6rem;
    right: 100%;
    padding-right: 0.35rem;
    font-size: 0.8rem;
  }

  &:hover {
    .anchor {
      opacity: 0.5;
    }
  }

  /* input */

  input[type="checkbox"] {
    position: absolute;
    top: 0.65rem;
    right: 100%;
    margin-right: 0.6rem;
    font-size: 0.8rem;
    filter: grayscale(100%);
  }

  /* Editing mode */

  &.editing {
    cursor: pointer;

    &.hidden {
      opacity: 0.5;
    }

    .cv-base-item-content {
      pointer-events: none;
      user-select: none;
    }
  }

  .iconify {
    margin-bottom: -0.075rem;
  }
}
</style>
