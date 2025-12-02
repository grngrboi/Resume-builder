import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { clsx } from 'clsx';

export const ResumeDocument: React.FC = () => {
    const { resumeData, sectionOrder, settings } = useResume();
    const { personal, summary, projects, education, skills, achievements, leadership, certificates, references } = resumeData;

    // Constants for A4 page size and default margins (1 inch)
    const PAGE_WIDTH_PX = 794; // ~210mm at 96dpi
    const PAGE_HEIGHT_PX = 1123; // ~297mm at 96dpi
    const PAGE_MARGIN_PX = 48; // 1.27 cm (~0.5in) Narrow margin
    const CONTENT_WIDTH_PX = PAGE_WIDTH_PX - 2 * PAGE_MARGIN_PX;
    const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - 2 * PAGE_MARGIN_PX;

    const getFontFamily = () => {
        switch (settings.fontFamily) {
            case 'Roboto': return 'font-sans'; // Assuming we map these or load fonts
            case 'Lato': return 'font-sans';
            case 'Merriweather': return 'font-serif';
            case 'SF Pro': return 'font-[SF_Pro_Display]';
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

    const baseDocClasses = clsx(
        'text-slate-900 mx-auto',
        getFontFamily(),
        getFontSize(),
        getLineHeight(),
        settings.alignment === 'justify' ? 'text-justify' : 'text-left'
    );

    const pageStyle: React.CSSProperties = {
        width: `${PAGE_WIDTH_PX}px`,
        height: `${PAGE_HEIGHT_PX}px`,
        background: '#ffffff',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 10px 20px rgba(0,0,0,0.08)',
        margin: '0 auto 24px',
        display: 'flex',
        flexDirection: 'column',
        breakAfter: 'page',
    };

    const pageContentStyle: React.CSSProperties = {
        padding: PAGE_MARGIN_PX,
        color: settings.fontColor,
        flex: 1,
        width: '100%',
        boxSizing: 'border-box',
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2
            className="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 pb-1 mt-6 first:mt-0"
            style={{ borderColor: settings.themeColor, color: settings.themeColor }}
        >
            {children}
        </h2>
    );

    // Block model for pagination
    type Block = { key: string; render: () => React.ReactNode; section: string; kind: 'header' | 'item' };

    const blocks: Block[] = useMemo(() => {
        const list: Block[] = [];
        const push = (key: string, render: () => React.ReactNode, section: string, kind: Block['kind']) => {
            list.push({ key, render, section, kind });
        };

        sectionOrder.forEach(sectionId => {
            switch (sectionId) {
                case 'personal': {
                    push('personal', () => (
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
                    ), 'personal', 'item');
                    break;
                }
                case 'summary': {
                    if (summary) {
                        push('summary-header', () => (<SectionTitle>Professional Summary</SectionTitle>), 'summary', 'header');
                        push('summary', () => (<div className="mb-2"><p>{summary}</p></div>), 'summary', 'item');
                    }
                    break;
                }
                case 'projects': {
                    if (projects.length > 0) {
                        push('projects-header', () => (<SectionTitle>Projects</SectionTitle>), 'projects', 'header');
                        projects.forEach(p => {
                            push(`project-${p.id}`, () => (
                                <div className="mb-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{p.title}</h3>
                                        <span className="text-sm text-text-secondary">{p.startDate} {p.startDate && p.endDate && '-'} {p.endDate}</span>
                                    </div>
                                    {p.link && <a href={p.link} className="text-sm text-blue-600 hover:underline block mb-1">{p.link}</a>}
                                    {p.technologies && <p className="text-sm italic mb-1 text-text-secondary">Stack: {p.technologies}</p>}
                                    <p className="whitespace-pre-wrap">{p.description}</p>
                                </div>
                            ), 'projects', 'item');
                        });
                    }
                    break;
                }
                case 'education': {
                    if (education.length > 0) {
                        push('education-header', () => (<SectionTitle>Education</SectionTitle>), 'education', 'header');
                        education.forEach(edu => {
                            push(`edu-${edu.id}`, () => (
                                <div className="mb-3">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{edu.institution}</h3>
                                        <span className="text-sm text-text-secondary">{edu.startDate} {edu.startDate && edu.endDate && '-'} {edu.endDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                        {edu.gpa && <span className="text-sm">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ), 'education', 'item');
                        });
                    }
                    break;
                }
                case 'skills': {
                    const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;
                    if (hasSkills) {
                        push('skills-header', () => (<SectionTitle>Skills</SectionTitle>), 'skills', 'header');
                        if (skills.technical.length > 0) {
                            push('skills-technical', () => (
                                <div className="flex mb-2">
                                    <span className="font-bold w-32 shrink-0">Technical:</span>
                                    <span>{skills.technical.map(s => s.name).join(', ')}</span>
                                </div>
                            ), 'skills', 'item');
                        }
                        if (skills.soft.length > 0) {
                            push('skills-soft', () => (
                                <div className="flex mb-2">
                                    <span className="font-bold w-32 shrink-0">Soft Skills:</span>
                                    <span>{skills.soft.map(s => s.name).join(', ')}</span>
                                </div>
                            ), 'skills', 'item');
                        }
                        if (skills.languages.length > 0) {
                            push('skills-languages', () => (
                                <div className="flex mb-2">
                                    <span className="font-bold w-32 shrink-0">Languages:</span>
                                    <span>{skills.languages.map(s => s.name).join(', ')}</span>
                                </div>
                            ), 'skills', 'item');
                        }
                    }
                    break;
                }
                case 'achievements': {
                    if (achievements.length > 0) {
                        push('achievements-header', () => (<SectionTitle>Achievements</SectionTitle>), 'achievements', 'header');
                        achievements.forEach(ach => {
                            push(`ach-${ach.id}`, () => (
                                <div className="mb-2">
                                    <span className="font-bold">{ach.title}</span>
                                    {ach.date && <span className="text-sm text-text-secondary ml-2">({ach.date})</span>}
                                    {ach.description && <p className="mt-1">{ach.description}</p>}
                                </div>
                            ), 'achievements', 'item');
                        });
                    }
                    break;
                }
                case 'leadership': {
                    if (leadership.length > 0) {
                        push('leadership-header', () => (<SectionTitle>Leadership & Volunteering</SectionTitle>), 'leadership', 'header');
                        leadership.forEach(item => {
                            push(`lead-${item.id}`, () => (
                                <div className="mb-3">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold">{item.role} <span className="font-normal">at {item.organization}</span></h3>
                                        <span className="text-sm text-text-secondary">{item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}</span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{item.description}</p>
                                </div>
                            ), 'leadership', 'item');
                        });
                    }
                    break;
                }
                case 'certificates': {
                    if (certificates.length > 0) {
                        push('certificates-header', () => (<SectionTitle>Certificates</SectionTitle>), 'certificates', 'header');
                        certificates.forEach(cert => {
                            push(`cert-${cert.id}`, () => (
                                <div className="flex justify-between mb-1">
                                    <div>
                                        <span className="font-bold">{cert.name}</span>
                                        <span className="text-text-secondary mx-2">-</span>
                                        <span>{cert.issuer}</span>
                                    </div>
                                    <span className="text-sm text-text-secondary">{cert.date}</span>
                                </div>
                            ), 'certificates', 'item');
                        });
                    }
                    break;
                }
                case 'references': {
                    if (references.length > 0) {
                        push('references-header', () => (<SectionTitle>References</SectionTitle>), 'references', 'header');
                        references.forEach(ref => {
                            push(`ref-${ref.id}`, () => (
                                <div className="mb-2">
                                    <p className="font-bold">{ref.name}</p>
                                    <p>{ref.role}, {ref.company}</p>
                                    {ref.email && <p className="text-sm text-text-secondary">{ref.email}</p>}
                                    {ref.phone && <p className="text-sm text-text-secondary">{ref.phone}</p>}
                                </div>
                            ), 'references', 'item');
                        });
                    }
                    break;
                }
                default:
                    if (sectionId.startsWith('custom-')) {
                        const customSection = resumeData.customSections.find(s => s.id === sectionId);
                        if (customSection && customSection.items.length > 0) {
                            push(`${sectionId}-header`, () => (<SectionTitle>{customSection.name}</SectionTitle>), sectionId, 'header');
                            customSection.items.forEach(item => {
                                push(`${sectionId}-${item.id}`, () => (
                                    <div className="mb-3">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold">{item.title}</h3>
                                            {item.date && <span className="text-sm text-text-secondary">{item.date}</span>}
                                        </div>
                                        {item.subtitle && <p className="text-sm font-medium mb-1">{item.subtitle}</p>}
                                        {item.description && <p className="whitespace-pre-wrap">{item.description}</p>}
                                    </div>
                                ), sectionId, 'item');
                            });
                        }
                    }
                    break;
            }
        });

        return list;
    }, [sectionOrder, personal, summary, projects, education, skills, achievements, leadership, certificates, references, settings.themeColor]);

    // Measure blocks using a hidden staging area to compute pagination
    const stagingRef = useRef<HTMLDivElement | null>(null);
    const [pages, setPages] = useState<number[][]>([]); // array of arrays of block indices

    const paginate = () => {
        if (!stagingRef.current) return;
        const container = stagingRef.current;
        const blockEls = Array.from(container.querySelectorAll('[data-block="true"]')) as HTMLElement[];
        if (blockEls.length === 0) {
            setPages([]);
            return;
        }

        const heights = blockEls.map(el => {
            const rect = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            const mt = parseFloat(cs.marginTop || '0') || 0;
            const mb = parseFloat(cs.marginBottom || '0') || 0;
            return Math.ceil(rect.height + mt + mb + 0.5); // include margins and a tiny fudge
        });

        const out: number[][] = [];
        let current: number[] = [];
        let used = 0;
        const fits = (needed: number) => used + needed <= CONTENT_HEIGHT_PX;

        for (let i = 0; i < heights.length; i++) {
            const h = heights[i];
            const blk = blocks[i];

            if (h > CONTENT_HEIGHT_PX || !fits(h)) {
                if (current.length) out.push(current);
                current = [];
                used = 0;
            }

            if (blk.kind === 'header') {
                const nextIdx = i + 1;
                const hasNextSameSection = nextIdx < blocks.length && blocks[nextIdx].section === blk.section && blocks[nextIdx].kind === 'item';
                const nextHeight = hasNextSameSection ? heights[nextIdx] : 0;
                if (hasNextSameSection && !fits(h + nextHeight)) {
                    if (current.length) {
                        out.push(current);
                        current = [];
                        used = 0;
                    }
                }
            }

            current.push(i);
            used += h;
        }
        if (current.length) out.push(current);
        setPages(out);
    };

    useLayoutEffect(() => {
        paginate();
        // observe changes in size (fonts or layout) and re-paginate
        const target = stagingRef.current;
        if (!target) return;
        const ro = new ResizeObserver(() => paginate());
        ro.observe(target);
        // one more pass on next frame for late font swaps
        const raf = requestAnimationFrame(() => paginate());
        return () => {
            ro.disconnect();
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks.length, CONTENT_HEIGHT_PX, settings.fontFamily, settings.fontSize, settings.lineHeight, settings.fontColor, settings.themeColor, sectionOrder.join('|'), JSON.stringify(resumeData)]);

    return (
        <div id="resume-print-root" className={baseDocClasses}>
            {/* Hidden staging area used only for measurements */}
            <div className="resume-staging" style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', left: -10000, top: 0 }}>
                <div ref={stagingRef} style={{ width: CONTENT_WIDTH_PX }} className={baseDocClasses}>
                    {blocks.map((b) => (
                        <div key={`staging-${b.key}`} data-block="true" style={{ breakInside: 'avoid', display: 'flow-root' }}>
                            {b.render()}
                        </div>
                    ))}
                </div>
            </div>

            {/* Visible paginated pages */}
            {pages.length === 0 && (
                <div style={pageStyle} className="resume-page print:shadow-none print:m-0 print:w-full print:h-full print:p-0">
                    <div style={pageContentStyle} className="resume-page-content">
                        {blocks.map(b => (
                            <div key={b.key} style={{ breakInside: 'avoid', display: 'flow-root' }}>
                                {b.render()}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pages.map((indices, pi) => (
                <div key={`page-${pi}`} style={pageStyle} className="resume-page print:shadow-none print:m-0 print:w-full print:h-full print:p-0">
                    <div style={pageContentStyle} className="resume-page-content">
                        {indices.map(idx => {
                            const b = blocks[idx];
                            return (
                                <div key={b.key} style={{ breakInside: 'avoid', display: 'flow-root' }}>
                                    {b.render()}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
