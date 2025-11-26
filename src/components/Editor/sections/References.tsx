import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useResume } from '../../../context/ResumeContext';

export const References: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem } = useResume();
    const { references } = resumeData;

    const handleAdd = () => {
        addItem('references', {
            name: '',
            role: '',
            company: '',
            email: '',
            phone: '',
        });
    };

    return (
        <div className="space-y-4">
            {references.map((ref) => (
                <div key={ref.id} className="relative rounded-md border border-border bg-white p-4 shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('references', ref.id)}
                        className="absolute right-2 top-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid gap-4 sm:grid-cols-2 pr-8">
                        <Input
                            label="Name"
                            value={ref.name}
                            onChange={(e) => updateItem('references', ref.id, { name: e.target.value })}
                            placeholder="e.g. Jane Smith"
                        />
                        <Input
                            label="Role"
                            value={ref.role}
                            onChange={(e) => updateItem('references', ref.id, { role: e.target.value })}
                            placeholder="e.g. Engineering Manager"
                        />
                        <div className="sm:col-span-2">
                            <Input
                                label="Company"
                                value={ref.company}
                                onChange={(e) => updateItem('references', ref.id, { company: e.target.value })}
                                placeholder="e.g. Tech Corp"
                            />
                        </div>
                        <Input
                            label="Email"
                            value={ref.email || ''}
                            onChange={(e) => updateItem('references', ref.id, { email: e.target.value })}
                            placeholder="jane@example.com"
                        />
                        <Input
                            label="Phone"
                            value={ref.phone || ''}
                            onChange={(e) => updateItem('references', ref.id, { phone: e.target.value })}
                            placeholder="+1 (555) ..."
                        />
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Reference
            </Button>
        </div>
    );
};
