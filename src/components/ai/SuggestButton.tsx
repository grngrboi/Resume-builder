import React, { useState } from 'react';
import { Wand2, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { generateContent } from '../../api/genkit';

interface SuggestButtonProps {
    context: string;
    currentText: string;
    onApply: (text: string) => void;
}

export const SuggestButton: React.FC<SuggestButtonProps> = ({ context, currentText, onApply }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSuggest = async () => {
        setIsLoading(true);
        setIsOpen(true);
        try {
            const result = await generateContent(context, currentText);
            setSuggestion(result);
        } catch (error) {
            console.error('Failed to generate suggestion:', error);
            setSuggestion('Failed to generate suggestion. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(suggestion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleApply = () => {
        onApply(suggestion);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSuggest}
                className="text-primary hover:text-primary-hover hover:bg-primary/10"
                title="Get AI Suggestion"
            >
                <Wand2 className="h-4 w-4 mr-1" />
                Suggest
            </Button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-white">AI Suggestion</h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-8 text-slate-400">
                                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                                Generating...
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 max-h-60 overflow-y-auto rounded-md bg-slate-800/50 p-3 text-sm text-slate-300">
                                    {suggestion}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={handleCopy}
                                    >
                                        {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="flex-1"
                                        onClick={handleApply}
                                    >
                                        Replace
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
