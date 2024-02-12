import type { DateSpan, Data } from '~/stores/data';
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

export type SkillId = Data['skills'][keyof Data['skills']][number]['id'];

export type EducationConfig = {
  date?: DateSpan,
  duration?: DateDuration,
  diploma?: boolean,
  show?: {
    id?: Data['education'][number]['id'][],
    skills?: SkillId[],
    tags?: string[],
  }
}

export type ExperienceConfig = {
  date?: DateSpan,
  duration?: DateDuration,
  show?: {
    id?: Data['experience'][number]['id'][],
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
  skills?: SkillsConfig,
}

export type ConfigJSON = typeof config;

export const useConfig = defineStore('config', () => config as Config);
