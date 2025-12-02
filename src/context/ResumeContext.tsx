import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeState, ResumeData, SectionId, Project, Education, Skill, Achievement, Leadership, Certificate, Reference, StyleSettings } from '../types/resume';
import { dummyData } from '../data/dummy';

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
    customSections: [],
};

const defaultSettings: StyleSettings = {
    fontFamily: 'Inter',
    fontSize: 'medium',
    lineHeight: 'normal',
    alignment: 'left',
    themeColor: '#2563eb',
    fontColor: '#334155',
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
    addItem: (section: keyof ResumeData | string, item: any) => void;
    removeItem: (section: keyof ResumeData | string, id: string) => void;
    updateItem: (section: keyof ResumeData | string, id: string, item: any) => void;
    reorderItems: (section: keyof ResumeData | string, newItems: any[]) => void;
    // Section ordering
    setSectionOrder: (order: SectionId[]) => void;
    // Settings
    updateSettings: (settings: Partial<StyleSettings>) => void;
    // Actions
    resetResume: () => void;
    loadDemoData: () => void;
    // Custom Sections
    addCustomSection: (title: string) => void;
    removeCustomSection: (id: string) => void;
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

        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Ensure customSections exists for backward compatibility
            if (!parsedData.customSections) parsedData.customSections = [];
            setResumeData(parsedData);
        }
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

    const addCustomSection = (title: string) => {
        const id = `custom-${generateId()}`;
        const newSection = { id, name: title, items: [] };
        setResumeData(prev => ({
            ...prev,
            customSections: [...prev.customSections, newSection]
        }));
        setSectionOrder(prev => [...prev, id]);
    };

    const removeCustomSection = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.filter(s => s.id !== id)
        }));
        setSectionOrder(prev => prev.filter(sid => sid !== id));
    };

    const addItem = (section: keyof ResumeData | string, item: any) => {
        const newItem = { ...item, id: item.id || generateId() };
        setResumeData(prev => {
            // Check if it's a standard array section
            if (section in prev && Array.isArray(prev[section as keyof ResumeData])) {
                return { ...prev, [section]: [...(prev[section as keyof ResumeData] as any[]), newItem] };
            }
            // Check if it's a custom section
            const customSectionIndex = prev.customSections.findIndex(s => s.id === section);
            if (customSectionIndex !== -1) {
                const newCustomSections = [...prev.customSections];
                newCustomSections[customSectionIndex] = {
                    ...newCustomSections[customSectionIndex],
                    items: [...newCustomSections[customSectionIndex].items, newItem]
                };
                return { ...prev, customSections: newCustomSections };
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

    const removeItem = (section: keyof ResumeData | string, id: string) => {
        setResumeData(prev => {
            // Check if it's a standard array section
            if (section in prev && Array.isArray(prev[section as keyof ResumeData])) {
                return { ...prev, [section]: (prev[section as keyof ResumeData] as any[]).filter((i: any) => i.id !== id) };
            }
            // Check if it's a custom section
            const customSectionIndex = prev.customSections.findIndex(s => s.id === section);
            if (customSectionIndex !== -1) {
                const newCustomSections = [...prev.customSections];
                newCustomSections[customSectionIndex] = {
                    ...newCustomSections[customSectionIndex],
                    items: newCustomSections[customSectionIndex].items.filter(i => i.id !== id)
                };
                return { ...prev, customSections: newCustomSections };
            }
            if (section === 'skills') {
                const newSkills = { ...prev.skills };
                (Object.keys(newSkills) as Array<keyof typeof newSkills>).forEach(key => {
                    newSkills[key] = newSkills[key].filter(s => s.id !== id);
                });
                return { ...prev, skills: newSkills };
            }
            return prev;
        });
    };

    const updateItem = (section: keyof ResumeData | string, id: string, updatedItem: any) => {
        setResumeData(prev => {
            // Check if it's a standard array section
            if (section in prev && Array.isArray(prev[section as keyof ResumeData])) {
                return {
                    ...prev,
                    [section]: (prev[section as keyof ResumeData] as any[]).map((i: any) => i.id === id ? { ...i, ...updatedItem } : i)
                };
            }
            // Check if it's a custom section
            const customSectionIndex = prev.customSections.findIndex(s => s.id === section);
            if (customSectionIndex !== -1) {
                const newCustomSections = [...prev.customSections];
                newCustomSections[customSectionIndex] = {
                    ...newCustomSections[customSectionIndex],
                    items: newCustomSections[customSectionIndex].items.map(i => i.id === id ? { ...i, ...updatedItem } : i)
                };
                return { ...prev, customSections: newCustomSections };
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

    const reorderItems = (section: keyof ResumeData | string, newItems: any[]) => {
        setResumeData(prev => {
            if (section in prev) {
                return { ...prev, [section]: newItems };
            }
            const customSectionIndex = prev.customSections.findIndex(s => s.id === section);
            if (customSectionIndex !== -1) {
                const newCustomSections = [...prev.customSections];
                newCustomSections[customSectionIndex] = {
                    ...newCustomSections[customSectionIndex],
                    items: newItems
                };
                return { ...prev, customSections: newCustomSections };
            }
            return prev;
        });
    };

    const updateSettings = (newSettings: Partial<StyleSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetResume = () => {
        setResumeData(defaultData);
        setSectionOrder(defaultOrder);
        setSettings(defaultSettings);
        localStorage.removeItem('resumeForge_settings');
    };

    const loadDemoData = () => {
        setResumeData(dummyData);
        setSectionOrder(defaultOrder);
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
            resetResume,
            loadDemoData,
            addCustomSection,
            removeCustomSection
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
