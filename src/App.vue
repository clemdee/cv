<template>
  <CV />
  <Teleport to="body" >
    <OptionsLocale />
  </Teleport>
</template>

<script setup lang="ts">
import CV from '~/components/CV.vue';
import OptionsLocale from '~/components/OptionsLocale.vue';
</script>

<style scoped>
</style>
