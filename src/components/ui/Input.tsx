import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-white mb-2 ml-1">
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        "flex h-11 w-full rounded-xl border border-white/10 bg-[#121212]/50 backdrop-blur-sm px-4 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-white/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-white/20 hover:bg-[#121212]/70",
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

Input.displayName = 'Input';
