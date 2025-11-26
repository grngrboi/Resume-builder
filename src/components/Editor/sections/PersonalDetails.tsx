import React from 'react';
import { Input } from '../../ui/Input';
import { useResume } from '../../../context/ResumeContext';

export const PersonalDetails: React.FC = () => {
    const { resumeData, updatePersonalDetails } = useResume();
    const { personal } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updatePersonalDetails({ [name]: value });
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Input
                label="Full Name"
                name="fullName"
                value={personal.fullName}
                onChange={handleChange}
                placeholder="John Doe"
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={personal.email}
                onChange={handleChange}
                placeholder="john@example.com"
            />
            <Input
                label="Phone"
                name="phone"
                type="tel"
                value={personal.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
            />
            <Input
                label="Location"
                name="location"
                value={personal.location}
                onChange={handleChange}
                placeholder="New York, NY"
            />
            <div className="sm:col-span-2">
                <Input
                    label="LinkedIn / Website"
                    name="linkedin"
                    value={personal.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/johndoe"
                />
            </div>
        </div>
    );
};
