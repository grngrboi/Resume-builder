import React from 'react';
import { Textarea } from '../../ui/Textarea';
import { SuggestButton } from '../../ai/SuggestButton';
import { useResume } from '../../../context/ResumeContext';

export const Summary: React.FC = () => {
    const { resumeData, updateSummary } = useResume();

    return (
        <div className="space-y-2">
            <div className="flex justify-end">
                <SuggestButton
                    context="summary"
                    currentText={resumeData.summary}
                    onApply={updateSummary}
                />
            </div>
            <Textarea
                label="Professional Summary"
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Briefly describe your professional background and key achievements..."
                className="min-h-[150px]"
            />
        </div>
    );
};
