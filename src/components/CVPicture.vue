<template>
  <div class="cv-picture">
    <img
      src="../stores/profiles/profile-light.jpg"
      alt="Profile Picture"
    />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.cv-picture {
  align-self: center;

  border: 0.2rem solid white;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem 0 1rem 0;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>
