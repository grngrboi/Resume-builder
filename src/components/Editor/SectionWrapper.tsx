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
    onDelete?: () => void;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, onDelete }) => {
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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-4">
            <div
                onMouseMove={handleMouseMove}
                className="group relative border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-[#0A0A0A]/80"
                style={{
                    backgroundImage: `radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.06), transparent 40%)`
                } as React.CSSProperties}
            >
                <div className="flex items-center border-b border-white/5 px-5 py-4">
                    <button
                        {...attributes}
                        {...listeners}
                        className="mr-3 cursor-grab text-slate-400 hover:text-slate-200 active:cursor-grabbing"
                    >
                        <GripVertical className="h-5 w-5" />
                    </button>

                    <button
                        className="flex-1 text-left text-lg font-bold text-white tracking-tight"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {title}
                    </button>

                    <div className="flex items-center gap-2">
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Are you sure you want to delete this section?')) {
                                        onDelete();
                                    }
                                }}
                                className="text-red-400 hover:text-red-300 p-1 hover:bg-red-900/20 rounded"
                                title="Delete Section"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-400 hover:text-slate-200"
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
                </div>

                {isOpen && (
                    <div className="p-4 animate-in slide-in-from-top-2 duration-200">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
