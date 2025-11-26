import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useResume } from '../../../context/ResumeContext';

export const Certificates: React.FC = () => {
    const { resumeData, addItem, removeItem, updateItem } = useResume();
    const { certificates } = resumeData;

    const handleAdd = () => {
        addItem('certificates', {
            name: '',
            issuer: '',
            date: '',
            link: '',
        });
    };

    return (
        <div className="space-y-4">
            {certificates.map((cert) => (
                <div key={cert.id} className="relative rounded-md border border-border bg-white p-4 shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('certificates', cert.id)}
                        className="absolute right-2 top-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid gap-4 sm:grid-cols-2 pr-8">
                        <div className="sm:col-span-2">
                            <Input
                                label="Certificate Name"
                                value={cert.name}
                                onChange={(e) => updateItem('certificates', cert.id, { name: e.target.value })}
                                placeholder="e.g. AWS Certified Solutions Architect"
                            />
                        </div>
                        <Input
                            label="Issuer"
                            value={cert.issuer}
                            onChange={(e) => updateItem('certificates', cert.id, { issuer: e.target.value })}
                            placeholder="e.g. Amazon Web Services"
                        />
                        <Input
                            label="Date"
                            value={cert.date}
                            onChange={(e) => updateItem('certificates', cert.id, { date: e.target.value })}
                            placeholder="May 2023"
                        />
                        <div className="sm:col-span-2">
                            <Input
                                label="Link (Optional)"
                                value={cert.link || ''}
                                onChange={(e) => updateItem('certificates', cert.id, { link: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Certificate
            </Button>
        </div>
    );
};
