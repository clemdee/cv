<template>
  <article class="profile-picture">
    <h3>Profile Picture</h3>

    <div class="picture-select">
      <label
        v-for="picture in pictures"
        :key="picture.filename"
        class="picture"
        :class="{
          current: picture.filename === currentPictureFilename,
        }"
      >
        <div class="image focus-wrapper">
          <input
            v-model="currentPictureFilename"
            type="radio"
            name="profile-picture"
            :value="picture.filename"
          />

          <img :src="picture.url" />
        </div>

        <div class="filename">
          {{ picture.filename }} ({{ picture.size }})
        </div>
      </label>

      <label
        class="picture none"
        :class="{
          current: currentPictureFilename === '',
        }"
      >
        <div class="image focus-wrapper">
          <input
            v-model="currentPictureFilename"
            type="radio"
            name="profile-picture"
            value=""
          />
          <div class="icon-wrapper">
            <Icon icon="radix-icons:value-none" />
          </div>
        </div>
        <div class="filename">
          no picture
        </div>
      </label>
    </div>

    <div class="toggle-wrapper compress">
      <label>
        <span>
          Compress picture
        </span>

        <InputToggle
          v-model="config.profile.compressed"
        />
      </label>

      <div
        v-if="config.profile.compressed"
        class="compress-size"
      >
        <span v-if="currentPicture?.compressed?.size">
          {{ currentPicture.size }} → {{ currentPicture.compressed.size }}
        </span>

        <Icon
          v-else
          icon="codex:loader"
        />
      </div>
    </div>
  </article>

  <article class="profile-frame">
    <h3>Profile Frames</h3>

    <div class="frame-select">
      <label
        v-for="(frame, frameId) in framesButNone"
        :key="frameId"
        class="frame focus-wrapper"
        :class="{
          current: frameId === currentFrameId,
        }"
        :style="frame"
      >
        <input
          v-model="currentFrameId"
          type="radio"
          name="profile-frame"
          :value="frameId"
        />
      </label>

      <label
        class="frame none focus-wrapper"
        :class="{
          current: currentFrameId === 'none',
        }"
      >
        <input
          v-model="currentFrameId"
          type="radio"
          name="profile-frame"
          value="none"
        />
        <Icon icon="radix-icons:value-none" />
      </label>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, toRef } from 'vue';
import { frames } from '~/composables/profileFrame';
import { pictures, resolvePicture } from '~/composables/profilePicture';
import { useConfig } from '~/stores/config';
import InputToggle from './InputToggle.vue';

const config = useConfig();
const currentPictureFilename = toRef(config.profile, 'filename');
const currentPicture = computed(() => resolvePicture(currentPictureFilename.value));

const { none, ...framesButNone } = frames;
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
      --width: 5rem;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: center;
      width: var(--width);
      cursor: pointer;

      &.current {
        img {
          box-shadow: 0rem 0rem 0rem 0.1rem var(--colorscheme-secondary);
        }

        .icon-wrapper {
          border: 0.1rem solid var(--colorscheme-secondary);
        }
      }

      .image {
        position: relative;
        width: var(--width);
        height: var(--width);

        input[type="radio"] {
          position: absolute;
          inset: 0rem;
          opacity: 0;
          cursor: inherit;
        }

        img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          object-position: center;
        }
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

.compress {
  .compress-size {
    display: flex;
    align-items: center;

    span {
      font-style: italic;
      font-size: 0.9em;
    }

    svg {
      font-size: 1.5rem;
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
      position: relative;
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      width: 4rem;
      border: 0.1rem solid rgba(from currentColor r g b / 0.3);
      font-size: 2rem;
      cursor: pointer;

      &.none {
        border-style: dashed;
      }

      &.current {
        border-color: var(--colorscheme-secondary);
      }

      input[type="radio"] {
        position: absolute;
        inset: 0rem;
        opacity: 0;
        cursor: inherit;
      }
    }
  }
}
</style>
