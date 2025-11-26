import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useResume } from '../../../context/ResumeContext';

export const Leadership: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem } = useResume();
    const { leadership } = resumeData;

    const handleAdd = () => {
        addItem('leadership', {
            role: '',
            organization: '',
            description: '',
            startDate: '',
            endDate: '',
        });
    };

    return (
        <div className="space-y-4">
            {leadership.map((item) => (
                <div key={item.id} className="relative rounded-md border border-border bg-white p-4 shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('leadership', item.id)}
                        className="absolute right-2 top-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid gap-4 sm:grid-cols-2 pr-8">
                        <div className="sm:col-span-2">
                            <Input
                                label="Role"
                                value={item.role}
                                onChange={(e) => updateItem('leadership', item.id, { role: e.target.value })}
                                placeholder="e.g. Team Lead"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Input
                                label="Organization"
                                value={item.organization}
                                onChange={(e) => updateItem('leadership', item.id, { organization: e.target.value })}
                                placeholder="e.g. Non-profit Org"
                            />
                        </div>
                        <Input
                            label="Start Date"
                            value={item.startDate}
                            onChange={(e) => updateItem('leadership', item.id, { startDate: e.target.value })}
                            placeholder="Jan 2022"
                        />
                        <Input
                            label="End Date"
                            value={item.endDate}
                            onChange={(e) => updateItem('leadership', item.id, { endDate: e.target.value })}
                            placeholder="Present"
                        />
                        <div className="sm:col-span-2">
                            <Textarea
                                label="Description"
                                value={item.description}
                                onChange={(e) => updateItem('leadership', item.id, { description: e.target.value })}
                                placeholder="Describe your responsibilities..."
                                className="min-h-[80px]"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Leadership Role
            </Button>
        </div>
    );
};
