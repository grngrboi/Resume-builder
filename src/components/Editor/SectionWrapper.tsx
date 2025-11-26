import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Card } from '../ui/Card';

// Let's define a simple collapsible wrapper here instead of a separate Accordion component for now
// to keep things self-contained and simpler for the drag handle integration.

interface SectionWrapperProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div ref={setNodeRef} style={style} className="mb-4">
            <Card>
                <div className="flex items-center border-b border-border bg-slate-50 px-4 py-3">
                    <button
                        {...attributes}
                        {...listeners}
                        className="mr-3 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
                    >
                        <GripVertical className="h-5 w-5" />
                    </button>

                    <button
                        className="flex-1 text-left font-semibold text-text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {title}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <svg
                            className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="p-4 animate-in slide-in-from-top-2 duration-200">
                        {children}
                    </div>
                )}
            </Card>
        </div>
    );
};
