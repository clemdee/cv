<template>
  <CVBaseItem
    class="cv-hobbies-item"
    :anchor-id="`hobbies-${hobby.id}`"
    :visible="isVisible"
    :display-left="!!qrcodeUrl"
    @click="panel.set(hobby)"
  >
    <div class="hobby-content">
      <div class="hobby-header">
        <div
          v-if="qrcodeUrl"
          class="qrcode"
        >
          <img
            :src="qrcodeUrl"
            :alt="hobby.url"
          />
        </div>
      </div>

      <div class="hobby-body">
        <div class="title">
          <CVText :text="hobby.title" />
        </div>

        <div class="details">
          <div
            v-if="hobby.description"
            class="description"
          >
            <CVText :text="hobby.description" />
          </div>

          <div
            v-if="hobby.url"
            class="url"
          >
            <a
              @click.stop
              :href="hobby.url"
              target="_blank"
            >
            <CVText :text="hobby.url" />
            </a>
          </div>

          <ul
            v-if="hobby.duties.length > 0"
            class="duties"
          >
            <CVText
              v-for="(text, index) in hobby.duties"
              :key="index"
              tag="li"
              :text="text"
            />
          </ul>

          <div class="skills">
            <CVSkillItem
              v-for="skill in hobby.skills"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Hobby } from '~/stores/data';
import { computed } from 'vue';
import { useConfig } from '~/stores/config';
import { usePanel } from './CVItemPanel.vue';

import CVText from '~/components/CVText.vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVSkillItem from './CVSkillItem.vue';
import { asyncComputed } from '@vueuse/core';
import QRCode from 'qrcode';

const config = useConfig();
const panel = usePanel();

const props = defineProps<{
  hobby: Hobby,
}>();

const isVisible = computed(() =>
  !config.hobbies?.show?.id
  || (config.hobbies.show.id as unknown as string).includes(props.hobby.id)
);

const qrcodeUrl = asyncComputed<string | undefined>(async () => {
  if (!props.hobby.url) return;
  try {
    return await QRCode.toDataURL(props.hobby.url, {
      margin: 2,
    });
  } catch (err) {
    console.error(err)
  }
}, undefined)
</script>

<style lang="scss" scoped>

.cv-hobbies-item {
  .hobby-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1rem;

    .hobby-header {
      flex-shrink: 0;
    }

    .hobby-body {
      width: fit-content;
    }
  }

  .qrcode img {
    margin-top: 0.2rem;
    height: 6rem;
  }

  .title {
    font-weight: bold;
  }

  .details {
    display: flex;
    flex-flow: column;
    gap: 0.2rem;

    a {
      font-style: italic;
    }

    ul.duties {
      padding-left: 0.8rem;
    }

    .skills {
      margin-top: 0.2rem;
      display: flex;
      flex-flow: row wrap;
      gap: 0.2rem;
    }
  }
}

</style>
