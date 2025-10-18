<template>
  <span
    class="toggle"
    :class="[value ? 'on' : 'off']"
  >
    <div class="wrapper">
      <div class="dot" />

      <input
        v-model="value"
        type="checkbox"
      />
    </div>
  </span>
</template>

<script lang="ts" setup>
const value = defineModel();
</script>

<style lang="scss" scoped>
.toggle {
  --_toggle-height: var(--toggle-height, 2rem);
  --_toggle-width: var(--toggle-width, calc(var(--_toggle-height) * 2));
  --_toggle-color: var(--toggle-color, #41b883);
  --_toggle-color-on: var(--toggle-color-on, var(--_toggle-color));
  --_toggle-color-off: var(--toggle-color-off, #34495e);
  --_dot-color: var(--dot-color, #eee);
  --_dot-color-on: var(--dot-color-on, var(--_dot-color));
  --_dot-color-off: var(--dot-color-off, var(--_dot-color));
  --_dot-size: var(--dot-size, calc(var(--_toggle-height) * 2 / 3));

  display: inline-block;

  .wrapper {
    --_padding: calc((var(--_toggle-height) - var(--_dot-size)) / 2);

    position: relative;
    display: grid;
    align-content: center;
    height: var(--_toggle-height);
    width: var(--_toggle-width);
    padding-inline: var(--_padding);
    border-radius: calc(var(--_toggle-height) / 2);
    cursor: pointer;
    transition: all linear 100ms;

    .dot {
      aspect-ratio: 1;
      height: var(--_dot-size);
      border-radius: 100%;
      transition: all linear 100ms;
    }

    &:has(:focus-visible) {
      outline: solid;
    }

    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }

  &.on {
    .wrapper {
      background-color: var(--_toggle-color-on);
    }

    .dot {
      background-color: var(--_dot-color-on);
      translate: calc(var(--_toggle-width) - var(--_dot-size) - var(--_padding) * 2);
    }
  }

  &.off {
    .wrapper {
      background-color: var(--_toggle-color-off);
    }

    .dot {
      background-color: var(--_dot-color-off);
    }
  }
}
</style>
