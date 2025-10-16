<template>
  <article class="profile-picture">
    <h3>Profile Picture</h3>

    <div class="picture-select">
      <label
        v-for="picture in pictures"
        :key="picture.filename"
        class="picture"
        :class="{
          current: picture.filename === currentPictureFilename
        }"
      >
        <input
          v-model="currentPictureFilename"
          type="radio"
          :value="picture.filename"
        />
        <img :src="picture.url" />
        <div class="filename">
          {{ picture.filename }} ({{ picture.size }})
        </div>
      </label>

      <label
        class="picture none"
        :class="{
          current: currentPictureFilename === ''
        }"
      >
        <input
          v-model="currentPictureFilename"
          type="radio"
          value=""
        />
        <div class="icon-wrapper">
          <Icon icon="radix-icons:value-none" />
        </div>
        <div class="filename">
          no picture
        </div>
      </label>
    </div>
  </article>

  <article class="profile-frame">
    <h3>Profile Frames</h3>

    <div class="frame-select">
      <label
        v-for="(frame, frameId) in frames"
        :key="frameId"
        class="frame"
        :class="{
          current: frameId === currentFrameId
        }"
        :style="frame"
      >
        <input
          v-model="currentFrameId"
          type="radio"
          :value="frameId"
        />
      </label>

      <label
        class="frame none"
        :class="{
          current: currentFrameId === 'none'
        }"
      >
        <input
          v-model="currentFrameId"
          type="radio"
          value="none"
        />
        <Icon icon="radix-icons:value-none" />
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { toRef } from 'vue';
import { useConfig, profileFrames } from '~/stores/config';
import { pictures } from '~/composables/pictures';

const config = useConfig();
const currentPictureFilename = toRef(config.profile, 'filename');

const { none, ...frames } = profileFrames;
const currentFrameId = toRef(config.profile, 'frame');
</script>

<style lang="scss" scoped>
.profile-picture {
  .picture-select {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    .picture {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      aspect-ratio: 1;
      width: 5rem;
      cursor: pointer;

      &.current {
        img {
          box-shadow: 0rem 0rem 0rem 0.1rem var(--colorscheme-secondary);
        }

        .icon-wrapper {
          border: 0.1rem solid var(--colorscheme-secondary);
        }
      }

      input[type="radio"] {
        display: none;
      }

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
      }

      .icon-wrapper {
        display: grid;
        place-items: center;
        aspect-ratio: 1;
        width: 100%;
        border: 0.1rem solid currentColor;
        color: rgba(from currentColor r g b / 0.3);
        font-size: 3rem;
      }

      .filename {
        font-size: 0.8rem;
        color: rgba(from currentColor r g b / 0.7);
        text-align: center;
      }
    }
  }
}


.profile-frame {
  .frame-select {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;

    .frame {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      width: 4rem;
      border: 0.1rem solid currentColor;
      color: rgba(from currentColor r g b / 0.3);
      font-size: 2rem;
      cursor: pointer;

      &.none {
        border-style: dashed;
      }

      &.current {
        border-color: var(--colorscheme-secondary);
      }

      input[type="radio"] {
        display: none;
      }
    }
  }
}
</style>
