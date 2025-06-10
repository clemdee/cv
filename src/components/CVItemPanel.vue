<template>
  <aside
    class="item-panel"
    :class="{
      visible: panel.visible,
    }"
    v-on-click-outside="panel.hide"
  >
    <hgroup>
      <h1>
        <CVText :text="item?.title" />
      </h1>
      <p>
        <CVText :text="t(`${item?.type}.title`)" />
      </p>
    </hgroup>

    <div>
      <CVText :text="item?.description" />
    </div>

    <div class="location">
      <Icon icon="mdi:home-city-outline" />
      <CVText :text="item?.location?.name" />
      <br/>
      <Icon icon="mdi:map-marker-outline" />
      <CVText :text="item?.location?.location" />
    </div>

    <div
      v-if="item?.location"
      id="map"
      class="map"
    />
  </aside>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import type { Education, Experience } from '~/stores/data';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePanel = defineStore('panel', () => {

  type Item = Education | Experience;

  const item = ref<Item>();
  const visible = ref(false);

  const set = (newItem: Item) => {
    item.value = newItem;
    show();
  }

  const show = () => {
    visible.value = true;
  }

  const hide = () => {
    visible.value = false;
  }

  return {
    item: readonly(item),
    set,
    visible: readonly(visible),
    show,
    hide,
  }
});
</script>

<script lang="ts" setup>

import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { computed, onMounted, readonly, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';
import { vOnClickOutside } from '@vueuse/components';

const { t } = useI18n();

const panel = usePanel();

const item = computed(() => panel.item);

const coords = computed<[lat: number, lng: number]>(() => {
  return item.value?.location?.map ?? [0, 0];
});

onMounted( () => {
  const map = Leaflet.map('map');

  watch(item, () => {
    map.setView(coords.value, 15);
    Leaflet.marker(coords.value).addTo(map);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  });
});
</script>

<style lang="scss" scoped>
.item-panel {
  position: fixed;
  inset-block: 0rem;
  inset-inline-end: 0rem;
  translate: 100% 0rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;

  width: 30rem;
  padding: 2rem;
  box-shadow: 0rem 0rem 0.5rem black;

  color: var(--colorscheme-content-text);
  background-color: var(--colorscheme-content-background);

  transition: translate 200ms ease;

  &.visible {
    translate: 0rem 0rem;
  }

  @media print {
    display: none;
  }

  @media screen and (width < 60rem) {
    inset-inline: 0rem;
    inset-block-start: unset;
    inset-block-end: 0rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: unset;
    height: 30rem;
    padding: 2rem;

  }

  hgroup {
    font-family: "roboto-thin";

    h1 {
      font-weight: 800;
    }

    p {
      font-style: italic;
      font-size: 1rem;
    }
  }

  .map {
    height: 10rem;
  }
}
</style>

<style lang="scss">
#map {
  .leaflet-control-container {
    font-size: 0.5rem;
  }

  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.8rem;
  }
}
</style>
