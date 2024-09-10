import { defineStore } from 'pinia';
import data from './data';
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

export type DataConst = typeof data;

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
      .filter(v => v !== undefined);
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
    const insert = () => resolveLocation(find(data.locations, id));
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

  const resolveSkill = (skill: JSONSkill): Skill => reactiveComputed<Skill>(() => ({
    id: skill.id,
    title: t(`skills.items.${skill.id}`),
    level: skill.level,
    tags: skill.tags,
  }));

  const skillsMap = new Map<string, Skill>();
  const getSkill = (id?: string) => {
    if (!id) return undefined;
    const insert = () => resolveSkill(find([
      ...data.skills.languages,
      ...data.skills.os,
      ...data.skills.programmingLanguages,
      ...data.skills.softwares,
    ], id));
    return emplace(skillsMap, id, insert)
  };

  const getSkills = (ids?: string[]) => getList(ids, getSkill);

  const resolveEducation = (education: JSONEducation): Education => reactiveComputed<Education>(() => ({
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
    const insert = () => resolveEducation(find(data.education, id));
    return emplace(educationMap, id, insert)
  };

  const resolveExperience = (experience: JSONExperience): Experience => reactiveComputed<Experience>(() => ({
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
    const insert = () => resolveExperience(find(data.experience, id));
    return emplace(experienceMap, id, insert)
  };

  const dataTest: Data = reactiveComputed<Data>(() => ({
    profile: data.profile,
    locations: data.locations.map(location => resolveLocation(location)),
    education: data.education.map(education => resolveEducation(education)),
    experience: data.experience.map(experience => resolveExperience(experience)),
    skills: {
      languages: data.skills.languages.map(skill => resolveSkill(skill)),
      os: data.skills.os.map(skill => resolveSkill(skill)),
      programmingLanguages: data.skills.programmingLanguages.map(skill => resolveSkill(skill)),
      softwares: data.skills.softwares.map(skill => resolveSkill(skill)),
    }
  }));

  watchEffect(() => console.log('ATTENTION', dataTest));

  return data as JSONData;
});
