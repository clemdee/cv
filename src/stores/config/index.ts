import config from './config';
import { type DataConst, useData } from '~/stores/data';
import { type RecursivePartial } from '~/composables/utils';
import { reactive } from 'vue';
const data = useData();

const getMinMax = <T, V>(
  list: T[],
  getter: (item: T) => V | V[],
) => {
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

const defaultConfig = {
  profile: {
    url: '',
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
      id: [] as SkillId[],
    }
  }
}

export type Config = RecursivePartial<typeof defaultConfig>;

export const useConfig = () => {
  return reactive(config) as Config;
};
