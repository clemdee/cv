import { defineStore } from 'pinia';
import dataJSON from './data';
import { useI18n } from 'vue-i18n';
import { reactiveComputed } from '@vueuse/core'

export type Percentage = Partial<number>;

export type DateSpan = {
  from?: string,
  to?: string,
}

/* JSON Typings */

export type JSONLocation = {
  id: string,
  map?: [latitude: number, longitude: number],
};

export type JSONSkill = {
  id: string,
  level: Percentage,
  tags?: string[],
};

export type JSONExperience = {
  id: string,
  date: DateSpan,
  location?: JSONLocation['id'],
  skills?: JSONSkill['id'][],
  certifications?: string[],
};

export type JSONEducation = {
  id: string,
  date: DateSpan,
  location?: JSONLocation['id'],
  certifications?: string[],
};

export type JSONHobby = {
  id: string,
  date?: DateSpan,
  url?: string,
  skills?: JSONSkill['id'][],
};

export type JSONData = {
  profile: any,
  locations: JSONLocation[],
  education: JSONEducation[],
  experience: JSONExperience[],
  hobbies: JSONHobby[],
  skills: JSONSkill[],
}

export type DataConst = typeof dataJSON;

/* Data Typings */

export type Location = {
  id: string,
  name: string,
  location: string,
  map?: [latitude: number, longitude: number],
};

export type Skill = {
  type: 'skill',
  id: string,
  title: string,
  level: Percentage,
  tags?: string[],
};

export type Certification = {
  id: string,
  title: string,
  image: string,
};

export type Experience = {
  type: 'experience',
  id: string,
  title: string,
  description: string,
  duties: string[],
  date: DateSpan,
  location?: Location,
  certifications: Certification[],
  skills: Skill[],
};

export type Education = {
  type: 'education',
  id: string,
  title: string,
  description: string,
  date: DateSpan,
  location?: Location,
  certifications: Certification[],
};

export type Hobby = {
  type: 'hobbies',
  id: string,
  title: string,
  description: string,
  url?: string,
  duties: string[],
  date?: DateSpan,
  skills: Skill[],
};

export type Item = {
  type?: string,
  id?: string,
  title?: string,
  description?: string,
  date?: DateSpan,
  url?: string,
  location?: Location,
  skills?: Skill[],
  certifications?: Certification[],
  duties?: string[],
};

export type Data = {
  profile: any,
  locations: Location[],
  education: Education[],
  experience: Experience[],
  hobbies: Hobby[],
  skills: Skill[],
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
}

const find = <T>(list: { id: string }[], id: string) => {
  return list.find(item => item.id === id) as T
};

const getList = <T>(ids: string[] | undefined, getter: (id: string) => T | undefined): T[] => {
  ids ??= [];
  return ids
    .map(id => getter(id))
    .filter(v => v !== undefined) as T[];
}

export const useData = defineStore('data', () => {
  const { t, tm } = useI18n();

  const resolveLocation = (location: JSONLocation): Location => reactiveComputed<Location>(() => ({
    id: location.id,
    location: t(`locations.items.${location.id}.location`),
    name: t(`locations.items.${location.id}.name`),
    map: location.map,
  }));

  const locationsMap = new Map<string, Location>();
  const getLocation = (id?: string) => {
    if (!id) return undefined;
    const insert = () => resolveLocation(find(dataJSON.locations, id));
    return emplace(locationsMap, id, insert)
  }

  const resolveCertification = (certification: string): Certification => reactiveComputed<Certification>(() => ({
    id: certification,
    title: t(`certification.items.${certification}.title`),
    image: `~/asset/certifications/${certification}.png`
  }));

  const certificationsMap = new Map<string, Certification>();
  const getCertification = (id?: string) => {
    if (!id) return undefined;
    const insert = () => resolveCertification(id);
    return emplace(certificationsMap, id, insert)
  }

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
    title: t(`skills.items.${skill.id}`) ?? skill.id,
    level: skill.level,
    tags: skill.tags,
  }));

  const skillsMap = new Map<string, Skill>();
  const getSkill = (id?: string) => {
    if (!id) return undefined;
    const insert = () => {
      const skill = find<Skill>(dataJSON.skills, id);
      if (!skill) {
        console.warn(`skill "${id}" not found and has to be created`)
        return createSkill(id);
      }
      return resolveSkill(skill);
    }
    return emplace(skillsMap, id, insert)
  };

  const getSkills = (ids?: string[]) => getList(ids, getSkill);

  const resolveEducation = (education: JSONEducation): Education => reactiveComputed<Education>(() => ({
    type: 'education',
    id: education.id,
    date: education.date,
    description: t(`education.items.${education.id}.description`),
    title: t(`education.items.${education.id}.title`),
    location: getLocation(education.location),
    certifications: getCertifications(education.certifications),
  }));

  const resolveExperience = (experience: JSONExperience): Experience => reactiveComputed<Experience>(() => ({
    type: 'experience',
    id: experience.id,
    date: experience.date,
    description: t(`experience.items.${experience.id}.description`),
    duties: tm(`experience.items.${experience.id}.duties`) ?? [],
    title: t(`experience.items.${experience.id}.title`),
    location: getLocation(experience.location),
    certifications: getCertifications(experience.certifications),
    skills: getSkills(experience.skills),
  }));

  const resolveHobby = (hobby: JSONHobby): Hobby => reactiveComputed<Hobby>(() => ({
    type: 'hobbies',
    id: hobby.id,
    date: hobby.date,
    description: t(`hobbies.items.${hobby.id}.description`),
    url: hobby.url,
    duties: tm(`hobbies.items.${hobby.id}.duties`) ?? [],
    title: t(`hobbies.items.${hobby.id}.title`),
    skills: getSkills(hobby.skills),
  }));

  const data: Data = reactiveComputed<Data>(() => ({
    profile: dataJSON.profile,
    locations: dataJSON.locations.map(location => resolveLocation(location)),
    education: dataJSON.education.map(education => resolveEducation(education)),
    experience: dataJSON.experience.map(experience => resolveExperience(experience)),
    hobbies: dataJSON.hobbies.map(hobby => resolveHobby(hobby)),
    skills: dataJSON.skills.map(skill => resolveSkill(skill))
  }));

  return data;
});
