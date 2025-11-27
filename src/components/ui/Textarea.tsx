import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-white mb-2 ml-1">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        "flex min-h-[100px] w-full rounded-xl border border-white/10 bg-[#121212]/50 backdrop-blur-sm px-4 py-3 text-sm text-white ring-offset-background placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-white/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-white/20 hover:bg-[#121212]/70",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-destructive animate-in slide-in-from-top-1">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
