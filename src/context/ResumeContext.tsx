import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeState, ResumeData, SectionId, Project, Education, Skill, Achievement, Leadership, Certificate, Reference, StyleSettings } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

// Helper to generate IDs if uuid import fails or for simplicity
const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultData: ResumeData = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        location: '',
    },
    summary: '',
    projects: [],
    education: [],
    skills: {
        technical: [],
        soft: [],
        languages: [],
    },
    achievements: [],
    leadership: [],
    certificates: [],
    references: [],
};

const defaultSettings: StyleSettings = {
    fontFamily: 'Inter',
    fontSize: 'medium',
    lineHeight: 'normal',
    alignment: 'left',
    themeColor: '#2563eb',
};

const defaultOrder: SectionId[] = [
    'personal',
    'summary',
    'projects',
    'education',
    'skills',
    'achievements',
    'leadership',
    'certificates',
    'references',
];

interface ResumeContextType {
    resumeData: ResumeData;
    sectionOrder: SectionId[];
    settings: StyleSettings;
    updatePersonalDetails: (details: Partial<ResumeData['personal']>) => void;
    updateSummary: (summary: string) => void;
    // Generic update for array sections
    addItem: (section: keyof ResumeData, item: any) => void;
    removeItem: (section: keyof ResumeData, id: string) => void;
    updateItem: (section: keyof ResumeData, id: string, item: any) => void;
    reorderItems: (section: keyof ResumeData, newItems: any[]) => void;
    // Section ordering
    setSectionOrder: (order: SectionId[]) => void;
    // Settings
    updateSettings: (settings: Partial<StyleSettings>) => void;
    // Actions
    resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultData);
    const [sectionOrder, setSectionOrder] = useState<SectionId[]>(defaultOrder);
    const [settings, setSettings] = useState<StyleSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('resumeForge_data');
        const savedOrder = localStorage.getItem('resumeForge_order');
        const savedSettings = localStorage.getItem('resumeForge_settings');

        if (savedData) setResumeData(JSON.parse(savedData));
        if (savedOrder) setSectionOrder(JSON.parse(savedOrder));
        if (savedSettings) setSettings(JSON.parse(savedSettings));

        setIsLoaded(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('resumeForge_data', JSON.stringify(resumeData));
            localStorage.setItem('resumeForge_order', JSON.stringify(sectionOrder));
            localStorage.setItem('resumeForge_settings', JSON.stringify(settings));
        }
    }, [resumeData, sectionOrder, settings, isLoaded]);

    const updatePersonalDetails = (details: Partial<ResumeData['personal']>) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, ...details }
        }));
    };

    const updateSummary = (summary: string) => {
        setResumeData(prev => ({ ...prev, summary }));
    };

    const addItem = (section: keyof ResumeData, item: any) => {
        const newItem = { ...item, id: item.id || generateId() };
        setResumeData(prev => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return { ...prev, [section]: [...currentSection, newItem] };
            }
            // Handle nested skills object
            if (section === 'skills' && item.type) {
                const skillType = item.type as keyof typeof prev.skills;
                return {
                    ...prev,
                    skills: {
                        ...prev.skills,
                        [skillType]: [...prev.skills[skillType], newItem]
                    }
                };
            }
            return prev;
        });
    };

    const removeItem = (section: keyof ResumeData, id: string) => {
        setResumeData(prev => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return { ...prev, [section]: currentSection.filter((i: any) => i.id !== id) };
            }
            if (section === 'skills') {
                // This is a bit tricky for skills, we might need a more specific remover or pass type
                // For now, let's assume we search all skill types
                const newSkills = { ...prev.skills };
                (Object.keys(newSkills) as Array<keyof typeof newSkills>).forEach(key => {
                    newSkills[key] = newSkills[key].filter(s => s.id !== id);
                });
                return { ...prev, skills: newSkills };
            }
            return prev;
        });
    };

    const updateItem = (section: keyof ResumeData, id: string, updatedItem: any) => {
        setResumeData(prev => {
            const currentSection = prev[section];
            if (Array.isArray(currentSection)) {
                return {
                    ...prev,
                    [section]: currentSection.map((i: any) => i.id === id ? { ...i, ...updatedItem } : i)
                };
            }
            if (section === 'skills' && updatedItem.type) {
                const skillType = updatedItem.type as keyof typeof prev.skills;
                return {
                    ...prev,
                    skills: {
                        ...prev.skills,
                        [skillType]: prev.skills[skillType].map(s => s.id === id ? { ...s, ...updatedItem } : s)
                    }
                };
            }
            return prev;
        });
    };

    const reorderItems = (section: keyof ResumeData, newItems: any[]) => {
        setResumeData(prev => ({ ...prev, [section]: newItems }));
    };

    const updateSettings = (newSettings: Partial<StyleSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetResume = () => {
        // Optional: Implement undo logic here before resetting
        setResumeData(defaultData);
        setSectionOrder(defaultOrder);
        setSettings(defaultSettings);
        localStorage.removeItem('resumeForge_data');
        localStorage.removeItem('resumeForge_order');
        localStorage.removeItem('resumeForge_settings');
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            sectionOrder,
            settings,
            updatePersonalDetails,
            updateSummary,
            addItem,
            removeItem,
            updateItem,
            reorderItems,
            setSectionOrder,
            updateSettings,
            resetResume
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
