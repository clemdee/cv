<template>
  <div
    ref="root"
    class="options-locale"
  >
    <label
      class="locale"
      v-for="availableLocale in availableLocales"
      :key="availableLocale"
    >
      <input
        type="radio"
        name="locale"
        :value="availableLocale"
        v-model="locale"
      />
      <span>{{ availableLocale }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const root = useTemplateRef('root');

const { availableLocales, locale } = useI18n();

const viewport = window.visualViewport;

const dx = ref(0);
const dy = ref(0);
const scale = ref(1);

function viewportHandler() {
  if (!viewport) return;
  if (!root.value) return;
  dx.value = document.body.clientWidth - viewport.width - viewport.offsetLeft;
  dy.value = document.body.clientHeight - viewport.height - viewport.offsetTop;
  scale.value = 1 / viewport.scale;
}

onMounted(() => {
  viewportHandler();
});

window.visualViewport?.addEventListener("scroll", viewportHandler, { passive: true });
window.visualViewport?.addEventListener("resize", viewportHandler, { passive: true });

</script>

<style lang="scss" scoped>
.options-locale {
  --dx: calc(v-bind('dx') * 1px);
  --dy: calc(v-bind('dy') * 1px);
  --scale: v-bind('scale');

  --margin: 1rem;

  position: fixed;
  right: calc(var(--margin) * var(--scale) + var(--dx));
  bottom: calc(var(--margin) * var(--scale) + var(--dy));
  display: inline-flex;
  transform-origin: bottom right;
  scale: pow(var(--scale), 0.5);
  display: inline-flex;
  filter: drop-shadow(0rem 0rem 0.2rem #7773);

  @media print {
    display: none;
  }

  .locale {
    --border-radius: 0.5rem;
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3rem;
    border: 0.1rem solid #ccc;
    border-left-style: none;
    background-color: var(--colorscheme-content-background);
    color: var(--colorscheme-content-text);
    cursor: pointer;
    user-select: none;
    transition: 300ms;

    input[type="radio"] {
      display: none;
    }

    &:has(input:checked) {
      background-color: var(--colorscheme-main);
      color: var(--colorscheme-main-text);
      cursor: default;
    }

    &:first-child {
      border-left-style: solid;
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }

    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }
}
</style>
