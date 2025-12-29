import type { ColorschemeId } from '~/composables/colorscheme';
import type { ProfileFrameId } from '~/composables/profileFrame';
import type { RecursivePartial } from '~/composables/utils';
import type { DataConst } from '~/stores/data';
import { reactive } from 'vue';
import { mergeDeep } from '~/composables/merge';
import { pictures } from '~/composables/profilePicture';
import { useData } from '~/stores/data';
import config from './config';

const data = useData();

interface MinMax<T> {
  min: T
  max: T
}

const getMinMax = <T, V>(
  list: T[],
  getter: (item: T) => V | V[],
): MinMax<V | undefined> => {
  const values = list.flatMap(getter).toSorted();
  return {
    min: values.at(0),
    max: values.at(-1),
  };
};

export type ItemId = DataConst['experience' | 'education' | 'hobbies'][number]['id'];
export type SkillId = DataConst['skills'][number]['id'];
export type SkillTag = DataConst['skills'][number]['tags'][number];

export interface SkillFilter {
  tag?: (SkillTag | `!${SkillTag}`)[]
  id?: (SkillId | `!${SkillId}`)[]
  level?: MinMax<number>
}

export interface SkillGroup {
  title?: string
  filter?: SkillFilter
}

export interface ItemsShows {
  description: boolean
  url: boolean
  qrcode: boolean
  skills: boolean
  duties: boolean
}

const createDefaultItemShows = (): ItemsShows => ({
  description: true,
  url: true,
  qrcode: true,
  skills: true,
  duties: true,
});

const createDefaultItem = <
  ItemType extends 'experience' | 'education' | 'hobbies',
>(item: ItemType) => {
  type Item = (typeof data)[ItemType][number];

  const date = getMinMax(
    data[item] as Item[],
    item => Object.values(item.date ?? {}),
  );

  type ItemId = DataConst[ItemType][number]['id'];
  const ids = data[item].map(item => item.id) as ItemId[];

  return {
    show: true,
    items: {
      show: createDefaultItemShows(),
    },
    filter: {
      date,
      id: ids,
    },
  };
};

type Item<T extends 'experience' | 'education' | 'hobbies'> = ReturnType<typeof createDefaultItem<T>>;

const defaultConfig = {
  colorscheme: {
    preset: 'light' as ColorschemeId,
  },
  profile: {
    filename: pictures[0]?.filename ?? '',
    frame: 'square' as ProfileFrameId,
    compressed: false,
  },
  coordinates: {
    showPronouns: true,
  },
  experience: createDefaultItem('experience'),
  education: createDefaultItem('education'),
  hobbies: createDefaultItem('hobbies'),
  skills: {
    show: true,
    filter: {
      level: { min: 0, max: 1 },
      id: [],
      tag: [],
    } as SkillFilter,
    groups: [{
      filter: {
        tag: ['!language'],
      },
    }] as SkillGroup[],
  },
};

export type DefaultConfig = typeof defaultConfig;
export type Config = RecursivePartial<DefaultConfig>;

const mergeMinMax = <T>(
  defaultMinMax: MinMax<T>,
  minMax: Partial<MinMax<T>> | undefined,
): MinMax<T> => {
  return {
    min: minMax?.min ?? defaultMinMax.min,
    max: minMax?.max ?? defaultMinMax.max,
  };
};

const mergeConfigItems = <
  ItemType extends 'experience' | 'education' | 'hobbies',
>(
  itemType: ItemType,
  defaultConfig: DefaultConfig,
  config: Config,
): Item<ItemType> => {
  type ItemId = DataConst[ItemType][number]['id'];

  const defaultItem = defaultConfig[itemType];
  const item = config[itemType] as RecursivePartial<Item<ItemType>> | undefined;

  return {
    show: item?.show ?? defaultItem.show,
    items: {
      show: mergeDeep(defaultItem.items.show, item?.items?.show),
    },
    filter: {
      date: mergeMinMax(defaultItem.filter.date, item?.filter?.date),
      id: (item?.filter?.id ?? defaultItem.filter.id) as ItemId[],
    },
  };
};

const mergeConfig = (defaultConfig: DefaultConfig, config: Config): DefaultConfig => {
  return {
    colorscheme: mergeDeep(defaultConfig.colorscheme, config.colorscheme),
    profile: mergeDeep(defaultConfig.profile, config.profile),
    coordinates: mergeDeep(defaultConfig.coordinates, config.coordinates),
    education: mergeConfigItems('education', defaultConfig, config),
    experience: mergeConfigItems('experience', defaultConfig, config),
    hobbies: mergeConfigItems('hobbies', defaultConfig, config),
    skills: {
      show: config.skills?.show ?? defaultConfig.skills.show,
      filter: (config.skills?.filter ?? defaultConfig.skills.filter) as SkillFilter,
      groups: (config.skills?.groups ?? defaultConfig.skills.groups) as SkillGroup[],
    },
  };
};

const merged = mergeConfig(defaultConfig, config as Config);

export const useConfig = () => {
  return reactive(merged);
};
