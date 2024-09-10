<template>
  <span
    class="sensitive"
    :class="{
      placeholder: !hasText,
    }"
  >
    <CVText :text="text" />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { randomInt } from '~/composables/utils';
import CVText from '~/components/CVText.vue';

const props = defineProps<{
  text?: string,
  placeholder?: string,
}>();

const randomGibberish = () => {
  const length = randomInt(8, 20);
  const codePoints = []
  for (let i = 0; i < length; i++) {
    // code points chosen so that it somehow looks gibberish
    codePoints.push(randomInt(8000, 1200));
  }
  return String.fromCodePoint(...codePoints);
}

const hasText = computed(() => {
  if (!props.text) return false;
  return props.text?.replace(/\s/g, '').length !== 0;
});

const text = computed(() => {
  if (hasText.value) {
    return props.text;
  }
  return props.placeholder
    ? props.placeholder
    : randomGibberish();
});
</script>

<style lang="scss" scoped>
.sensitive {
  display: inline-flex;
  overflow: hidden;
  border-radius: 0.5rem;

  &.placeholder > * {
    filter: blur(0.2rem);
  }
}
</style>
