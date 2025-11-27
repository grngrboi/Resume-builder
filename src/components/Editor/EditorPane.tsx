import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
    const { sectionOrder, setSectionOrder } = useResume();

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

    return (
        <div className="h-full overflow-y-auto p-4 bg-transparent">
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
        </div>
    );
};
