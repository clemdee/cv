<template>
  <CVBaseItem
    class="cv-hobbies-item"
    :anchor-id="`hobbies-${hobby.id}`"
    :visible="isVisible"
    @click="panel.set(hobby)"
  >
    <template #left>
      <div
        v-if="hobby.date"
        class="date"
      >
        <CVText :text="hobby.date.from?.toString()" />
        -
        <CVText :text="hobby.date.to?.toString()" />
      </div>
    </template>

    <template #right>
      <div class="title">
        <CVText :text="hobby.title" />
      </div>

      <div class="details">
        <div class="description">
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
    </template>

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

const config = useConfig();
const panel = usePanel();

const props = defineProps<{
  hobby: Hobby,
}>();

const isVisible = computed(() =>
  !config.hobbies?.show?.id
  || (config.hobbies.show.id as unknown as string).includes(props.hobby.id)
);
</script>

<style lang="scss" scoped>

.cv-hobbies-item {
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
