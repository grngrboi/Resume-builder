import React from 'react';
import { Download, ChevronDown } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ResumeDocument } from './ResumeDocument';
import { useResume } from '../../context/ResumeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        <div className="flex flex-col h-full bg-slate-950/30 relative overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

            {/* Styling Controls Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl p-2 px-4 border border-white/10 bg-slate-900/80 backdrop-blur-xl flex flex-wrap gap-4 items-center justify-between shadow-2xl rounded-2xl transition-all duration-300 hover:bg-slate-900/90 hover:shadow-blue-500/10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:block">Font</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-slate-200 hover:bg-white/10 hover:text-white rounded-lg px-3">
                                    {settings.fontFamily} <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-slate-200 rounded-xl shadow-xl">
                                <DropdownMenuRadioGroup value={settings.fontFamily} onValueChange={(value) => updateSettings({ fontFamily: value as any })}>
                                    <DropdownMenuRadioItem value="Inter" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1">Inter</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Roboto" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1">Roboto</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Lato" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1">Lato</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Merriweather" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1">Merriweather</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-px h-4 bg-white/10 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:block">Size</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-slate-200 hover:bg-white/10 hover:text-white rounded-lg px-3 capitalize">
                                    {settings.fontSize} <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-slate-200 rounded-xl shadow-xl">
                                <DropdownMenuRadioGroup value={settings.fontSize} onValueChange={(value) => updateSettings({ fontSize: value as any })}>
                                    <DropdownMenuRadioItem value="small" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Small</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="medium" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Medium</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="large" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Large</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-px h-4 bg-white/10 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:block">Space</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 text-slate-200 hover:bg-white/10 hover:text-white rounded-lg px-3 capitalize">
                                    {settings.lineHeight} <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-slate-200 rounded-xl shadow-xl">
                                <DropdownMenuRadioGroup value={settings.lineHeight} onValueChange={(value) => updateSettings({ lineHeight: value as any })}>
                                    <DropdownMenuRadioItem value="tight" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Tight</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="normal" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Normal</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="relaxed" className="cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg my-1 capitalize">Relaxed</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="w-px h-4 bg-white/10 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/50 transition-colors cursor-pointer ring-2 ring-transparent group-hover:ring-primary/50">
                                <input
                                    type="color"
                                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0 opacity-0"
                                    value={settings.themeColor}
                                    onChange={(e) => updateSettings({ themeColor: e.target.value })}
                                />
                                <div className="w-full h-full" style={{ backgroundColor: settings.themeColor }} />
                            </div>
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/80 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Theme</span>
                        </div>
                    </div>
                </div>

                <Button size="sm" onClick={handleDownload} className="rounded-lg bg-primary/80 hover:bg-primary text-white shadow-lg shadow-primary/20">
                    <Download className="mr-2 h-3 w-3" />
                    <span className="text-xs font-bold uppercase tracking-wide">Export</span>
                </Button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 pt-32 flex justify-center">
                <div className="origin-top scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-200">
                    <ResumeDocument />
                </div>
            </div>
        </div>
    );
};
