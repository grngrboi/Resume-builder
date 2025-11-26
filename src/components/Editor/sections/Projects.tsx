import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { SuggestButton } from '../../ai/SuggestButton';
import { useResume } from '../../../context/ResumeContext';
import { Project } from '../../../types/resume';

interface ProjectItemProps {
    project: Project;
    onRemove: (id: string) => void;
    onUpdate: (id: string, data: Partial<Project>) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onRemove, onUpdate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: project.id });

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
                    onClick={() => onRemove(project.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <Input
                        label="Project Title"
                        value={project.title}
                        onChange={(e) => onUpdate(project.id, { title: e.target.value })}
                        placeholder="e.g. E-commerce Platform"
                    />
                </div>
                <Input
                    label="Start Date"
                    value={project.startDate || ''}
                    onChange={(e) => onUpdate(project.id, { startDate: e.target.value })}
                    placeholder="Jan 2023"
                />
                <Input
                    label="End Date"
                    value={project.endDate || ''}
                    onChange={(e) => onUpdate(project.id, { endDate: e.target.value })}
                    placeholder="Present"
                />
                <div className="sm:col-span-2">
                    <Input
                        label="Technologies"
                        value={project.technologies}
                        onChange={(e) => onUpdate(project.id, { technologies: e.target.value })}
                        placeholder="React, Node.js, TypeScript"
                    />
                </div>
                <div className="sm:col-span-2">
                    <Input
                        label="Link"
                        value={project.link || ''}
                        onChange={(e) => onUpdate(project.id, { link: e.target.value })}
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className="sm:col-span-2">
                    <div className="flex justify-end mb-1">
                        <SuggestButton
                            context="project"
                            currentText={project.description}
                            onApply={(text) => onUpdate(project.id, { description: text })}
                        />
                    </div>
                    <Textarea
                        label="Description"
                        value={project.description}
                        onChange={(e) => onUpdate(project.id, { description: e.target.value })}
                        placeholder="Describe the project, your role, and the outcome..."
                        className="min-h-[100px]"
                    />
                </div>
            </div>
        </div>
    );
};

export const Projects: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem, reorderItems } = useResume();
    const { projects } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);
            reorderItems('projects', arrayMove(projects, oldIndex, newIndex));
        }
    };

    const handleAdd = () => {
        addItem('projects', {
            title: '',
            description: '',
            technologies: '',
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
                    items={projects}
                    strategy={verticalListSortingStrategy}
                >
                    {projects.map((project) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            onRemove={(id) => removeItem('projects', id)}
                            onUpdate={(id, data) => updateItem('projects', id, data)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
            </Button>
        </div>
    );
};
