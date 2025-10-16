import config from './config';
import { type DataConst, useData } from '~/stores/data';
import { type RecursivePartial } from '~/composables/utils';
import { reactive } from 'vue';
const data = useData();

type MinMax<T> = {
  min: T,
  max: T,
};

const getMinMax = <T, V>(
  list: T[],
  getter: (item: T) => V | V[],
): MinMax<V | undefined> => {
  const values = list.flatMap(getter).toSorted();
  return {
    min: values.at(0),
    max: values.at(-1),
  }
}

export type ItemId = DataConst['experience' | 'education' | 'hobbies'][number]['id'];
export type SkillId = DataConst['skills'][number]['id'];

export type CoordinatesConfig = {
  showPronouns?: boolean,
}

export const profileFrames = {
  square: { borderRadius: '0rem' },
  roundedHalf: { borderRadius: '1rem 0rem 1rem 0rem' },
  roundedHalf2: { borderRadius: '0rem 1rem 0rem 1rem' },
  rounded: { borderRadius: '1rem' },
  circle: { borderRadius: '100dvw' },
  none: { borderStyle: 'none' },
};

export type ProfileFrames = keyof typeof profileFrames;

const createDefaultItem = <
  ItemType extends 'experience' | 'education' | 'hobbies'
>(item: ItemType) => {
  type Item = (typeof data)[ItemType][number];

  const date = getMinMax(
    data[item] as Item[],
    (item => Object.values(item.date ?? {}))
  );

  type ItemId = DataConst[ItemType][number]['id'];
  const ids = data[item].map((item) => item.id) as ItemId[];

  return {
    date: date,
    show: {
      id: ids,
    }
  };
}

type Item<T extends 'experience' | 'education' | 'hobbies'> = ReturnType<typeof createDefaultItem<T>>;

const defaultConfig = {
  profile: {
    filename: 'profile.jpg',
    frame: 'square' as ProfileFrames,
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
      id: data.skills.map((skill) => skill.id) as SkillId[],
    }
  }
};

export type DefaultConfig = typeof defaultConfig;
export type Config = RecursivePartial<DefaultConfig>;

const mergeMinMax = <T>(
  defaultMinMax: MinMax<T>,
  minMax: Partial<MinMax<T>> | undefined
): MinMax<T> => {
  return {
    min: minMax?.min ?? defaultMinMax.min,
    max: minMax?.max ?? defaultMinMax.max,
  }
}

const mergeConfigItems = <
  ItemType extends 'experience' | 'education' | 'hobbies'
>(
  itemType: ItemType,
  defaultConfig: DefaultConfig,
  config: Config
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
    profile: {
      filename: config.profile?.filename ?? defaultConfig.profile.filename,
      frame: config.profile?.frame ?? defaultConfig.profile.frame,
    },
    coordinates: {
      showPronouns: config.coordinates?.showPronouns ?? defaultConfig.coordinates.showPronouns
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

const merged = mergeConfig(defaultConfig, config as Config)

export const useConfig = () => {
  return reactive(merged);
};
