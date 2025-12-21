<template>
  <CVBaseItem
    class="cv-hobbies-item"
    :item="hobby"
    :anchor-id="`hobbies-${hobby.id}`"
    :visible="isVisible"
  >
    <div class="hobby-content">
      <div
        v-if="config.hobbies.items.show.qrcode && qrcodeUrl"
        class="hobby-header"
      >
        <div class="qrcode">
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
            v-if="config.hobbies.items.show.description && hobby.description"
            class="description"
          >
            <CVText :text="hobby.description" />
          </div>

          <div
            v-if="config.hobbies.items.show.url && hobby.url"
            class="url"
          >
            <a
              :href="hobby.url"
              target="_blank"
              @click.stop
            >
              <CVText :text="hobby.url" />
            </a>
          </div>

          <ul
            v-if="config.hobbies.items.show.duties && hobby.duties.length > 0"
            class="duties"
          >
            <CVText
              v-for="(text, index) in hobby.duties"
              :key="index"
              tag="li"
              :text="text"
            />
          </ul>

          <CVSkills
            class="skills"
            :skills="hobby.skills"
          />
        </div>
      </div>
    </div>
  </CVBaseItem>
</template>

<script lang="ts" setup>
import type { Hobby } from '~/stores/data';
import { asyncComputed } from '@vueuse/core';
import QRCode from 'qrcode';
import { computed } from 'vue';
import CVBaseItem from '~/components/CVBaseItem.vue';
import CVText from '~/components/CVText.vue';
import { useConfig } from '~/stores/config';
import CVSkills from './CVSkills.vue';

const props = defineProps<{
  hobby: Hobby
}>();

const config = useConfig();

const isVisible = computed(() =>
  !config.hobbies?.filter?.id
  || (config.hobbies.filter.id as unknown as string).includes(props.hobby.id),
);

const qrcodeUrl = asyncComputed<string | undefined>(async () => {
  if (!props.hobby.url) return;
  try {
    return await QRCode.toDataURL(props.hobby.url, {
      margin: 2,
    });
  }
  catch (err) {
    console.error(err);
  }
}, undefined);
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
    }
  }
}
</style>
