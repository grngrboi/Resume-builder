import React, { useState } from 'react';
import { Download, RotateCcw, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useResume } from '../context/ResumeContext';

export const Header: React.FC = () => {
    const { resetResume, loadDemoData } = useResume();
    const [showToast, setShowToast] = useState(false);

    const handleDownload = () => {
        window.print();
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            resetResume();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/60 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/40 print:hidden">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <h1 className="text-xl font-bold text-text-primary">ResumeForge</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Export to PDF
                    </Button>
                    <Button variant="ghost" size="sm" onClick={loadDemoData} className="text-xs text-slate-400 hover:text-white">
                        Load Demo
                    </Button>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 z-50 rounded-md bg-slate-900 px-4 py-2 text-white shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Resume reset successfully</span>
                </div>
            )}
        </header>
    );
};
