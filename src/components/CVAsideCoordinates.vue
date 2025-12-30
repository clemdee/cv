<template>
  <article class="coordinates">
    <h2><CVText :text="data.profile.name" /></h2>

    <div class="items">
      <div class="item">
        <Icon icon="mdi:user" />
        <div>
          <CVText :text="`${t('coordinates.age', { age })}, ${data.profile.nationality}`" />
          <template v-if="showPronouns">
            <br />
            <CVText
              class="pronouns"
              :text="data.profile.pronouns"
            />
          </template>
        </div>
      </div>

      <div
        v-if="data.profile.address"
        class="item"
      >
        <Icon icon="mdi:map-marker" />
        <CVTextSensitive
          :text="t('coordinates.address.full', data.profile.address).trim()"
          placeholder="01 name of the street
            01234 region
            country"
        />
      </div>

      <div
        v-if="data.profile.email"
        class="item"
      >
        <Icon icon="mdi:envelope" />
        <CVTextSensitive
          tag="a"
          :text="data.profile.email"
          :href="`mailto:${data.profile.email}`"
          placeholder="name@domain.com"
        />
      </div>

      <div
        v-if="data.profile.phone"
        class="item"
      >
        <Icon icon="mdi:phone" />
        <CVTextSensitive
          tag="a"
          :text="data.profile.phone"
          :href="`tel:${data.profile.phone}`"
          placeholder="+00123456789"
        />
      </div>

      <div
        v-for="link in data.profile.links"
        :key="link.title"
        class="item"
      >
        <Icon :icon="link.icon" />
        <CVText
          tag="a"
          :text="link.title"
          :href="link.url"
          target="_blank"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { Temporal } from '@js-temporal/polyfill';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CVText from '~/components/CVText.vue';

import CVTextSensitive from '~/components/CVTextSensitive.vue';
import { useConfig } from '~/stores/config';
import { useData } from '~/stores/data';

const { t } = useI18n();
const config = useConfig();
const data = useData();

const showPronouns = computed(() => {
  if (!config.coordinates?.showPronouns) return false;
  return !!data.profile.pronouns;
});

const age = computed(() => {
  if (!data.profile.birthdate) return;
  const birthdate = Temporal.PlainDate.from(data.profile.birthdate);
  const now = Temporal.Now.plainDateISO();
  return now.since(birthdate)
    .round({ largestUnit: 'years', relativeTo: birthdate })
    .years;
});
</script>

<style lang="scss" scoped>
.coordinates {
  font-size: 0.80rem;
  line-height: 1.35rem;

  h2 {
      margin-bottom: 0.5rem;
      font-size: 1.15rem;
      text-transform: uppercase;
      font-family: roboto-thin;
      font-weight: bold;
      text-align: center;
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-items: stretch;
    gap: 0.5rem;

    .item {
      display: flex;
      align-items: flex-start;
      line-height: 1rem;

      svg {
        flex-shrink: 0;
        width: 1rem;
        margin-top: 0.15rem;
        margin-left: 0.15rem;
        margin-right: 0.5rem;
        color: var(--colorscheme-secondary);
      }
    }
  }

  .pronouns {
    font-size: 0.83em;
    font-style: italic;
    vertical-align: top;
    color: hsl(from var(--colorscheme-main-text) h 0 calc(l * 0.7));
  }
}
</style>
