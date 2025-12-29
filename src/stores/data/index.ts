import type { LocalizedString } from '~/i18n';
import { reactiveComputed } from '@vueuse/core';
import { t, td } from '~/i18n';
import dataJSON from './data';

export type Percentage = Partial<number>;

export interface DateSpan {
  from?: string
  to?: string
}

/* JSON Typings */

export interface JSONLocation {
  id: string
  title: LocalizedString
  location: LocalizedString
  map?: [latitude: number, longitude: number]
}

export interface JSONSkill {
  id: string
  title: LocalizedString
  level: Percentage
  tags?: string[]
}

export interface JSONExperience {
  id: string
  title: LocalizedString
  description?: LocalizedString
  duties?: LocalizedString[]
  date: DateSpan
  location?: JSONLocation['id']
  skills?: JSONSkill['id'][]
  certifications?: string[]
}

export interface JSONEducation {
  id: string
  title: LocalizedString
  description?: LocalizedString
  date: DateSpan
  location?: JSONLocation['id']
  certifications?: string[]
}

export interface JSONHobby {
  id: string
  title: LocalizedString
  description?: LocalizedString
  duties?: LocalizedString[]
  date?: DateSpan
  url?: string
  skills?: JSONSkill['id'][]
}

export interface JSONData {
  profile: any
  locations: JSONLocation[]
  education: JSONEducation[]
  experience: JSONExperience[]
  hobbies: JSONHobby[]
  skills: JSONSkill[]
}

export type DataConst = typeof dataJSON;

/* Data Typings */

export interface Location {
  id: string
  title: string
  location: string
  map?: [latitude: number, longitude: number]
}

export interface Skill {
  type: 'skill'
  id: string
  title: string
  level: Percentage
  tags?: string[]
}

export interface Certification {
  id: string
  title: string
  image: string
}

export interface Experience {
  type: 'experience'
  id: string
  title: string
  description: string
  duties: string[]
  date: DateSpan
  location?: Location
  certifications: Certification[]
  skills: Skill[]
}

export interface Education {
  type: 'education'
  id: string
  title: string
  description: string
  date: DateSpan
  location?: Location
  certifications: Certification[]
}

export interface Hobby {
  type: 'hobbies'
  id: string
  title: string
  description: string
  url?: string
  duties: string[]
  date?: DateSpan
  skills: Skill[]
}

export interface Item {
  type?: string
  id?: string
  title?: string
  description?: string
  date?: DateSpan
  url?: string
  location?: Location
  skills?: Skill[]
  certifications?: Certification[]
  duties?: string[]
}

export interface Data {
  profile: DataConst['profile']
  locations: Location[]
  education: Education[]
  experience: Experience[]
  hobbies: Hobby[]
  skills: Skill[]
}

export const languageLevels = {
  motherTongue: 1,
  fluent: 0.8,
  intermediary: 0.5,
  beginner: 0,
};

const emplace = <T>(map: Map<string, T>, id: string, insert: () => T) => {
  if (!map.has(id)) {
    map.set(id, insert());
  }
  return map.get(id);
};

const find = <T>(list: { id: string }[], id: string) => {
  return list.find(item => item.id === id) as T;
};

const getList = <T>(ids: string[] | undefined, getter: (id: string) => T | undefined): T[] => {
  ids ??= [];
  return ids
    .map(id => getter(id))
    .filter(v => v !== undefined) as T[];
};

const resolveLocation = (location: JSONLocation): Location => reactiveComputed<Location>(() => ({
  id: location.id,
  location: td(location.location),
  title: td(location.title),
  map: location.map,
}));

const locationsMap = new Map<string, Location>();
const getLocation = (id?: string) => {
  if (!id) return undefined;
  const insert = () => resolveLocation(find(dataJSON.locations, id));
  return emplace(locationsMap, id, insert);
};

const resolveCertification = (certification: string): Certification => reactiveComputed<Certification>(() => ({
  id: certification,
  title: t(`certification.items.${certification}.title`),
  image: `~/asset/certifications/${certification}.png`,
}));

const certificationsMap = new Map<string, Certification>();
const getCertification = (id?: string) => {
  if (!id) return undefined;
  const insert = () => resolveCertification(id);
  return emplace(certificationsMap, id, insert);
};

const getCertifications = (ids?: string[]) => getList(ids, getCertification);

const createSkill = (id: string): Skill => reactiveComputed<Skill>(() => ({
  type: 'skill',
  id,
  title: id,
  level: 0,
  tags: [],
}));

const resolveSkill = (skill: JSONSkill): Skill => reactiveComputed<Skill>(() => ({
  type: 'skill',
  id: skill.id,
  title: td(skill.title) ?? skill.id,
  level: skill.level,
  tags: skill.tags,
}));

const skillsMap = new Map<string, Skill>();
const getSkill = (id?: string) => {
  if (!id) return undefined;
  const insert = () => {
    const skill = find<Skill>(dataJSON.skills, id);
    if (!skill) {
      console.warn(`skill "${id}" not found and has to be created`);
      return createSkill(id);
    }
    return resolveSkill(skill);
  };
  return emplace(skillsMap, id, insert);
};

const getSkills = (ids?: string[]) => getList(ids, getSkill);

const resolveEducation = (education: JSONEducation): Education => reactiveComputed<Education>(() => ({
  type: 'education',
  id: education.id,
  title: td(education.title),
  description: td(education.description),
  date: education.date,
  location: getLocation(education.location),
  certifications: getCertifications(education.certifications),
}));

const resolveExperience = (experience: JSONExperience): Experience => reactiveComputed<Experience>(() => ({
  type: 'experience',
  id: experience.id,
  title: td(experience.title),
  description: td(experience.description),
  duties: experience.duties?.map(duty => td(duty)) ?? [],
  date: experience.date,
  location: getLocation(experience.location),
  certifications: getCertifications(experience.certifications),
  skills: getSkills(experience.skills),
}));

const resolveHobby = (hobby: JSONHobby): Hobby => reactiveComputed<Hobby>(() => ({
  type: 'hobbies',
  id: hobby.id,
  title: td(hobby.title),
  description: td(hobby.description),
  duties: hobby.duties?.map(duty => td(duty)) ?? [],
  date: hobby.date,
  url: hobby.url,
  skills: getSkills(hobby.skills),
}));

const data: Data = reactiveComputed<Data>(() => ({
  profile: dataJSON.profile,
  locations: dataJSON.locations.map(location => resolveLocation(location)),
  education: dataJSON.education.map(education => resolveEducation(education)),
  experience: dataJSON.experience.map(experience => resolveExperience(experience)),
  hobbies: dataJSON.hobbies.map(hobby => resolveHobby(hobby)),
  skills: dataJSON.skills.map(skill => resolveSkill(skill)),
}));

export const useData = () => {
  return data;
};
