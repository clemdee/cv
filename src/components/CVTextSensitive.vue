<template>
  <CVText
    class="sensitive"
    :class="{
      placeholder: isPlaceholder,
    }"
    :text="text"
    :tag="props.tag"
    :inert="isPlaceholder"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CVText from '~/components/CVText.vue';
import { randomInt } from '~/composables/utils';

const props = defineProps<{
  tag?: string
  text?: string
  placeholder?: string
}>();

const randomGibberish = () => {
  const length = randomInt(8, 20);
  const codePoints = [];
  for (let i = 0; i < length; i++) {
    // code points so that it somehow looks gibberish
    codePoints.push(randomInt(8000, 1200));
  }
  return String.fromCodePoint(...codePoints);
};

const isPlaceholder = computed(() => {
  return props.text?.trim() === '';
});

const text = computed(() => {
  if (!isPlaceholder.value) {
    return props.text;
  }
  return props.placeholder
    ? props.placeholder
    : randomGibberish();
});
</script>

<style lang="scss" scoped>
.sensitive {
  --margin: 0.2rem;
  display: inline-flex;
  overflow: hidden;
  margin: calc(-1 * var(--margin));
  padding: var(--margin);
  outline-offset: calc(var(--outline-offset) - var(--margin));

  &.placeholder {
    filter: blur(0.2rem);
    user-select: none;
    pointer-events: none;
  }
}
</style>
