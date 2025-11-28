export type SectionId =
    | 'personal'
    | 'summary'
    | 'projects'
    | 'education'
    | 'skills'
    | 'achievements'
    | 'leadership'
    | 'certificates'
    | 'references';

export interface PersonalDetails {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    website?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string;
    link?: string;
    startDate?: string;
    endDate?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
}

export interface Skill {
    id: string;
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Skills {
    technical: Skill[];
    soft: Skill[];
    languages: Skill[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date?: string;
}

export interface Leadership {
    id: string;
    role: string;
    organization: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
}

export interface Reference {
    id: string;
    name: string;
    role: string;
    company: string;
    email?: string;
    phone?: string;
}

export interface ResumeData {
    personal: PersonalDetails;
    summary: string;
    projects: Project[];
    education: Education[];
    skills: Skills;
    achievements: Achievement[];
    leadership: Leadership[];
    certificates: Certificate[];
    references: Reference[];
}

export interface StyleSettings {
    fontFamily: 'Inter' | 'Roboto' | 'Lato' | 'Merriweather' | 'SF Pro';
    fontSize: 'small' | 'medium' | 'large';
    lineHeight: 'tight' | 'normal' | 'relaxed';
    alignment: 'left' | 'justify';
    themeColor: string;
    fontColor: string;
}

export interface ResumeState {
    data: ResumeData;
    sectionOrder: SectionId[];
    settings: StyleSettings;
}
