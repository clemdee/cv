<template>
  <a
    :id="id"
    class="anchor"
    :class="{ active }"
    :href="`#${id}`"
    tabindex="-1"
    aria-hidden="true"
    @click.prevent="toggleAnchor"
  >
    <Icon icon="mdi:link-variant" />
  </a>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  id: string
}>();

const hash = ref(location.hash);
const active = computed(() => {
  return hash.value.slice(1) === props.id;
});

const toggleAnchor = () => {
  location.hash = active.value
    ? ''
    : props.id;
};

window.addEventListener('hashchange', () => {
  hash.value = location.hash || '#';
});
</script>

<style lang="scss" scoped>
.anchor {
  opacity: 0;
  color: #a2a2a2ab;
  cursor: pointer;
  transition: all 100ms;

  &:hover,
  &.active {
    opacity: 1 !important;
  }

  @media print {
    display: none;
  }
}
</style>
