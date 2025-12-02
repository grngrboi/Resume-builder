import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { SectionWrapper } from './SectionWrapper';
import { PersonalDetails } from './sections/PersonalDetails';
import { Summary } from './sections/Summary';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Achievements } from './sections/Achievements';
import { Leadership } from './sections/Leadership';
import { Certificates } from './sections/Certificates';
import { References } from './sections/References';
import { CustomSection } from './sections/CustomSection';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const sectionComponents: Record<string, React.FC> = {
    personal: PersonalDetails,
    summary: Summary,
    projects: Projects,
    education: Education,
    skills: Skills,
    achievements: Achievements,
    leadership: Leadership,
    certificates: Certificates,
    references: References,
};

const sectionTitles: Record<string, string> = {
    personal: 'Personal Details',
    summary: 'Professional Summary',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
    achievements: 'Achievements',
    leadership: 'Leadership & Volunteering',
    certificates: 'Certificates',
    references: 'References',
};

export const EditorPane: React.FC = () => {
    const { sectionOrder, setSectionOrder, addCustomSection, removeCustomSection, resumeData } = useResume();
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [isAddingSection, setIsAddingSection] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = sectionOrder.indexOf(active.id as any);
            const newIndex = sectionOrder.indexOf(over.id as any);
            setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
        }
    };

    const handleAddSection = () => {
        if (newSectionTitle.trim()) {
            addCustomSection(newSectionTitle.trim());
            setNewSectionTitle('');
            setIsAddingSection(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-4 bg-transparent no-scrollbar">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sectionOrder}
                    strategy={verticalListSortingStrategy}
                >
                    {sectionOrder.map((sectionId) => {
                        // Check if it's a custom section
                        if (sectionId.startsWith('custom-')) {
                            const customSection = resumeData.customSections.find(s => s.id === sectionId);
                            if (!customSection) return null;

                            return (
                                <SectionWrapper
                                    key={sectionId}
                                    id={sectionId}
                                    title={customSection.name}
                                    onDelete={() => removeCustomSection(sectionId)}
                                >
                                    <CustomSection sectionId={sectionId} />
                                </SectionWrapper>
                            );
                        }

                        const Component = sectionComponents[sectionId];
                        if (!Component) return null;

                        return (
                            <SectionWrapper key={sectionId} id={sectionId} title={sectionTitles[sectionId]}>
                                <Component />
                            </SectionWrapper>
                        );
                    })}
                </SortableContext>
            </DndContext>

            <div className="mt-6 border-t border-white/10 pt-6">
                {!isAddingSection ? (
                    <Button
                        onClick={() => setIsAddingSection(true)}
                        variant="outline"
                        className="w-full border-dashed border-white/20 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Section
                    </Button>
                ) : (
                    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md">
                        <h4 className="mb-3 text-sm font-medium text-slate-200">New Section</h4>
                        <div className="flex gap-2">
                            <Input
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                placeholder="Section Title (e.g. Volunteering)"
                                className="flex-1"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
                            />
                            <Button onClick={handleAddSection} size="sm">
                                Add
                            </Button>
                            <Button onClick={() => setIsAddingSection(false)} variant="ghost" size="sm">
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
