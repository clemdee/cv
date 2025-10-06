import type { DateSpan, DataConst } from '~/stores/data';
import { defineStore } from 'pinia';
import config from './config';

export type DateDuration = {
  min?: string,
  max?: string,
}

export type LevelFilter = {
  min?: number,
  max?: number,
}

export type SkillId = DataConst['skills'][number]['id'];

export type EducationConfig = {
  date?: DateSpan,
  duration?: DateDuration,
  certification?: string,
  show?: {
    id?: DataConst['education'][number]['id'][],
    skills?: SkillId[],
    tags?: string[],
  }
}

export type ExperienceConfig = {
  date?: DateSpan,
  duration?: DateDuration,
  show?: {
    id?: DataConst['experience'][number]['id'][],
    skills?: SkillId[],
    tags?: string[],
  }
}

export type HobbiesConfig = {
  date?: DateSpan,
  duration?: DateDuration,
  show?: {
    id?: DataConst['hobbies'][number]['id'][],
    skills?: SkillId[],
    tags?: string[],
  }
}

export type SkillsConfig = {
  level?: LevelFilter,
  show?: {
    id?: SkillId[],
    tags?: string[],
  }
}

export type Config = {
  education?: EducationConfig,
  experience?: ExperienceConfig,
  hobbies?: HobbiesConfig,
  skills?: SkillsConfig,
}

export type ConfigJSON = typeof config;

export const useConfig = defineStore('config', () => config as Config);
