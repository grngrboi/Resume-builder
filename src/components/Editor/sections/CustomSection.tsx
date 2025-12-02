import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useResume } from '../../../context/ResumeContext';
import { CustomSectionItem } from '../../../types/resume';

interface CustomSectionItemProps {
    item: CustomSectionItem;
    sectionId: string;
    onRemove: (id: string) => void;
    onUpdate: (id: string, data: Partial<CustomSectionItem>) => void;
}

const CustomSectionItemComponent: React.FC<CustomSectionItemProps> = ({ item, sectionId, onRemove, onUpdate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative mb-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 shadow-sm backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between pr-8">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-slate-400 hover:text-slate-200 active:cursor-grabbing"
                >
                    <GripVertical className="h-5 w-5" />
                </button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.id)}
                    className="absolute right-2 top-2 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <Input
                        label="Title"
                        value={item.title}
                        onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                        placeholder="e.g. Project Name / Role"
                    />
                </div>
                <Input
                    label="Subtitle"
                    value={item.subtitle || ''}
                    onChange={(e) => onUpdate(item.id, { subtitle: e.target.value })}
                    placeholder="e.g. Company / Organization"
                />
                <Input
                    label="Date"
                    value={item.date || ''}
                    onChange={(e) => onUpdate(item.id, { date: e.target.value })}
                    placeholder="e.g. 2023 - Present"
                />
                <div className="sm:col-span-2">
                    <Textarea
                        label="Description"
                        value={item.description || ''}
                        onChange={(e) => onUpdate(item.id, { description: e.target.value })}
                        placeholder="Description..."
                        className="min-h-[80px]"
                    />
                </div>
            </div>
        </div>
    );
};

interface CustomSectionProps {
    sectionId: string;
}

export const CustomSection: React.FC<CustomSectionProps> = ({ sectionId }) => {
    const { resumeData, addItem, removeItem, updateItem, reorderItems } = useResume();

    // Find the custom section in resumeData
    const section = resumeData.customSections.find(s => s.id === sectionId);

    if (!section) return null;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = section.items.findIndex((i) => i.id === active.id);
            const newIndex = section.items.findIndex((i) => i.id === over.id);
            reorderItems(sectionId, arrayMove(section.items, oldIndex, newIndex));
        }
    };

    const handleAdd = () => {
        addItem(sectionId, {
            title: '',
            subtitle: '',
            date: '',
            description: '',
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
                    items={section.items}
                    strategy={verticalListSortingStrategy}
                >
                    {section.items.map((item) => (
                        <CustomSectionItemComponent
                            key={item.id}
                            item={item}
                            sectionId={sectionId}
                            onRemove={(id) => removeItem(sectionId, id)}
                            onUpdate={(id, data) => updateItem(sectionId, id, data)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 text-slate-300 hover:bg-white/5 hover:text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
            </Button>
        </div>
    );
};
