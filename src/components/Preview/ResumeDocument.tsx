import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { clsx } from 'clsx';

export const ResumeDocument: React.FC = () => {
    const { resumeData, sectionOrder, settings } = useResume();
    const { personal, summary, projects, education, skills, achievements, leadership, certificates, references } = resumeData;

    const getFontFamily = () => {
        switch (settings.fontFamily) {
            case 'Roboto': return 'font-sans'; // Assuming we map these or load fonts
            case 'Lato': return 'font-sans';
            case 'Merriweather': return 'font-serif';
            default: return 'font-sans';
        }
    };

    const getFontSize = () => {
        switch (settings.fontSize) {
            case 'small': return 'text-sm';
            case 'large': return 'text-base';
            default: return 'text-[15px]'; // Custom medium
        }
    };

    const getLineHeight = () => {
        switch (settings.lineHeight) {
            case 'tight': return 'leading-tight';
            case 'relaxed': return 'leading-relaxed';
            default: return 'leading-normal';
        }
    };

    const containerClasses = clsx(
        'bg-white text-text-primary p-8 min-h-[297mm] w-[210mm] mx-auto shadow-lg print:shadow-none print:w-full print:h-full print:p-0 print:m-0',
        getFontFamily(),
        getFontSize(),
        getLineHeight(),
        settings.alignment === 'justify' ? 'text-justify' : 'text-left'
    );

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2
            className="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 pb-1 mt-6 first:mt-0"
            style={{ borderColor: settings.themeColor, color: settings.themeColor }}
        >
            {children}
        </h2>
    );

    const renderSection = (id: string) => {
        switch (id) {
            case 'personal':
                return (
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold mb-2" style={{ color: settings.themeColor }}>{personal.fullName}</h1>
                        <div className="flex flex-wrap justify-center gap-3 text-sm text-text-secondary">
                            {personal.email && <span>{personal.email}</span>}
                            {personal.phone && <span>• {personal.phone}</span>}
                            {personal.location && <span>• {personal.location}</span>}
                            {personal.linkedin && <span>• {personal.linkedin}</span>}
                            {personal.website && <span>• {personal.website}</span>}
                        </div>
                    </div>
                );

            case 'summary':
                if (!summary) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Professional Summary</SectionTitle>
                        <p>{summary}</p>
                    </div>
                );

            case 'projects':
                if (projects.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Projects</SectionTitle>
                        <div className="space-y-4">
                            {projects.map(project => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{project.title}</h3>
                                        <span className="text-sm text-text-secondary">
                                            {project.startDate} {project.startDate && project.endDate && '-'} {project.endDate}
                                        </span>
                                    </div>
                                    {project.link && <a href={project.link} className="text-sm text-blue-600 hover:underline block mb-1">{project.link}</a>}
                                    {project.technologies && <p className="text-sm italic mb-1 text-text-secondary">Stack: {project.technologies}</p>}
                                    <p className="whitespace-pre-wrap">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'education':
                if (education.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Education</SectionTitle>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{edu.institution}</h3>
                                        <span className="text-sm text-text-secondary">
                                            {edu.startDate} {edu.startDate && edu.endDate && '-'} {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                        {edu.gpa && <span className="text-sm">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'skills':
                const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;
                if (!hasSkills) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Skills</SectionTitle>
                        <div className="grid grid-cols-1 gap-2">
                            {skills.technical.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Technical:</span>
                                    <span>{skills.technical.map(s => s.name).join(', ')}</span>
                                </div>
                            )}
                            {skills.soft.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Soft Skills:</span>
                                    <span>{skills.soft.map(s => s.name).join(', ')}</span>
                                </div>
                            )}
                            {skills.languages.length > 0 && (
                                <div className="flex">
                                    <span className="font-bold w-32 shrink-0">Languages:</span>
                                    <span>{skills.languages.map(s => s.name).join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'achievements':
                if (achievements.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Achievements</SectionTitle>
                        <ul className="list-disc list-outside ml-4 space-y-2">
                            {achievements.map(ach => (
                                <li key={ach.id}>
                                    <span className="font-bold">{ach.title}</span>
                                    {ach.date && <span className="text-sm text-text-secondary ml-2">({ach.date})</span>}
                                    {ach.description && <p className="mt-1">{ach.description}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'leadership':
                if (leadership.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Leadership & Volunteering</SectionTitle>
                        <div className="space-y-3">
                            {leadership.map(item => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{item.role} <span className="font-normal">at {item.organization}</span></h3>
                                        <span className="text-sm text-text-secondary">
                                            {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
                                        </span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'certificates':
                if (certificates.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>Certificates</SectionTitle>
                        <ul className="space-y-1">
                            {certificates.map(cert => (
                                <li key={cert.id} className="flex justify-between">
                                    <div>
                                        <span className="font-bold">{cert.name}</span>
                                        <span className="text-text-secondary mx-2">-</span>
                                        <span>{cert.issuer}</span>
                                    </div>
                                    <span className="text-sm text-text-secondary">{cert.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'references':
                if (references.length === 0) return null;
                return (
                    <div className="mb-4">
                        <SectionTitle>References</SectionTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {references.map(ref => (
                                <div key={ref.id}>
                                    <p className="font-bold">{ref.name}</p>
                                    <p>{ref.role}, {ref.company}</p>
                                    {ref.email && <p className="text-sm text-text-secondary">{ref.email}</p>}
                                    {ref.phone && <p className="text-sm text-text-secondary">{ref.phone}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div id="resume-preview" className={containerClasses}>
            {sectionOrder.map(sectionId => (
                <React.Fragment key={sectionId}>
                    {renderSection(sectionId)}
                </React.Fragment>
            ))}
        </div>
    );
};
