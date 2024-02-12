<template>
  <span
    ref="textElement"
    class="text"
  >
    {{ animatedText }}
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { range, shuffle } from '~/composables/utils';

const props = defineProps<{
  text?: string,
}>();

const textElement = ref<HTMLElement | null>(null);

const text = computed(() => props.text ?? '');
const textArray = ref(text.value?.split(''));
const animatedText = computed(() => textArray.value.join(''));

const randomShuffledIntArray = (count: number) => {
  return shuffle(range(count));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;

let timeoutId: number;
const transitionDurationMs = prefersReducedMotion ? 1 : 100;
const timeoutMs = 10;
const mutateText = (toText: string) => {
  // Clear timeout in case locale changes during transition
  clearTimeout(timeoutId);
  // Reset textArray from what is currently displayed on the page
  textArray.value = animatedText.value.split('')
  // Get the max length the text could possibly be during the transition
  const maxLength = Math.max(animatedText.value.length, toText.length);
  const shuffledIndexArray = randomShuffledIntArray(maxLength);
  const simultaneousIndexes = Math.ceil(maxLength / (transitionDurationMs / timeoutMs));
  let index = 0;
  // Recursive function that is going to be called at intervals
  const mutationRecursiveFunction = () => {
    timeoutId = window.setTimeout(() => {
      for (let i = 0 ; i < simultaneousIndexes ; i++) {
        const charIndex = shuffledIndexArray[index];
        textArray.value[charIndex] = toText[charIndex];
        index++;
      }
      if (index <= maxLength) {
        // Continue to mutate text
        mutationRecursiveFunction();
      }
    }, timeoutMs);
  };
  mutationRecursiveFunction();
};

// In case there is a transition occuring on print
// Cancal transition and directly go to end state
window.addEventListener("beforeprint", () => {
  if (!textElement.value) return;
  clearTimeout(timeoutId);
  textArray.value = props.text?.split('') ?? [];
  textElement.value.innerText = props.text ?? '';
});

watch(
  () => props.text,
  text => mutateText(text ?? '')
);


</script>

<style lang="scss" scoped>
.text {
  white-space: pre-line;
}
</style>
