<template>
  <aside
    class="item-panel"
    :class="{
      visible: panel.visible,
    }"
    v-on-click-outside="panel.hide"
  >
    <header>
      <hgroup>
        <h2>
          <CVText :text="item?.title" />
        </h2>
        <p>
          <CVText :text="t(`${item?.type}.title`)" />
        </p>
      </hgroup>

      <div
        class="close"
        @click="panel.hide"
      >
        <Icon icon="material-symbols-light:close" />
      </div>
    </header>

    <div
      v-if="item?.description"
      class="description"
    >
      <CVText :text="item?.description" />
    </div>

    <div
      v-if="item?.url"
      class="url"
    >
      <a
        @click.stop
        :href="item?.url"
        target="_blank"
      >
      <CVText :text="item?.url" />
      </a>
    </div>

    <ul
      v-if="item?.duties && item?.duties.length > 0"
      class="duties"
    >
      <CVText
        v-for="(text, index) in item?.duties"
        :key="index"
        tag="li"
        :text="text"
      />
    </ul>

    <div
      v-if="item?.skills && item?.skills?.length > 0"
      class="skills"
    >
      <CVSkill
        v-for="skill in item.skills"
        :key="skill.id"
        :skill="(skill as Skill)"
      />
    </div>

    <div
      v-show="item?.location"
      class="location"
    >
      <Icon icon="mdi:home-city-outline" />
      <CVText :text="item?.location?.name" />
      <br/>
      <Icon icon="mdi:map-marker-outline" />
      <CVText :text="item?.location?.location" />
    </div>

    <div
      v-show="item?.location?.map"
      id="map"
      class="map"
    />
  </aside>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';
import CVSkill from './CVSkill.vue';
import { vOnClickOutside } from '@vueuse/components';
import { Icon } from '@iconify/vue';

// Needed for marker to show in prod
import markerIconUrl from "~/../node_modules/leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "~/../node_modules/leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "~/../node_modules/leaflet/dist/images/marker-shadow.png";
Leaflet.Icon.Default.prototype.options.iconUrl = markerIconUrl;
Leaflet.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
Leaflet.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
Leaflet.Icon.Default.imagePath = "";

type Coord = [lat: number, lng: number];

const { t } = useI18n();
const panel = usePanel();
const item = computed(() => panel.item);

const coords = computed<Coord | undefined>(() => {
  return (item.value?.location?.map as Coord) ?? [0, 0];
});

onKeyStroke('Escape', (event) => {
  if (!panel.visible) return;
  event.preventDefault();
  panel.hide();
});

onMounted( () => {
  const map = Leaflet.map('map');
  let marker: ReturnType<typeof Leaflet.marker>;

  watch(item, async () => {
    if (!coords.value) return;
    // Wait for panel to open in order to get the map displayed with the right dimensions
    await wait(200);
    map.setView(coords.value, 15);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = Leaflet.marker(coords.value).addTo(map);
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  });
});
</script>

<script lang="ts">
import { type Skill, type Item } from '~/stores/data';
import { defineStore } from 'pinia';
import { ref, readonly } from 'vue';
import { wait } from '~/composables/utils';
import { onKeyStroke } from '@vueuse/core';

export const usePanel = defineStore('panel', () => {
  const item = ref<Item>();
  const visible = ref(false);
  let isHiding = false;

  const set = (newItem: Item) => {
    const oldItem = item.value;
    item.value = newItem;
    if (oldItem?.id === newItem.id && isHiding) {
      hide();
    } else {
      isHiding = false;
      show();
    }
  }

  const show = () => {
    visible.value = true;
  }

  const hide = async () => {
    if (!visible.value) return;
    visible.value = false;
    isHiding = true;
    await wait(1);
    if (isHiding) {
      item.value = undefined;
    }
  }

  const toggle = () =>{
    if (visible.value) {
      hide();
    } else {
      show();
    }
  }

  return {
    item: readonly(item),
    set,
    visible: readonly(visible),
    show,
    hide,
    toggle,
  }
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

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    hgroup {
      font-family: "roboto-thin";

      h1 {
        font-size: 1.6rem;
        font-weight: 800;
      }

      p {
        font-style: italic;
        font-size: 1rem;
      }
    }

    .close {
      margin-left: 1rem;
      cursor: pointer;

      svg {
        font-size: 2rem;
        opacity: 0.5;
      }
    }
  }

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

  .location {
    svg {
      font-size: 0.7rem;
      color: hsl(from var(--colorscheme-content-text) h 0 calc(l * 1.2));
      width: 0.8rem;
      margin-right: 0.3rem;
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
