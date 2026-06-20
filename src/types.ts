export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
  photoUrl: string; // base64 or objectUrl
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0 to 100
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., "A1", "C2", "Courant", "Maternel"
}

export interface CvData {
  templateId: 'modern' | 'professional';
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  interests: string[];
  themeColor: string; // Hex color for customization
}

export type AppStep = 'splash' | 'landing' | 'select-template' | 'builder' | 'download';
