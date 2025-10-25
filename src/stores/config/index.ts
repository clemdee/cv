import type { ColorschemeId } from '~/composables/colorscheme';
import type { ProfileFrameId } from '~/composables/profileFrame';
import type { RecursivePartial } from '~/composables/utils';
import type { DataConst } from '~/stores/data';
import { reactive } from 'vue';
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

export interface CoordinatesConfig {
  showPronouns?: boolean
}

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
    date,
    show: {
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
    show: {
      level: { min: 0, max: 1 },
      id: data.skills.map(skill => skill.id) as SkillId[],
    },
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
    date: mergeMinMax(defaultItem.date, item?.date),
    show: {
      id: (item?.show?.id ?? defaultItem.show.id) as ItemId[],
    },
  };
};

const mergeConfig = (defaultConfig: DefaultConfig, config: Config): DefaultConfig => {
  return {
    colorscheme: {
      preset: config.colorscheme?.preset ?? defaultConfig.colorscheme.preset,
    },
    profile: {
      filename: config.profile?.filename ?? defaultConfig.profile.filename,
      frame: config.profile?.frame ?? defaultConfig.profile.frame,
      compressed: config.profile?.compressed ?? defaultConfig.profile.compressed,
    },
    coordinates: {
      showPronouns: config.coordinates?.showPronouns ?? defaultConfig.coordinates.showPronouns,
    },
    education: mergeConfigItems('education', defaultConfig, config),
    experience: mergeConfigItems('experience', defaultConfig, config),
    hobbies: mergeConfigItems('hobbies', defaultConfig, config),
    skills: {
      show: {
        id: config.skills?.show?.id ?? defaultConfig.skills.show.id,
        level: mergeMinMax(defaultConfig.skills.show.level, config.skills?.show?.level),
      },
    },
  };
};

const merged = mergeConfig(defaultConfig, config as Config);

export const useConfig = () => {
  return reactive(merged);
};
