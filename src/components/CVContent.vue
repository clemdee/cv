<template>
  <div
    ref="root"
    class="cv-content"
  >
    <CVHeader />
    <CVSectionExperience v-if="config.experience.show" />
    <CVSectionSkills v-if="config.skills.show" />
    <CVSectionEducation v-if="config.education.show" />
    <CVSectionHobbies v-if="config.hobbies.show" />
    <div
      ref="pager"
      class="pager"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import CVHeader from '~/components/CVHeader.vue';
import CVSectionEducation from '~/components/CVSectionEducation.vue';
import CVSectionExperience from '~/components/CVSectionExperience.vue';
import CVSectionHobbies from '~/components/CVSectionHobbies.vue';
import CVSectionSkills from '~/components/CVSectionSkills.vue';
import { useConfig } from '~/stores/config';

const root = useTemplateRef('root');
const pager = useTemplateRef('pager');
const config = useConfig();

const lastPageHeight = ref(0);

const resizeObserver = new ResizeObserver(() => {
  if (!root.value) return;
  if (!pager.value) return;
  pager.value.style.display = 'none';
  const rects = root.value.getClientRects();
  const height = rects.item(rects.length - 1)?.height;
  lastPageHeight.value = height ?? 0;
  pager.value.style.display = '';
});

onMounted(() => {
  if (root.value) {
    resizeObserver.observe(root.value);
  }

  // Workaround for firefox bug
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1832939
  // ResizeObserver doesn't fire when element fills more than one column
  const isFirefox = navigator.userAgent.search('Firefox') !== -1;
  if (isFirefox) {
    const innerElements = document.querySelectorAll('.cv-content > *, .cv-base-item');
    innerElements.forEach((element) => {
      resizeObserver.observe(element);
    });
  }
});
</script>

<style lang="scss" scoped>
.cv-content {
  --last-page-height: calc(v-bind('lastPageHeight') * 1px);
  min-height: var(--page-height);
  padding: 2rem;
  background-color: var(--colorscheme-content-background);
  color: var(--colorscheme-content-text);

  .pager {
    content: '';
    display: block;
    height: calc(var(--page-height) - var(--last-page-height) - 1px);
  }
}
</style>
