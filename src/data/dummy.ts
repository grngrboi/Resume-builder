import { ResumeData } from '../types/resume';

export const dummyData: ResumeData = {
    personal: {
        fullName: 'Ahmad bin Abdullah',
        email: 'ahmad.abdullah@siswa.um.edu.my',
        phone: '+60 12-345 6789',
        linkedin: 'linkedin.com/in/ahmad-abdullah-se',
        location: 'Kuala Lumpur, Malaysia',
        website: 'ahmadcodes.dev',
    },
    summary: 'Motivated final-year Software Engineering student at University of Malaya with a strong foundation in full-stack development. Passionate about building scalable web applications and solving complex problems. Seeking an internship opportunity to apply academic knowledge in a professional setting and contribute to innovative software solutions.',
    projects: [
        {
            id: 'p1',
            title: 'E-Pasar Malam',
            description: 'A web application to help local night market vendors digitize their businesses. Features include real-time inventory management, QR code payments, and a vendor locator map.',
            technologies: 'React, Node.js, Express, MongoDB, Leaflet.js',
            link: 'github.com/ahmad/e-pasar-malam',
            startDate: '2024-01',
            endDate: '2024-04',
        },
        {
            id: 'p2',
            title: 'MyRapid Tracker',
            description: 'Mobile-responsive web app for tracking KL public transport schedules in real-time. Integrated with third-party APIs to provide accurate arrival times for LRT and MRT lines.',
            technologies: 'Vue.js, Firebase, Tailwind CSS',
            link: 'myrapid-tracker.vercel.app',
            startDate: '2023-08',
            endDate: '2023-11',
        },
        {
            id: 'p3',
            title: 'UniLife Forum',
            description: 'A community forum for university students to discuss academic topics and share resources. Implemented role-based access control and real-time chat functionality.',
            technologies: 'Next.js, PostgreSQL, Prisma, Socket.io',
            startDate: '2023-02',
            endDate: '2023-06',
        }
    ],
    education: [
        {
            id: 'e1',
            institution: 'University of Malaya (UM)',
            degree: 'Bachelor of Computer Science (Software Engineering)',
            fieldOfStudy: 'Software Engineering',
            startDate: '2022-09',
            endDate: '2026-06',
            gpa: '3.85',
        },
        {
            id: 'e2',
            institution: 'Kolej Matrikulasi Selangor',
            degree: 'Matriculation Certificate',
            fieldOfStudy: 'Physical Science',
            startDate: '2021-06',
            endDate: '2022-05',
            gpa: '4.00',
        }
    ],
    skills: {
        technical: [
            { id: 's1', name: 'JavaScript/TypeScript', level: 'Advanced' },
            { id: 's2', name: 'React.js', level: 'Advanced' },
            { id: 's3', name: 'Node.js', level: 'Intermediate' },
            { id: 's4', name: 'Python', level: 'Intermediate' },
            { id: 's5', name: 'SQL (PostgreSQL)', level: 'Intermediate' },
            { id: 's6', name: 'Git/GitHub', level: 'Advanced' },
        ],
        soft: [
            { id: 'ss1', name: 'Problem Solving', level: 'Advanced' },
            { id: 'ss2', name: 'Team Collaboration', level: 'Advanced' },
            { id: 'ss3', name: 'Communication', level: 'Intermediate' },
            { id: 'ss4', name: 'Time Management', level: 'Intermediate' },
        ],
        languages: [
            { id: 'l1', name: 'Bahasa Melayu', level: 'Expert' },
            { id: 'l2', name: 'English', level: 'Advanced' },
        ],
    },
    achievements: [
        {
            id: 'a1',
            title: 'Dean\'s List Award',
            description: 'Awarded for maintaining a GPA above 3.7 for 4 consecutive semesters.',
            date: '2022 - 2024',
        },
        {
            id: 'a2',
            title: 'Hackathon Winner - UM Hack 2023',
            description: 'Won 1st place in the "Smart City" category for developing an IoT-based waste management system.',
            date: '2023-05',
        }
    ],
    leadership: [
        {
            id: 'ld1',
            role: 'Technical Lead',
            organization: 'Google Developer Student Clubs (GDSC) UM',
            description: 'Led a team of 10 students to organize workshops and hackathons. Mentored junior students in web development technologies.',
            startDate: '2023-09',
            endDate: 'Present',
        },
        {
            id: 'ld2',
            role: 'Secretary',
            organization: 'Computer Science Society',
            description: 'Managed administrative tasks and coordinated events for the society.',
            startDate: '2022-09',
            endDate: '2023-08',
        }
    ],
    certificates: [
        {
            id: 'c1',
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services',
            date: '2023-12',
            link: 'aws.amazon.com/verify',
        },
        {
            id: 'c2',
            name: 'Meta Front-End Developer Professional Certificate',
            issuer: 'Coursera',
            date: '2023-07',
        }
    ],
    references: [
        {
            id: 'r1',
            name: 'Dr. Siti Aminah',
            role: 'Senior Lecturer',
            company: 'University of Malaya',
            email: 'siti.aminah@um.edu.my',
            phone: '+60 3-1234 5678',
        }
    ],
};
