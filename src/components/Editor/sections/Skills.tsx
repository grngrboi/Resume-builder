import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useResume } from '../../../context/ResumeContext';
import { Skill } from '../../../types/resume';

interface SkillListProps {
    title: string;
    skills: Skill[];
    type: 'technical' | 'soft' | 'languages';
}

const SkillList: React.FC<SkillListProps> = ({ title, skills, type }) => {
    const { addItem, removeItem, updateItem } = useResume();

    const handleAdd = () => {
        addItem('skills', {
            name: '',
            type, // Pass type to helper to know which array to update
        });
    };

    return (
        <div className="mb-6 last:mb-0">
            <h4 className="mb-3 text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</h4>
            <div className="space-y-3">
                {skills.map((skill) => (
                    <div key={skill.id} className="flex gap-2">
                        <Input
                            value={skill.name}
                            onChange={(e) => updateItem('skills', skill.id, { name: e.target.value, type })}
                            placeholder="e.g. JavaScript"
                            className="flex-1"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem('skills', skill.id)}
                            className="text-red-400 hover:bg-red-900/20 hover:text-red-300 shrink-0"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button onClick={handleAdd} variant="outline" size="sm" className="w-full border-dashed border-white/20 text-slate-300 hover:bg-white/5 hover:text-white">
                    <Plus className="mr-2 h-3 w-3" />
                    Add {title}
                </Button>
            </div>
        </div>
    );
};

export const Skills: React.FC = () => {
    const { resumeData } = useResume();
    const { skills } = resumeData;

    return (
        <div>
            <SkillList title="Technical Skills" skills={skills.technical} type="technical" />
            <SkillList title="Soft Skills" skills={skills.soft} type="soft" />
            <SkillList title="Languages" skills={skills.languages} type="languages" />
        </div>
    );
};
