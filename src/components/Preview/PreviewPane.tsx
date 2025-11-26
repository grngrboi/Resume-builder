import React from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ResumeDocument } from './ResumeDocument';
import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const PreviewPane: React.FC = () => {
    const { settings, updateSettings } = useResume();

    const handleDownload = () => {
        const element = document.getElementById('resume-preview');
        if (!element) return;

        const opt = {
            margin: 0,
            filename: 'resume.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="flex flex-col h-full bg-slate-200/50">
            {/* Styling Controls Toolbar */}
            <div className="p-4 border-b border-border bg-white flex flex-wrap gap-4 items-center justify-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-text-secondary">Font:</label>
                    <select
                        className="h-8 rounded-md border border-border bg-white px-2 text-sm"
                        value={settings.fontFamily}
                        onChange={(e) => updateSettings({ fontFamily: e.target.value as any })}
                    >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Lato">Lato</option>
                        <option value="Merriweather">Merriweather</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-text-secondary">Size:</label>
                    <select
                        className="h-8 rounded-md border border-border bg-white px-2 text-sm"
                        value={settings.fontSize}
                        onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-text-secondary">Spacing:</label>
                    <select
                        className="h-8 rounded-md border border-border bg-white px-2 text-sm"
                        value={settings.lineHeight}
                        onChange={(e) => updateSettings({ lineHeight: e.target.value as any })}
                    >
                        <option value="tight">Tight</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Relaxed</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-text-secondary">Color:</label>
                    <input
                        type="color"
                        className="h-8 w-8 rounded cursor-pointer border-0 p-0"
                        value={settings.themeColor}
                        onChange={(e) => updateSettings({ themeColor: e.target.value })}
                    />
                </div>

                <div className="h-6 w-px bg-border mx-2" />

                <Button size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                </Button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
                <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-200">
                    <ResumeDocument />
                </div>
            </div>
        </div>
    );
};
