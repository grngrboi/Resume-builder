import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useResume } from '../../../context/ResumeContext';
import { Education as EducationType } from '../../../types/resume';

interface EducationItemProps {
    education: EducationType;
    onRemove: (id: string) => void;
    onUpdate: (id: string, data: Partial<EducationType>) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({ education, onRemove, onUpdate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: education.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-4 rounded-md border border-border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
                >
                    <GripVertical className="h-5 w-5" />
                </button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(education.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <Input
                        label="Institution"
                        value={education.institution}
                        onChange={(e) => onUpdate(education.id, { institution: e.target.value })}
                        placeholder="University Name"
                    />
                </div>
                <div className="sm:col-span-2">
                    <Input
                        label="Degree"
                        value={education.degree}
                        onChange={(e) => onUpdate(education.id, { degree: e.target.value })}
                        placeholder="Bachelor of Science in Computer Science"
                    />
                </div>
                <Input
                    label="Start Date"
                    value={education.startDate}
                    onChange={(e) => onUpdate(education.id, { startDate: e.target.value })}
                    placeholder="Sep 2019"
                />
                <Input
                    label="End Date"
                    value={education.endDate}
                    onChange={(e) => onUpdate(education.id, { endDate: e.target.value })}
                    placeholder="May 2023"
                />
                <Input
                    label="GPA (Optional)"
                    value={education.gpa || ''}
                    onChange={(e) => onUpdate(education.id, { gpa: e.target.value })}
                    placeholder="3.8/4.0"
                />
            </div>
        </div>
    );
};

export const Education: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem, reorderItems } = useResume();
    const { education } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = education.findIndex((e) => e.id === active.id);
            const newIndex = education.findIndex((e) => e.id === over.id);
            reorderItems('education', arrayMove(education, oldIndex, newIndex));
        }
    };

    const handleAdd = () => {
        addItem('education', {
            institution: '',
            degree: '',
            startDate: '',
            endDate: '',
        });
    };

    return (
        <div className="space-y-4">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={education}
                    strategy={verticalListSortingStrategy}
                >
                    {education.map((edu) => (
                        <EducationItem
                            key={edu.id}
                            education={edu}
                            onRemove={(id) => removeItem('education', id)}
                            onUpdate={(id, data) => updateItem('education', id, data)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Education
            </Button>
        </div>
    );
};
