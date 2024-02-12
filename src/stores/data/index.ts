import { defineStore } from 'pinia';
import data from './data';

export type Percentage = Partial<number>;

export type DateSpan = {
  from?: string,
  to?: string,
}

export type Location = {
  id: string,
  map?: [latitude: number, longitude: number],
};

export type Education = {
  id: string,
  date: DateSpan,
  location?: string,
  diploma?: boolean,
};

export type Experience = {
  id: string,
  date: DateSpan,
  location?: string,
  skills?: string[],
};

export type Skill = {
  id: string,
  level: Percentage,
  tags?: string[],
};

export type Skills = {
  languages: Skill[],
  os: Skill[],
  softwares: Skill[],
  programmingLanguages: Skill[],
}

export type Data = {
  profile: any,
  locations: Location[],
  education: Education[],
  experience: Experience[],
  skills: Skills,
}

export type JSONData = typeof data;

export const useData = defineStore('data', () => data as Data);
