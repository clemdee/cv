import { defineStore } from 'pinia';
import dataJSON from './data';
import { useI18n } from 'vue-i18n';
import { reactiveComputed } from '@vueuse/core'
import { watchEffect } from 'vue';

export type Percentage = Partial<number>;

export type DateSpan = {
  from?: string,
  to?: string,
}

export type JSONLocation = {
  id: string,
  map?: [latitude: number, longitude: number],
};

export type Location = {
  id: string,
  name: string,
  location: string,
  map?: [latitude: number, longitude: number],
};

export type JSONSkill = {
  id: string,
  level: Percentage,
  tags?: string[],
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

export type JSONEducation = {
  id: string,
  date: DateSpan,
  location?: JSONLocation['id'],
  certifications?: string[],
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

export type JSONExperience = {
  id: string,
  date: DateSpan,
  location?: JSONLocation['id'],
  skills?: JSONSkill['id'][],
  certifications?: string[],
};

export type Experience = {
  type: 'experience',
  id: string,
  title: string,
  description: string,
  date: DateSpan,
  location?: Location,
  certifications: Certification[],
  skills: Skill[],
};

export type JSONSkills = {
  languages: JSONSkill[],
  os: JSONSkill[],
  softwares: JSONSkill[],
  programmingLanguages: JSONSkill[],
}

export type Skills = {
  languages: Skill[],
  os: Skill[],
  softwares: Skill[],
  programmingLanguages: Skill[],
}

export type JSONData = {
  profile: any,
  locations: JSONLocation[],
  education: JSONEducation[],
  experience: JSONExperience[],
  skills: JSONSkills,
}

export type Data = {
  profile: any,
  locations: Location[],
  education: Education[],
  experience: Experience[],
  skills: Skills,
}

export type DataConst = typeof dataJSON;

export const useData = defineStore('data', () => {

  const { t } = useI18n();

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
    title: t(`languages.items.${skill.id}`),
    level: skill.level,
    tags: skill.tags,
  }));

  const skillsMap = new Map<string, Skill>();
  const getSkill = (id?: string) => {
    console.log('id', id);
    if (!id) return undefined;
    const insert = () => {
      const skill = find<Skill>([
        ...dataJSON.skills.languages,
        ...dataJSON.skills.os,
        ...dataJSON.skills.programmingLanguages,
        ...dataJSON.skills.softwares,
      ], id);
      if (!skill) {
        console.warn(`skill "${id}" not found and has to be created`)
        return createSkill(id);
      }
      return skill
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

  const educationMap = new Map<string, Education>();
  const getEducation = (id?: string) => {
    if (!id) return undefined;
    const insert = () => resolveEducation(find(dataJSON.education, id));
    return emplace(educationMap, id, insert)
  };

  const resolveExperience = (experience: JSONExperience): Experience => reactiveComputed<Experience>(() => ({
    type: 'experience',
    id: experience.id,
    date: experience.date,
    description: t(`experience.items.${experience.id}.description`),
    title: t(`experience.items.${experience.id}.title`),
    location: getLocation(experience.location),
    certifications: getCertifications(experience.certifications),
    skills: getSkills(experience.skills),
  }));

  const experienceMap = new Map<string, Experience>();
  const getExperience = (id?: string) => {
    if (!id) return undefined;
    const insert = () => resolveExperience(find(dataJSON.experience, id));
    return emplace(experienceMap, id, insert)
  };

  const data: Data = reactiveComputed<Data>(() => ({
    profile: dataJSON.profile,
    locations: dataJSON.locations.map(location => resolveLocation(location)),
    education: dataJSON.education.map(education => resolveEducation(education)),
    experience: dataJSON.experience.map(experience => resolveExperience(experience)),
    skills: {
      languages: dataJSON.skills.languages.map(skill => resolveSkill(skill)),
      os: dataJSON.skills.os.map(skill => resolveSkill(skill)),
      programmingLanguages: dataJSON.skills.programmingLanguages.map(skill => resolveSkill(skill)),
      softwares: dataJSON.skills.softwares.map(skill => resolveSkill(skill)),
    }
  }));

  watchEffect(() => console.log('ATTENTION', data));

  return data;
});
