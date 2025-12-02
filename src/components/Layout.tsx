import React from 'react';
import { Background } from './ui/Background';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans text-text-primary relative">
            <Background />
            {children}
        </div>
    );
};
