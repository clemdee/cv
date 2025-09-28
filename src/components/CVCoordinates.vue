<template>
  <div class="coordinates">
    <h2><CVText :text="t('coordinates.name')" /></h2>

    <div class="items">
      <div class="item">
        <Icon icon="mdi:user" />
        <div>
          <CVText :text="t('coordinates.age', { age }) + ', ' + t('coordinates.nationality')" />
          <template v-if="t('coordinates.pronouns')">
            <br />
            <CVText
              class="pronouns"
              :text="t('coordinates.pronouns', '')"
            />
          </template>
        </div>
      </div>

      <div class="item">
        <Icon icon="mdi:map-marker" />
        <CVTextSensitive
          :text="t('coordinates.address.full', data.profile.address).trim()"
          :placeholder="`01 name of the street\n01234 region\ncountry`"
        />
      </div>

      <div class="item">
        <Icon icon="mdi:envelope" />
        <a :href="`mailto:${data.profile.email}`">
          <CVTextSensitive
            :text="data.profile.email"
            placeholder="name@domain.com"
          />
        </a>
      </div>

      <div class="item">
        <Icon icon="mdi:phone" />
        <a :href="`tel:${data.profile.phone}`">
          <CVTextSensitive
            :text="t('coordinates.phone', phone)"
            placeholder="+00123456789"
          />
        </a>
      </div>

      <div class="item">
        <Icon icon="mdi:linkedin" />
        <a :href="t('coordinates.linkedin.link')">
          <CVText :text="t('coordinates.linkedin.name')" />
        </a>
      </div>

      <div class="item">
        <Icon icon="mdi:github" />
        <a :href="t('coordinates.github.link')">
          <CVText :text="t('coordinates.github.name')" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import parsePhoneNumber from 'libphonenumber-js/min';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { useData } from '~/stores/data';
import { Temporal } from '@js-temporal/polyfill';
import { computed } from 'vue';

import CVText from '~/components/CVText.vue';
import CVTextSensitive from '~/components/CVTextSensitive.vue';

const { t } = useI18n();
const data = useData();

const phone = computed(() => {
  const phone = parsePhoneNumber(data.profile.phone);
  return {
    national: phone?.formatNational() ?? '',
    international: phone?.formatInternational() ?? '',
  };
});

const age = computed(() => {
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
