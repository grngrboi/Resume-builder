import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useResume } from '../../../context/ResumeContext';

export const Achievements: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem } = useResume();
    const { achievements } = resumeData;

    const handleAdd = () => {
        addItem('achievements', {
            title: '',
            description: '',
        });
    };

    return (
        <div className="space-y-4">
            {achievements.map((achievement) => (
                <div key={achievement.id} className="relative rounded-xl border border-white/10 bg-slate-900/40 p-4 shadow-sm backdrop-blur-md">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem('achievements', achievement.id)}
                        className="absolute right-2 top-2 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="space-y-3 pr-8">
                        <Input
                            label="Achievement Title"
                            value={achievement.title}
                            onChange={(e) => updateItem('achievements', achievement.id, { title: e.target.value })}
                            placeholder="e.g. Employee of the Month"
                        />
                        <Textarea
                            label="Description"
                            value={achievement.description}
                            onChange={(e) => updateItem('achievements', achievement.id, { description: e.target.value })}
                            placeholder="Details about the achievement..."
                            className="min-h-[80px]"
                        />
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed border-white/20 hover:bg-white/5 hover:text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Achievement
            </Button>
        </div>
    );
};
