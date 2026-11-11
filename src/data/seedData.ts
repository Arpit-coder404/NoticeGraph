import {
  Department,
  Category,
  Announcement,
  AnnouncementRelationship,
  UserProfile,
  DuplicateCluster,
  AnnouncementVersion,
  UserNotification,
  PersonalReminder
} from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cse',
    name: 'Department of Computer Science & Engineering',
    code: 'CSE',
    description: 'Leading computer science education, systems research, and artificial intelligence.',
    dean: 'Prof. Rajesh K. Nair',
    building: 'Turing Hall, North Campus',
    email: 'head.cse@university.edu',
    phone: '+1 (555) 234-5671',
    announcementCount: 14
  },
  {
    id: 'dept-tp',
    name: 'Training & Placement Cell',
    code: 'T&P',
    description: 'Connecting graduating students with global corporations, startups, and research fellowships.',
    dean: 'Dr. Anand Verma',
    building: 'Synergy Building, 2nd Floor',
    email: 'placements@university.edu',
    phone: '+1 (555) 234-5890',
    announcementCount: 9
  },
  {
    id: 'dept-exam',
    name: 'Office of the Controller of Examinations',
    code: 'EXAM',
    description: 'Autonomous administration of semester assessments, evaluation, and degree certifications.',
    dean: 'Dr. Sunita Deshmukh',
    building: 'Senate House, Ground Floor',
    email: 'coe@university.edu',
    phone: '+1 (555) 234-5100',
    announcementCount: 8
  },
  {
    id: 'dept-ece',
    name: 'Department of Electronics & Communication Engineering',
    code: 'ECE',
    description: 'Frontier research in microelectronics, quantum circuits, and signal communications.',
    dean: 'Prof. K. Venkatesh',
    building: 'Shannon Labs, East Campus',
    email: 'head.ece@university.edu',
    phone: '+1 (555) 234-5672',
    announcementCount: 6
  },
  {
    id: 'dept-dosa',
    name: 'Dean of Student Affairs (DOSA)',
    code: 'DOSA',
    description: 'Campus welfare, residential housing, cultural councils, and student grievance support.',
    dean: 'Prof. Marcus Vance',
    building: 'Student Activity Centre (SAC)',
    email: 'dosa@university.edu',
    phone: '+1 (555) 234-5220',
    announcementCount: 7
  },
  {
    id: 'dept-sms',
    name: 'School of Management Studies',
    code: 'SMS',
    description: 'Strategic leadership, venture financing, and digital business analytics.',
    dean: 'Dr. Evelyn Reed',
    building: 'Management Block, South Campus',
    email: 'dean.sms@university.edu',
    phone: '+1 (555) 234-5430',
    announcementCount: 5
  },
  {
    id: 'dept-mech',
    name: 'Department of Mechanical & Aerospace Engineering',
    code: 'MECH',
    description: 'Advanced thermofluids, robotics, autonomous flight, and manufacturing.',
    dean: 'Prof. Vikram Malhotra',
    building: 'Carnot Pavilion, West Campus',
    email: 'head.mech@university.edu',
    phone: '+1 (555) 234-5673',
    announcementCount: 4
  },
  {
    id: 'dept-res',
    name: 'Dean of Research & Consultancy (DORC)',
    code: 'DORC',
    description: 'Sponsored grants, patents, interdisciplinary incubation, and laboratory compliance.',
    dean: 'Dr. Helen Zhou',
    building: 'Innovation Hub, 4th Floor',
    email: 'research@university.edu',
    phone: '+1 (555) 234-5999',
    announcementCount: 6
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-placements',
    name: 'Placements & Career',
    slug: 'placements',
    description: 'Campus recruitment drives, internships, test schedules, and corporate bootcamps.',
    badgeColor: '#315BEA'
  },
  {
    id: 'cat-exams',
    name: 'Examinations & Grades',
    slug: 'examinations',
    description: 'End-semester timetables, hall tickets, re-evaluation, and grade transcripts.',
    badgeColor: '#F27B42'
  },
  {
    id: 'cat-academics',
    name: 'Academic Affairs',
    slug: 'academics',
    description: 'Course registration, elective choices, academic calendar, and syllabus amendments.',
    badgeColor: '#17191C'
  },
  {
    id: 'cat-scholarships',
    name: 'Scholarships & Aid',
    slug: 'scholarships',
    description: 'Merit-cum-means grants, government financial fellowships, and fee concessions.',
    badgeColor: '#92977C'
  },
  {
    id: 'cat-events',
    name: 'Campus Events & Fests',
    slug: 'events',
    description: 'Annual cultural galas, department symposiums, hackathons, and guest lectures.',
    badgeColor: '#41464D'
  },
  {
    id: 'cat-research',
    name: 'Research & Labs',
    slug: 'research',
    description: 'Seed research grants, GPU cluster compute slots, paper conferences, and patents.',
    badgeColor: '#315BEA'
  },
  {
    id: 'cat-hostels',
    name: 'Housing & Campus Life',
    slug: 'housing',
    description: 'Hostel room allocations, mess tenders, bus transit routes, and health center updates.',
    badgeColor: '#F27B42'
  },
  {
    id: 'cat-competitions',
    name: 'Competitions & Grants',
    slug: 'competitions',
    description: 'Autonomous vehicle challenges, programming olympiads, and startup pitch decks.',
    badgeColor: '#92977C'
  },
  {
    id: 'cat-circulars',
    name: 'Administrative Circulars',
    slug: 'circulars',
    description: 'Official notifications from the Registrar, holidays, and campus regulations.',
    badgeColor: '#17191C'
  },
  {
    id: 'cat-clubs',
    name: 'Student Clubs & Teams',
    slug: 'clubs',
    description: 'Recruitment for SAE racing, robotics society, debating forum, and editorial board.',
    badgeColor: '#41464D'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  // FEATURED ITEM (Hero of the Newsroom)
  {
    id: 'anc-001',
    title: 'Google Cloud & DeepMind Campus Fellowship Drive 2026: Application Process & System Test Protocols',
    slug: 'google-deepmind-campus-fellowship-2026',
    summary: 'Central Placement Cell announces exclusive on-campus recruitment drive for 2027 graduating cohorts. Eligible programs include CSE, ECE, and Data Science with minimum CGPA 8.0.',
    content: `The Central Training & Placement Cell, in joint coordination with Google University Relations, announces the commencement of registration for the Summer Research Fellowship & Graduate Software Engineering Program 2026.

Eligible candidates must review all prerequisites, upload verified transcripts, and complete the preliminary proctored technical diagnostic test scheduled on the University HackerRank portal.

Key Information & Highlights:
1. Roles: Associate Software Engineer (Full-time) & Research Engineering Intern (Summer 2026).
2. Compensation: Competitive tier-1 compensation bracket with relocation and mentorship stipends.
3. Assessment Structure: 
   - Round 1: Online DSA & Systems Architecture Diagnostic (90 Mins).
   - Round 2: Virtual Technical Pair-Programming Screen.
   - Round 3: Engineering Team Behavioral & Systems Deep-Dive.

Please note: All candidates must maintain strict adherence to university placement policy clause 4.2 regarding non-disclosure agreements and single-offer freeze protocols.`,
    categoryId: 'cat-placements',
    departmentId: 'dept-tp',
    importance: 'urgent',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-10T09:00:00Z',
    updatedAt: '2026-11-11T14:30:00Z',
    expiresAt: '2026-11-25T23:59:59Z',
    createdBy: 'Dr. Anand Verma',
    viewCount: 3840,
    readCount: 1420,
    hasDocument: true,
    documentName: 'TPC_Google_Recruitment_Circular_2026_Final.pdf',
    documentType: 'pdf',
    documentSize: '1.4 MB',
    documentUrl: '/docs/sample_tpc_google.pdf',
    extractedFields: [
      {
        id: 'fld-1',
        fieldName: 'Minimum CGPA Requirement',
        extractedValue: '8.00 cumulative with zero active backlogs',
        confidence: 0.98,
        sourceReference: 'Page 2, Section 3.1 Eligibility Criteria',
        verificationStatus: 'verified',
        verifiedBy: 'Dr. Anand Verma',
        verifiedAt: '2026-11-10T10:15:00Z'
      },
      {
        id: 'fld-2',
        fieldName: 'Eligible Academic Batches',
        extractedValue: 'B.Tech/Dual Degree 2027 Graduating Cohort (CSE, ECE, EE)',
        confidence: 0.95,
        sourceReference: 'Page 1, Target Candidate Matrix',
        verificationStatus: 'verified',
        verifiedBy: 'Dr. Anand Verma'
      },
      {
        id: 'fld-3',
        fieldName: 'Mandatory Pre-Placement Talk Venue',
        extractedValue: 'Auditorium Hall 1 & Live Webcast via University SSO',
        confidence: 0.91,
        sourceReference: 'Page 3, Schedule Details',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-1',
        dateType: 'deadline',
        dateValue: '2026-11-18',
        timeValue: '17:00',
        description: 'Online Resume & Portal Registration Deadline',
        verificationStatus: 'verified'
      },
      {
        id: 'date-2',
        dateType: 'event',
        dateValue: '2026-11-19',
        timeValue: '16:00',
        description: 'Pre-Placement Talk (PPT) by Google Engineering Leadership',
        verificationStatus: 'verified'
      },
      {
        id: 'date-3',
        dateType: 'exam',
        dateValue: '2026-11-21',
        timeValue: '10:00',
        description: 'Proctored Coding Diagnostic on HackerRank Campus Portal',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'B.Tech / M.Tech in Computer Science, Data Science, or ECE',
      'Minimum CGPA of 8.0 on a 10.0 scale',
      'No active academic or disciplinary backlogs at time of submission',
      'Completed registration on University Placement ERP portal'
    ],
    requiredActions: [
      {
        id: 'act-1',
        title: 'Submit resume on University T&P ERP Portal',
        actionType: 'form',
        deadline: '2026-11-18T17:00:00Z',
        url: 'https://placements.university.edu/apply/google-2026'
      },
      {
        id: 'act-2',
        title: 'Verify updated grade card with Department Academic Advisor',
        actionType: 'verify',
        deadline: '2026-11-17T15:00:00Z'
      },
      {
        id: 'act-3',
        title: 'Complete mock coding diagnostic on internal platform',
        actionType: 'attend',
        deadline: '2026-11-20T20:00:00Z'
      }
    ],
    contactInfo: {
      name: 'Dr. Anand Verma',
      role: 'Head of Campus Placement & Corporate Relations',
      email: 'placements@university.edu',
      phone: '+1 (555) 234-5890',
      office: 'Synergy Building, Suite 204'
    },
    audience: {
      departments: ['dept-cse', 'dept-ece'],
      programs: ['B.Tech Computer Science', 'M.Tech Artificial Intelligence', 'B.Tech Electronics'],
      semesters: [6, 7, 8],
      audienceType: 'specific'
    },
    tags: ['Google', 'Campus Placement', 'Summer Fellowship', 'CSE', 'ECE', 'High Priority']
  },

  // EDITORIAL SECONDARY 1
  {
    id: 'anc-002',
    title: 'Autonomous Semester-End Examination Schedule & Hall Ticket Issuance Policy (Autumn 2026)',
    slug: 'autumn-2026-end-sem-exam-schedule',
    summary: 'The Examination Branch releases the definitive schedule for November-December 2026 major theoretical & laboratory assessments across all undergraduate programs.',
    content: `The Office of the Controller of Examinations notifies all registered students that the End-Semester Autonomous Examinations for Autumn Session 2026 will commence from Monday, 30 November 2026.

Important Instructions for Examinees:
- Hall tickets must be digitally generated through the Student Self-Service Portal between 20 Nov and 26 Nov 2026.
- In accordance with Academic Council regulation 12.B, a minimum physical attendance threshold of 75% across all registered theory credit units is mandatory for hall ticket validation.
- Barcoded physical identity cards must be carried alongside the printed hall ticket into examination halls. Smartwatches, programmable calculators, and wireless telemetry gear are strictly prohibited.
- Make-up examinations for candidates with documented medical emergencies will be conducted in January 2027 with prior Dean approval.`,
    categoryId: 'cat-exams',
    departmentId: 'dept-exam',
    importance: 'high',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-11T11:00:00Z',
    updatedAt: '2026-11-11T11:00:00Z',
    expiresAt: '2026-12-18T18:00:00Z',
    createdBy: 'Dr. Sunita Deshmukh',
    viewCount: 4520,
    readCount: 2890,
    hasDocument: true,
    documentName: 'COE_Autonomous_EndSem_Timetable_Autumn2026.pdf',
    documentType: 'pdf',
    documentSize: '2.8 MB',
    documentUrl: '/docs/coe_autumn_2026.pdf',
    extractedFields: [
      {
        id: 'fld-exam-1',
        fieldName: 'Attendance Cut-off Threshold',
        extractedValue: '75% aggregate subject attendance by 20 Nov 2026',
        confidence: 0.99,
        sourceReference: 'Paragraph 3, Directive 12.B',
        verificationStatus: 'verified',
        verifiedBy: 'Dr. Sunita Deshmukh'
      },
      {
        id: 'fld-exam-2',
        fieldName: 'Hall Ticket Generation Window',
        extractedValue: '20 November 2026 (08:00) to 26 November 2026 (23:59)',
        confidence: 0.97,
        sourceReference: 'Section 4, Portal Schedule',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-ex-1',
        dateType: 'deadline',
        dateValue: '2026-11-26',
        timeValue: '23:59',
        description: 'End of Hall Ticket Download Window',
        verificationStatus: 'verified'
      },
      {
        id: 'date-ex-2',
        dateType: 'exam',
        dateValue: '2026-11-30',
        timeValue: '09:30',
        description: 'Commencement of Written Examinations',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Enrolled in Autumn 2026 semester credits',
      'Cleared all financial dues and semester tuition fees',
      'Satisfies 75% minimum classroom attendance'
    ],
    requiredActions: [
      {
        id: 'act-ex-1',
        title: 'Download and print physical Hall Ticket with barcode',
        actionType: 'form',
        deadline: '2026-11-26T23:59:00Z',
        url: 'https://erp.university.edu/exams/hallticket'
      },
      {
        id: 'act-ex-2',
        title: 'Clear library and department fee holds if pending',
        actionType: 'payment',
        deadline: '2026-11-22T17:00:00Z'
      }
    ],
    contactInfo: {
      name: 'Dr. Sunita Deshmukh',
      role: 'Controller of Examinations',
      email: 'coe@university.edu',
      phone: '+1 (555) 234-5100',
      office: 'Senate House, Ground Floor Room 12'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [1, 2, 3, 4, 5, 6, 7, 8],
      audienceType: 'all'
    },
    tags: ['Examinations', 'EndSem', 'Hall Ticket', 'Mandatory', 'All Batches']
  },

  // EDITORIAL SECONDARY 2
  {
    id: 'anc-003',
    title: 'University Merit-cum-Means (MCM) & STEM Financial Fellowship: Applications Open for 2026-27',
    slug: 'university-merit-cum-means-scholarship-2026',
    summary: 'Office of Dean of Student Affairs invites applications for the endowment scholarship fund offering up to 100% tuition waiver and living stipends for eligible students.',
    content: `The University Scholarship Committee hereby invites applications from eligible undergraduate and postgraduate candidates for the Academic Year 2026-2027 Merit-cum-Means (MCM) Endowment Grants.

Eligibility Highlights:
- Annual Gross Parental/Family income must not exceed USD $35,000 (or equivalent regional threshold). Income certificate issued by competent government revenue authority is mandatory.
- Minimum CGPA of 7.0 (with no F grades in preceding semesters).
- Not currently receiving any external full-fee corporate or national scholarship.

Award Tiers:
- Tier A: Full Tuition Waiver + $1,200 annual book/stationery stipend (CGPA >= 8.5).
- Tier B: 50% Tuition Waiver for eligible students (CGPA >= 7.5).
- Tier C: Targeted Women in STEM Leadership Grant sponsored by Alumni Council.`,
    categoryId: 'cat-scholarships',
    departmentId: 'dept-dosa',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-08T10:00:00Z',
    updatedAt: '2026-11-09T16:00:00Z',
    expiresAt: '2026-12-05T17:00:00Z',
    createdBy: 'Prof. Marcus Vance',
    viewCount: 2940,
    readCount: 1100,
    hasDocument: true,
    documentName: 'DOSA_MCM_Scholarship_Guidelines_2026.pdf',
    documentType: 'pdf',
    documentSize: '950 KB',
    documentUrl: '/docs/dosa_scholarship_guidelines.pdf',
    extractedFields: [
      {
        id: 'fld-sch-1',
        fieldName: 'Family Income Ceiling',
        extractedValue: 'Gross annual income under $35,000 with tax verification',
        confidence: 0.94,
        sourceReference: 'Clause 2.1 Family Income Criteria',
        verificationStatus: 'verified'
      },
      {
        id: 'fld-sch-2',
        fieldName: 'Minimum Cumulative CGPA',
        extractedValue: '7.00 without backlogs',
        confidence: 0.96,
        sourceReference: 'Clause 2.3 Academic Standing',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-sch-1',
        dateType: 'deadline',
        dateValue: '2026-12-05',
        timeValue: '17:00',
        description: 'Hardcopy and Online Application Submission Deadline',
        verificationStatus: 'verified'
      },
      {
        id: 'date-sch-2',
        dateType: 'result',
        dateValue: '2026-12-22',
        timeValue: '12:00',
        description: 'Provisional List of Shortlisted Recipients Published',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Full-time enrolled student in recognized degree program',
      'Verified family annual income below certified threshold',
      'Minimum 7.0 CGPA throughout academic tenure'
    ],
    requiredActions: [
      {
        id: 'act-sch-1',
        title: 'Upload Income Affidavit and Tax returns on DOSA portal',
        actionType: 'upload',
        deadline: '2026-12-05T17:00:00Z',
        url: 'https://dosa.university.edu/scholarships/mcm-apply'
      },
      {
        id: 'act-sch-2',
        title: 'Submit physical self-attested folder to DOSA Welfare Desk',
        actionType: 'form',
        deadline: '2026-12-07T14:00:00Z'
      }
    ],
    contactInfo: {
      name: 'Ms. Clara Higgins',
      role: 'Scholarship & Student Aid Officer',
      email: 'scholarships@university.edu',
      phone: '+1 (555) 234-5225',
      office: 'SAC Building, Room 102'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [2, 3, 4, 5, 6, 7, 8],
      audienceType: 'all'
    },
    tags: ['Scholarships', 'Financial Aid', 'DOSA', 'Tuition Waiver', 'STEM']
  },

  // ITEM 4 - HACKATHON
  {
    id: 'anc-004',
    title: 'HackCampus 2026: 36-Hour National Inter-College Artificial Intelligence & Systems Hackathon',
    slug: 'hackcampus-2026-national-ai-hackathon',
    summary: 'Department of CSE and University Coding Club host the premier annual hackathon with $25,000 in seed prizes and direct fast-track interviews with sponsor tech incubators.',
    content: `Registration is officially open for HackCampus 2026, the 10th edition of the national 36-hour hackathon hosted at the University Innovation Complex.

Tracks:
1. Generative AI & Autonomous Agent Systems
2. Decentralized Compute & Privacy-Preserving Cryptography
3. Climate Intelligence & IoT Edge Telemetry
4. Next-Gen Accessibility & Assistive Engineering

Teams of 3 to 4 students can register. Food, overnight lodging in the campus pavilion, mentoring by industry architects, and compute credits will be provided.`,
    categoryId: 'cat-competitions',
    departmentId: 'dept-cse',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-09T14:00:00Z',
    updatedAt: '2026-11-09T14:00:00Z',
    expiresAt: '2026-11-28T23:59:00Z',
    createdBy: 'Prof. Rajesh K. Nair',
    viewCount: 1820,
    readCount: 650,
    hasDocument: true,
    documentName: 'HackCampus_2026_Rulebook_and_Tracks.pdf',
    documentType: 'pdf',
    documentSize: '3.1 MB',
    documentUrl: '/docs/hackcampus_2026.pdf',
    extractedFields: [
      {
        id: 'fld-hack-1',
        fieldName: 'Prize Pool Total',
        extractedValue: '$25,000 across track prizes + sponsor bounties',
        confidence: 0.98,
        sourceReference: 'Page 3, Prize Distribution Matrix',
        verificationStatus: 'verified'
      },
      {
        id: 'fld-hack-2',
        fieldName: 'Team Size Constraint',
        extractedValue: '3 to 4 registered university students',
        confidence: 0.95,
        sourceReference: 'Page 2, Team Formation Rules',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-hk-1',
        dateType: 'deadline',
        dateValue: '2026-11-24',
        timeValue: '23:59',
        description: 'Team Idea Abstract & Portal Registration Closes',
        verificationStatus: 'verified'
      },
      {
        id: 'date-hk-2',
        dateType: 'event',
        dateValue: '2026-12-04',
        timeValue: '18:00',
        description: 'Hackathon Opening Ceremony & Hacking Commences',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Currently enrolled undergraduate or postgraduate students from any university',
      'Valid student photo ID card required at on-site check-in'
    ],
    requiredActions: [
      {
        id: 'act-hk-1',
        title: 'Register team roster and submit 200-word proposal on Devpost',
        actionType: 'form',
        deadline: '2026-11-24T23:59:00Z',
        url: 'https://hackcampus2026.devpost.com'
      }
    ],
    contactInfo: {
      name: 'Rohan Sen',
      role: 'Convenor, HackCampus Organizing Committee',
      email: 'hackcampus@university.edu',
      phone: '+1 (555) 234-9110'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Hackathon', 'AI', 'Coding', 'Prizes', 'CSE', 'Competition']
  },

  // ITEM 5 - RESEARCH LAB ACCESS
  {
    id: 'anc-005',
    title: 'University GPU High-Performance Compute Cluster: New Allocation Window for Spring 2027 Research',
    slug: 'gpu-hpc-cluster-allocation-spring-2027',
    summary: 'Dean of Research announces time allocations for the 64-node NVIDIA H100 cluster for graduate thesis students, faculty labs, and Capstone research groups.',
    content: `The High Performance Computing Council invites proposals for compute allocations on the 'PARAM-Nova' cluster for research spanning January to June 2027.

Eligible applicants: Faculty researchers, PhD scholars, and undergraduate Capstone teams endorsed by a principal investigator.

Requirements:
- Compute project plan detailing GPU memory requirements, dataset sizes, and framework dependencies (PyTorch/JAX).
- All models trained on the cluster must adhere to the University Ethical AI & Data Governance Framework.`,
    categoryId: 'cat-research',
    departmentId: 'dept-res',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-07T12:00:00Z',
    updatedAt: '2026-11-07T12:00:00Z',
    expiresAt: '2026-12-01T17:00:00Z',
    createdBy: 'Dr. Helen Zhou',
    viewCount: 1120,
    readCount: 420,
    hasDocument: true,
    documentName: 'HPC_Cluster_Resource_Policy_2026.pdf',
    documentType: 'pdf',
    documentSize: '1.2 MB',
    documentUrl: '/docs/hpc_policy.pdf',
    extractedFields: [
      {
        id: 'fld-hpc-1',
        fieldName: 'Maximum Node Quota Per Project',
        extractedValue: 'Up to 8 H100 GPUs for max 120 continuous wall-clock hours',
        confidence: 0.92,
        sourceReference: 'Section 4, Service Level Tiers',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-hpc-1',
        dateType: 'deadline',
        dateValue: '2026-12-01',
        timeValue: '17:00',
        description: 'Submission of GPU Grant Allocation Request Proposals',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'PhD scholars, M.Tech candidates, or final-year B.Tech Capstone teams',
      'Endorsement from a full-time university faculty member'
    ],
    requiredActions: [
      {
        id: 'act-hpc-1',
        title: 'Submit Slurm account requisition with faculty sign-off',
        actionType: 'form',
        deadline: '2026-12-01T17:00:00Z',
        url: 'https://hpc.university.edu/allocations/apply'
      }
    ],
    contactInfo: {
      name: 'Dr. Helen Zhou',
      role: 'Dean of Research & HPC Director',
      email: 'research@university.edu',
      phone: '+1 (555) 234-5999',
      office: 'Innovation Hub, Suite 401'
    },
    audience: {
      departments: ['dept-cse', 'dept-ece', 'dept-mech'],
      programs: ['M.Tech Artificial Intelligence', 'PhD Computer Science', 'B.Tech Computer Science'],
      semesters: [6, 7, 8],
      audienceType: 'specific'
    },
    tags: ['Research', 'HPC', 'NVIDIA', 'Compute', 'AI']
  },

  // ITEM 6 - HOSTEL REALLOTMENT
  {
    id: 'anc-006',
    title: 'Spring Semester 2027 Hostel Room Re-Allotment & Vacation Protocol Notification',
    slug: 'hostel-room-reallotment-spring-2027',
    summary: 'Dean of Student Affairs outlines mandatory room inspection, vacation schedule during winter break, and online allotment preferences for next semester.',
    content: `All resident students residing in campus halls of residence (Bhavan A through F, Kalpana Chawla Hall, and Tagore Hall) are hereby notified regarding semester-break turnover procedures.

Key Guidelines:
1. All undergraduate rooms must be surrendered for mandatory sanitation by 18 December 2026 (18:00 hrs) unless enrolled in officially sanctioned winter internships or lab research.
2. The online hostel room preference portal for Spring 2027 will open on 1 December 2026.
3. Students wishing to retain their current room as a wing group must register their rooming group of 4 students simultaneously.`,
    categoryId: 'cat-hostels',
    departmentId: 'dept-dosa',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-06T09:00:00Z',
    updatedAt: '2026-11-06T09:00:00Z',
    expiresAt: '2026-12-18T18:00:00Z',
    createdBy: 'Prof. Marcus Vance',
    viewCount: 3100,
    readCount: 1600,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-hst-1',
        dateType: 'deadline',
        dateValue: '2026-12-08',
        timeValue: '23:59',
        description: 'Submission of Spring 2027 Room Preference Choices',
        verificationStatus: 'verified'
      },
      {
        id: 'date-hst-2',
        dateType: 'deadline',
        dateValue: '2026-12-18',
        timeValue: '18:00',
        description: 'Vacation of Hostel Rooms for Winter Sanitation',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Currently enrolled hostel boarders with zero outstanding mess bills'
    ],
    requiredActions: [
      {
        id: 'act-hst-1',
        title: 'Submit hostel preference form on Hostel ERP',
        actionType: 'form',
        deadline: '2026-12-08T23:59:00Z',
        url: 'https://hostels.university.edu/preferences'
      }
    ],
    contactInfo: {
      name: 'Chief Warden Office',
      role: 'Hostel Administration',
      email: 'warden@university.edu',
      phone: '+1 (555) 234-5230'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Hostel', 'Campus Life', 'DOSA', 'Housing']
  },

  // ITEM 7 - MICROSOFT DRIVE
  {
    id: 'anc-007',
    title: 'Microsoft India Development Center: On-Campus Placement Drive for 2027 Batch',
    slug: 'microsoft-india-placement-drive-2027',
    summary: 'Microsoft announces hiring for Software Engineer, Product Manager, and Cloud Solutions Architect roles for final and pre-final year students.',
    content: `Microsoft IDC campus recruitment team will be visiting the university campus from 28 November to 1 December 2026.

Roles Offered:
1. Software Engineer (Full Time) - Bangalore, Hyderabad, Noida
2. Program Manager Intern - Summer 2026
3. Cloud Solution Architect - Microsoft Customer Engineering

The initial coding challenge will be hosted on Mettle. Shortlisted students will participate in three technical interview rounds focusing on distributed systems, algorithms, and problem solving.`,
    categoryId: 'cat-placements',
    departmentId: 'dept-tp',
    importance: 'urgent',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-10T11:00:00Z',
    updatedAt: '2026-11-10T11:00:00Z',
    expiresAt: '2026-11-22T23:59:00Z',
    createdBy: 'Dr. Anand Verma',
    viewCount: 3950,
    readCount: 1890,
    hasDocument: true,
    documentName: 'Microsoft_Campus_Hiring_Guidelines_2026.pdf',
    documentType: 'pdf',
    documentSize: '1.8 MB',
    documentUrl: '/docs/microsoft_hiring.pdf',
    extractedFields: [
      {
        id: 'fld-ms-1',
        fieldName: 'Eligibility Cutoff',
        extractedValue: 'CGPA 7.5 and above in B.Tech CSE, IT, ECE',
        confidence: 0.97,
        sourceReference: 'Page 1, Candidate Criteria',
        verificationStatus: 'verified'
      }
    ],
    importantDates: [
      {
        id: 'date-ms-1',
        dateType: 'deadline',
        dateValue: '2026-11-20',
        timeValue: '18:00',
        description: 'T&P Portal Registration Deadline for Microsoft',
        verificationStatus: 'verified'
      },
      {
        id: 'date-ms-2',
        dateType: 'exam',
        dateValue: '2026-11-23',
        timeValue: '14:00',
        description: 'Online Coding Assessment on Mettle',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'B.Tech / M.Tech in CSE, ECE, or Software Engineering',
      'Minimum CGPA of 7.50 with no standing backlogs'
    ],
    requiredActions: [
      {
        id: 'act-ms-1',
        title: 'Sign-up on Microsoft Career portal and sync application ID with T&P',
        actionType: 'form',
        deadline: '2026-11-20T18:00:00Z',
        url: 'https://careers.microsoft.com/students'
      }
    ],
    contactInfo: {
      name: 'Dr. Anand Verma',
      role: 'Head of Campus Placement',
      email: 'placements@university.edu',
      phone: '+1 (555) 234-5890'
    },
    audience: {
      departments: ['dept-cse', 'dept-ece'],
      programs: ['B.Tech Computer Science', 'B.Tech Electronics'],
      semesters: [6, 7, 8],
      audienceType: 'specific'
    },
    tags: ['Microsoft', 'Placements', 'Software Engineer', 'CSE', 'ECE']
  },

  // ITEM 8 - ACADEMIC ELECTIVE SELECTION
  {
    id: 'anc-008',
    title: 'Spring 2027 Open Elective & Interdisciplinary Minor Course Allotment Window',
    slug: 'spring-2027-open-elective-registration',
    summary: 'Dean of Academic Affairs notifies students of 4th, 6th, and 8th semesters to submit priority preferences for institutional open electives and university minors.',
    content: `Online course preference filling for Spring 2027 Open Elective courses and Minor programs will be active from 15 November to 22 November 2026.

Popular New Courses Introduced:
1. Generative Deep Learning & Foundation Models (CSE 428)
2. Quantitative Finance & Algorithmic Trading (SMS 314)
3. Nanomaterials for Energy Harvesting (MECH 402)
4. Technology, Ethics, and Global Law (HSS 209)

Seats will be allocated automatically by the Academic ERP engine based strictly on cumulative merit (CGPA) and candidate preference order.`,
    categoryId: 'cat-academics',
    departmentId: 'dept-cse',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-05T10:00:00Z',
    updatedAt: '2026-11-05T10:00:00Z',
    expiresAt: '2026-11-22T23:59:00Z',
    createdBy: 'Prof. Rajesh K. Nair',
    viewCount: 2210,
    readCount: 1100,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-el-1',
        dateType: 'deadline',
        dateValue: '2026-11-22',
        timeValue: '23:59',
        description: 'Submission of Open Elective Preference Choices',
        verificationStatus: 'verified'
      },
      {
        id: 'date-el-2',
        dateType: 'result',
        dateValue: '2026-11-27',
        timeValue: '17:00',
        description: 'Allotment Round 1 Results Published',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Undergraduate students entering Semester 4, 6, or 8 in Spring 2027'
    ],
    requiredActions: [
      {
        id: 'act-el-1',
        title: 'Submit 5 ranked choices on Student Academic Portal',
        actionType: 'form',
        deadline: '2026-11-22T23:59:00Z',
        url: 'https://academics.university.edu/electives'
      }
    ],
    contactInfo: {
      name: 'Academic Affairs Helpdesk',
      role: 'Curriculum & Records Section',
      email: 'academics@university.edu',
      phone: '+1 (555) 234-5600'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [4, 6, 8],
      audienceType: 'all'
    },
    tags: ['Academics', 'Electives', 'Registration', 'Spring 2027']
  },

  // ITEM 9 - CONVOCATION
  {
    id: 'anc-009',
    title: '38th Annual University Convocation & Degree Distribution Ceremony Announcement',
    slug: '38th-annual-convocation-ceremony-2026',
    summary: 'The Registrar announces the 38th Convocation ceremony honoring the graduating class of 2026. Chief Guest: Dr. Soumya Swaminathan, Former Chief Scientist at WHO.',
    content: `The 38th Annual Convocation of the University will be celebrated on Saturday, 19 December 2026 at the Main Convocation Pavilion.

Graduands from all faculties (Undergraduate, Postgraduate, and Doctoral) who completed their degree requirements in Summer and Autumn 2026 are invited to attend.

Registration and Robes:
- Graduands must register online and pay the nominal regalia security deposit by 30 November.
- Rehearsal on Friday, 18 December at 15:00 is mandatory for all students participating in the formal stage procession.`,
    categoryId: 'cat-circulars',
    departmentId: 'dept-exam',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-04T12:00:00Z',
    updatedAt: '2026-11-04T12:00:00Z',
    expiresAt: '2026-12-19T20:00:00Z',
    createdBy: 'Dr. Sunita Deshmukh',
    viewCount: 3400,
    readCount: 1540,
    hasDocument: true,
    documentName: 'Registrar_Circular_Convocation_38.pdf',
    documentType: 'pdf',
    documentSize: '1.1 MB',
    documentUrl: '/docs/convocation_38.pdf',
    extractedFields: [],
    importantDates: [
      {
        id: 'date-cnv-1',
        dateType: 'deadline',
        dateValue: '2026-11-30',
        timeValue: '17:00',
        description: 'Online Convocation Participation Registration Closes',
        verificationStatus: 'verified'
      },
      {
        id: 'date-cnv-2',
        dateType: 'event',
        dateValue: '2026-12-19',
        timeValue: '10:00',
        description: '38th Annual Convocation Ceremony',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Graduating batch of 2026 with no outstanding library or institutional holds'
    ],
    requiredActions: [
      {
        id: 'act-cnv-1',
        title: 'Confirm attendance and book academic robes',
        actionType: 'form',
        deadline: '2026-11-30T17:00:00Z',
        url: 'https://convocation.university.edu/register'
      }
    ],
    contactInfo: {
      name: 'Convocation Secretariat',
      role: 'Registrar Office',
      email: 'convocation@university.edu',
      phone: '+1 (555) 234-5000'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [8],
      audienceType: 'all'
    },
    tags: ['Convocation', 'Graduation', 'Ceremony', 'Degree']
  },

  // ITEM 10 - IEEE SYMPOSIUM
  {
    id: 'anc-010',
    title: 'IEEE International Student Symposium on Quantum & Neuromorphic Computing (ISSQNC 2026)',
    slug: 'ieee-symposium-quantum-neuromorphic-2026',
    summary: 'ECE and CSE IEEE Student Chapters co-host a 2-day technical symposium featuring keynotes from MIT, IBM Quantum, and Intel Labs. Call for student posters open.',
    content: `The IEEE Student Branch cordially invites undergraduate and graduate researchers to submit extended abstracts and posters for ISSQNC 2026.

Featured Workshops:
1. Hands-on Qiskit 1.0 programming on IBM Quantum hardware
2. Neuromorphic spike-based neural network training with Intel Loihi simulators
3. High-speed optical interconnects for supercomputing

All accepted student papers will be indexed in IEEE Xplore. Outstanding student presenters will receive IEEE Travel Grants of $500 each.`,
    categoryId: 'cat-events',
    departmentId: 'dept-ece',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-03T11:00:00Z',
    updatedAt: '2026-11-03T11:00:00Z',
    expiresAt: '2026-11-25T23:59:00Z',
    createdBy: 'Prof. K. Venkatesh',
    viewCount: 1640,
    readCount: 580,
    hasDocument: true,
    documentName: 'IEEE_Symposium_Call_for_Papers.pdf',
    documentType: 'pdf',
    documentSize: '2.4 MB',
    documentUrl: '/docs/ieee_symposium.pdf',
    extractedFields: [],
    importantDates: [
      {
        id: 'date-ieee-1',
        dateType: 'deadline',
        dateValue: '2026-11-25',
        timeValue: '23:59',
        description: 'Submission Deadline for 2-Page Extended Abstracts',
        verificationStatus: 'verified'
      },
      {
        id: 'date-ieee-2',
        dateType: 'event',
        dateValue: '2026-12-12',
        timeValue: '09:00',
        description: 'Symposium Inauguration & Keynote Sessions',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: [
      'Undergraduate, Master, and PhD students in Engineering, Physics, or Mathematics'
    ],
    requiredActions: [
      {
        id: 'act-ieee-1',
        title: 'Submit abstract via Microsoft CMT portal',
        actionType: 'upload',
        deadline: '2026-11-25T23:59:00Z',
        url: 'https://cmt3.research.microsoft.com/ISSQNC2026'
      }
    ],
    contactInfo: {
      name: 'Prof. K. Venkatesh',
      role: 'IEEE Branch Counselor',
      email: 'ieee.chair@university.edu',
      phone: '+1 (555) 234-5672'
    },
    audience: {
      departments: ['dept-ece', 'dept-cse'],
      programs: ['B.Tech Electronics', 'B.Tech Computer Science', 'M.Tech Microelectronics'],
      semesters: [],
      audienceType: 'specific'
    },
    tags: ['IEEE', 'Quantum Computing', 'Neuromorphic', 'Call for Papers', 'ECE', 'CSE']
  },

  // ITEM 11 - DUPLICATE EXAMPLE A (Original vs Duplicate)
  {
    id: 'anc-011',
    title: 'Annual Sports Meet & Inter-Department Athletics Championship 2026: Tryouts Schedule',
    slug: 'annual-sports-meet-tryouts-schedule-2026',
    summary: 'Department of Physical Education announces dates for selection trials in football, basketball, cricket, badminton, and track events for the University Trophy.',
    content: `University Sports Council announces trials for all inter-department sports teams starting 16 November 2026 at the Main University Stadium.
    
All registered students are invited. Kits will be provided during trials. Winners will represent the university at the Inter-University Games in February 2027.`,
    categoryId: 'cat-events',
    departmentId: 'dept-dosa',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-02T10:00:00Z',
    updatedAt: '2026-11-02T10:00:00Z',
    createdBy: 'Prof. Marcus Vance',
    viewCount: 1200,
    readCount: 430,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-sp-1',
        dateType: 'event',
        dateValue: '2026-11-16',
        timeValue: '06:30',
        description: 'Selection Trials Commence at University Sports Complex',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: ['All full-time registered students'],
    requiredActions: [
      {
        id: 'act-sp-1',
        title: 'Report with sports gear and valid ID card at stadium desk',
        actionType: 'attend',
        deadline: '2026-11-16T06:30:00Z'
      }
    ],
    contactInfo: {
      name: 'Director of Physical Education',
      role: 'Sports Council',
      email: 'sports@university.edu',
      phone: '+1 (555) 234-5555'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Sports', 'Athletics', 'Football', 'Basketball', 'DOSA']
  },

  // ITEM 12 - DUPLICATE OF ITEM 11 (For smart duplicate detection demonstration!)
  {
    id: 'anc-012',
    title: 'Inter-Department Annual Athletics Championship & Sports Meet 2026: Trials & Dates',
    slug: 'inter-department-annual-athletics-championship-2026',
    summary: 'Sports Department announces trials for basketball, football, and athletics events starting 16 November at University Stadium.',
    content: `Trial schedules for University Sports Trophy 2026. Students must assemble at 6:30 AM at the Main Sports Pavilion with ID card.
    
Events include Track & Field, Football, Badminton, and Basketball.`,
    categoryId: 'cat-events',
    departmentId: 'dept-dosa',
    importance: 'normal',
    publicationStatus: 'pending_review',
    verificationStatus: 'unverified',
    publishedAt: '2026-11-03T14:20:00Z',
    updatedAt: '2026-11-03T14:20:00Z',
    createdBy: 'Student Sports Secretary',
    viewCount: 42,
    readCount: 12,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-sp-dup-1',
        dateType: 'event',
        dateValue: '2026-11-16',
        timeValue: '06:30',
        description: 'Athletics trials at University Stadium',
        verificationStatus: 'needs_verification'
      }
    ],
    eligibilityRequirements: ['All university students'],
    requiredActions: [],
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Sports', 'Athletics', 'Duplicate Candidate']
  },

  // ITEM 13 - INCOMPLETE / NEEDS VERIFICATION ITEM
  {
    id: 'anc-013',
    title: 'DAAD German Academic Exchange Service Scholarship & Winter Internship Program 2027',
    slug: 'daad-german-exchange-winter-internship-2027',
    summary: 'International Relations Office forwards notification regarding DAAD WISE fellowships for 2nd and 3rd year engineering students with stipend of €934/month.',
    content: `The German Academic Exchange Service (DAAD) invites applications from highly motivated Indian students of engineering and natural sciences for the Working Internships in Science and Engineering (WISE) program.

Selected interns will carry out a 2 to 3-month research stay at state-funded higher education institutions or research institutes in Germany.

Important Note: Exact online portal deadline requires confirmation from DAAD New Delhi Regional Office portal as circular reflects dual conflicting timestamps (15 Dec vs 31 Dec).`,
    categoryId: 'cat-scholarships',
    departmentId: 'dept-res',
    importance: 'high',
    publicationStatus: 'published',
    verificationStatus: 'partially_verified',
    publishedAt: '2026-11-08T16:00:00Z',
    updatedAt: '2026-11-08T16:00:00Z',
    expiresAt: '2026-12-31T23:59:00Z',
    createdBy: 'Dr. Helen Zhou',
    viewCount: 2150,
    readCount: 890,
    hasDocument: true,
    documentName: 'DAAD_WISE_Guidelines_Scan_2026.pdf',
    documentType: 'pdf',
    documentSize: '820 KB',
    documentUrl: '/docs/daad_wise_scan.pdf',
    extractedFields: [
      {
        id: 'fld-daad-1',
        fieldName: 'Monthly Living Allowance',
        extractedValue: '€934 Euros monthly plus health insurance & travel subsidy',
        confidence: 0.95,
        sourceReference: 'Section 3, Financial Grant Support',
        verificationStatus: 'verified'
      },
      {
        id: 'fld-daad-2',
        fieldName: 'Application Closing Deadline',
        extractedValue: '15 December 2026 (Uncertain: document footnote mentions 31 Dec)',
        confidence: 0.54,
        sourceReference: 'Footnote on Page 4 vs Header on Page 1',
        verificationStatus: 'needs_verification'
      }
    ],
    importantDates: [
      {
        id: 'date-daad-1',
        dateType: 'deadline',
        dateValue: '2026-12-15',
        timeValue: '23:59',
        description: 'Estimated Application Closing (Needs Institutional Verification)',
        verificationStatus: 'needs_verification'
      }
    ],
    eligibilityRequirements: [
      '5th or 6th semester undergraduate student in B.Tech / B.E.',
      'Aggregate score of >= 85% or CGPA >= 8.5/10',
      'Invitation letter from German host professor'
    ],
    requiredActions: [
      {
        id: 'act-daad-1',
        title: 'Review DAAD Portal and obtain German Host Professor confirmation',
        actionType: 'form',
        deadline: '2026-12-15T23:59:00Z',
        url: 'https://www.daad.de/wise'
      }
    ],
    contactInfo: {
      name: 'International Affairs Office',
      role: 'Global Exchange Desk',
      email: 'international@university.edu',
      phone: '+1 (555) 234-5900'
    },
    audience: {
      departments: ['dept-cse', 'dept-ece', 'dept-mech'],
      programs: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical'],
      semesters: [5, 6],
      audienceType: 'specific'
    },
    tags: ['DAAD', 'Germany', 'Research Fellowship', 'Needs Verification', 'International']
  },

  // ITEM 14 - PENDING REVIEW ITEM FOR ADMIN WORKFLOW
  {
    id: 'anc-014',
    title: 'Goldman Sachs 2027 Engineering Analyst & Quantitative Strategy Internship Assessment',
    slug: 'goldman-sachs-2027-analyst-internship',
    summary: 'Central Placement Office submits unapproved draft circular regarding Goldman Sachs campus test scheduled for early December.',
    content: `Goldman Sachs Engineering Division announces hiring for Summer 2027 Quantitative Strategist and Software Engineering internships.

Eligibility criteria: B.Tech (All engineering branches) with CGPA >= 7.0.
Assessment includes aptitude, programming in C++/Java/Python, and financial mathematics.`,
    categoryId: 'cat-placements',
    departmentId: 'dept-tp',
    importance: 'high',
    publicationStatus: 'pending_review',
    verificationStatus: 'partially_verified',
    publishedAt: '2026-11-11T16:00:00Z',
    updatedAt: '2026-11-11T16:00:00Z',
    createdBy: 'Placement Coordinator',
    viewCount: 15,
    readCount: 4,
    hasDocument: true,
    documentName: 'GoldmanSachs_Internship_Notification_Draft.docx',
    documentType: 'docx',
    documentSize: '450 KB',
    documentUrl: '/docs/gs_draft.docx',
    extractedFields: [
      {
        id: 'fld-gs-1',
        fieldName: 'Test Date',
        extractedValue: '05 December 2026 (Unconfirmed by corporate recruiter)',
        confidence: 0.62,
        sourceReference: 'Email attachment snippet',
        verificationStatus: 'needs_verification'
      }
    ],
    importantDates: [
      {
        id: 'date-gs-1',
        dateType: 'deadline',
        dateValue: '2026-11-28',
        timeValue: '17:00',
        description: 'Student Resume Submission on T&P Portal',
        verificationStatus: 'needs_verification'
      }
    ],
    eligibilityRequirements: ['Engineering students, CGPA >= 7.0'],
    requiredActions: [],
    audience: {
      departments: ['dept-cse', 'dept-ece', 'dept-mech'],
      programs: ['ALL'],
      semesters: [6],
      audienceType: 'specific'
    },
    tags: ['Goldman Sachs', 'Placements', 'Pending Review', 'Finance']
  },

  // ITEM 15 - AEROSPACE LAB CIRCULAR
  {
    id: 'anc-015',
    title: 'Wind Tunnel & Supersonic Propulsion Research Facility: Safety Certification Workshop',
    slug: 'wind-tunnel-safety-certification-workshop-2026',
    summary: 'Department of Mechanical Engineering mandates laser safety and high-pressure fluid dynamics certification for all students operating the Mach-2 supersonic tunnel.',
    content: `All undergraduate and postgraduate researchers intending to utilize the Subsonic and Supersonic Wind Tunnel facilities during Spring 2027 must complete the mandatory 1-day safety certification training.

Session covers emergency decompression handling, cryogenic coolant management, optical PIV laser safety, and hazardous waste disposal.`,
    categoryId: 'cat-research',
    departmentId: 'dept-mech',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-01T09:00:00Z',
    updatedAt: '2026-11-01T09:00:00Z',
    createdBy: 'Prof. Vikram Malhotra',
    viewCount: 780,
    readCount: 290,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-mech-1',
        dateType: 'event',
        dateValue: '2026-11-29',
        timeValue: '10:00',
        description: 'Mandatory Lab Safety Workshop & Practical Drill',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: ['Mechanical, Aerospace, and Materials engineering students'],
    requiredActions: [
      {
        id: 'act-mech-1',
        title: 'Register name with Mechanical Lab Superintendent',
        actionType: 'form',
        deadline: '2026-11-25T17:00:00Z'
      }
    ],
    contactInfo: {
      name: 'Prof. Vikram Malhotra',
      role: 'Head of Department',
      email: 'head.mech@university.edu',
      phone: '+1 (555) 234-5673'
    },
    audience: {
      departments: ['dept-mech'],
      programs: ['B.Tech Mechanical', 'M.Tech Thermofluids'],
      semesters: [4, 6, 8],
      audienceType: 'specific'
    },
    tags: ['Mechanical', 'Lab Safety', 'Aerospace', 'Workshop']
  },

  // ITEM 16 - MBA VENTURE FINANCING PITCH
  {
    id: 'anc-016',
    title: 'Campus Angel Investment & Venture Pitch Competition: $50,000 Seed Equity Pool',
    slug: 'campus-angel-investment-pitch-competition-2026',
    summary: 'School of Management Studies partners with University Alumni Syndicate to fund 3 student-led ventures with seed grants and free legal incorporation.',
    content: `The Center for Entrepreneurial Development invites pitch decks from student founders across engineering, business, and humanities.

Winners will receive up to $25,000 in non-dilutive grant capital, 6 months of incubator workspace at the Innovation Pavilion, and dedicated mentorship from venture capital partners.`,
    categoryId: 'cat-competitions',
    departmentId: 'dept-sms',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-03T15:00:00Z',
    updatedAt: '2026-11-03T15:00:00Z',
    createdBy: 'Dr. Evelyn Reed',
    viewCount: 1420,
    readCount: 510,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-sms-1',
        dateType: 'deadline',
        dateValue: '2026-12-10',
        timeValue: '23:59',
        description: '10-Slide Investor Deck Submission Closes',
        verificationStatus: 'verified'
      },
      {
        id: 'date-sms-2',
        dateType: 'event',
        dateValue: '2027-01-15',
        timeValue: '14:00',
        description: 'Live Demo Day & Final Shark-Tank Pitch',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: ['At least one co-founder must be a currently enrolled university student'],
    requiredActions: [
      {
        id: 'act-sms-1',
        title: 'Submit pitch deck PDF on Entrepreneurship portal',
        actionType: 'upload',
        deadline: '2026-12-10T23:59:00Z',
        url: 'https://startup.university.edu/pitch'
      }
    ],
    contactInfo: {
      name: 'Dr. Evelyn Reed',
      role: 'Dean of Management Studies',
      email: 'dean.sms@university.edu',
      phone: '+1 (555) 234-5430'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Startup', 'Venture Capital', 'Entrepreneurship', 'Pitch', 'SMS']
  },

  // ITEM 17 - ROBOTICS SOCIETY RECRUITMENT
  {
    id: 'anc-017',
    title: 'Autonomous Robotics Society (ARS): Autumn Recruitment for RoboSub & Formula Student EV',
    slug: 'autonomous-robotics-society-recruitment-2026',
    summary: 'Student robotics team opens inductions for Mechanical Fabrication, Computer Vision, Embedded Hardware, and Sponsorship marketing divisions.',
    content: `Want to build autonomous underwater vehicles and electric race cars? ARS is recruiting passionate 1st, 2nd, and 3rd-year students. No prior experience required for junior hardware apprentices; training will be provided.`,
    categoryId: 'cat-clubs',
    departmentId: 'dept-dosa',
    importance: 'normal',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-04T18:00:00Z',
    updatedAt: '2026-11-04T18:00:00Z',
    createdBy: 'Student Council',
    viewCount: 1980,
    readCount: 720,
    hasDocument: false,
    extractedFields: [],
    importantDates: [
      {
        id: 'date-ars-1',
        dateType: 'deadline',
        dateValue: '2026-11-19',
        timeValue: '20:00',
        description: 'ARS Induction Form Closes',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: ['1st, 2nd, and 3rd year undergraduate students'],
    requiredActions: [
      {
        id: 'act-ars-1',
        title: 'Fill out induction interest form',
        actionType: 'form',
        deadline: '2026-11-19T20:00:00Z'
      }
    ],
    contactInfo: {
      name: 'Karan Mehra',
      role: 'Captain, ARS',
      email: 'robotics@university.edu'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [1, 2, 3, 4, 5, 6],
      audienceType: 'all'
    },
    tags: ['Robotics', 'Clubs', 'Formula Student', 'EV', 'Hardware']
  },

  // ITEM 18 - UNIVERSITY HOLIDAY CIRCULAR
  {
    id: 'anc-018',
    title: 'University Holiday Schedule for Thanksgiving, Winter Break, and New Year 2027',
    slug: 'university-holiday-schedule-winter-break-2026-2027',
    summary: 'Registrar notifies the campus community regarding university closure dates, library skeletal hours, and emergency security contacts during break.',
    content: `The University Administrative Offices, teaching departments, and centralized libraries will remain closed on the following statutory holidays:
- Thanksgiving Recess: 26 November to 29 November 2026
- Winter Recess: 24 December 2026 to 03 January 2027

Emergency medical clinic and security dispatch lines remain operational 24/7 at +1 (555) 234-9999.`,
    categoryId: 'cat-circulars',
    departmentId: 'dept-exam',
    importance: 'low',
    publicationStatus: 'published',
    verificationStatus: 'verified',
    publishedAt: '2026-11-01T08:00:00Z',
    updatedAt: '2026-11-01T08:00:00Z',
    createdBy: 'Office of the Registrar',
    viewCount: 5200,
    readCount: 3800,
    hasDocument: true,
    documentName: 'Registrar_Holiday_Schedule_Winter.pdf',
    documentType: 'pdf',
    documentSize: '620 KB',
    documentUrl: '/docs/holidays.pdf',
    extractedFields: [],
    importantDates: [
      {
        id: 'date-hol-1',
        dateType: 'event',
        dateValue: '2026-11-26',
        description: 'Thanksgiving Break Commences',
        verificationStatus: 'verified'
      },
      {
        id: 'date-hol-2',
        dateType: 'event',
        dateValue: '2026-12-24',
        description: 'Winter Vacation Commences',
        verificationStatus: 'verified'
      }
    ],
    eligibilityRequirements: ['All faculty, staff, and students'],
    requiredActions: [],
    contactInfo: {
      name: 'Registrar Office',
      role: 'General Administration',
      email: 'registrar@university.edu',
      phone: '+1 (555) 234-5000'
    },
    audience: {
      departments: ['ALL'],
      programs: ['ALL'],
      semesters: [],
      audienceType: 'all'
    },
    tags: ['Holidays', 'Circular', 'Campus Notice', 'Winter Break']
  }
];

// RELATIONSHIPS CONNECTING NOTICES, DEPARTMENTS, EVENTS, DEADLINES
export const INITIAL_RELATIONSHIPS: AnnouncementRelationship[] = [
  {
    id: 'rel-1',
    sourceId: 'anc-001', // Google Drive
    targetId: 'anc-007', // Microsoft Drive
    relationshipType: 'related_to',
    relationshipSource: 'matching',
    confidence: 0.94,
    verificationStatus: 'verified',
    description: 'Both represent premier tier-1 corporate campus placement opportunities for CSE/ECE graduating cohorts with shared T&P recruitment policy rules.',
    createdAt: '2026-11-10T12:00:00Z'
  },
  {
    id: 'rel-2',
    sourceId: 'anc-001', // Google Drive
    targetId: 'anc-004', // HackCampus Hackathon
    relationshipType: 'references',
    relationshipSource: 'extracted',
    confidence: 0.88,
    verificationStatus: 'verified',
    description: 'Google DeepMind is the premier Title Sponsor for HackCampus 2026, offering fast-track placement interviews to hackathon track winners.',
    createdAt: '2026-11-10T12:30:00Z'
  },
  {
    id: 'rel-3',
    sourceId: 'anc-002', // End-Sem Exam
    targetId: 'anc-008', // Elective Registration
    relationshipType: 'applies_to',
    relationshipSource: 'publisher',
    confidence: 0.99,
    verificationStatus: 'verified',
    description: 'Passing current registered Autumn subjects is a prerequisite for advancing to Spring 2027 elective selections.',
    createdAt: '2026-11-11T11:15:00Z'
  },
  {
    id: 'rel-4',
    sourceId: 'anc-005', // GPU HPC Cluster
    targetId: 'anc-001', // Google Drive
    relationshipType: 'related_to',
    relationshipSource: 'matching',
    confidence: 0.78,
    verificationStatus: 'suggested',
    description: 'Research fellows working on GPU HPC deep learning models match Google DeepMind candidate project requirements.',
    createdAt: '2026-11-09T10:00:00Z'
  },
  {
    id: 'rel-5',
    sourceId: 'anc-003', // MCM Scholarship
    targetId: 'anc-013', // DAAD Exchange
    relationshipType: 'related_to',
    relationshipSource: 'matching',
    confidence: 0.82,
    verificationStatus: 'verified',
    description: 'Students receiving MCM tuition aid are eligible to apply for supplementary DAAD international travel grants.',
    createdAt: '2026-11-09T14:00:00Z'
  },
  {
    id: 'rel-6',
    sourceId: 'anc-010', // IEEE Symposium
    targetId: 'anc-005', // GPU HPC Cluster
    relationshipType: 'requires_participation',
    relationshipSource: 'publisher',
    confidence: 0.91,
    verificationStatus: 'verified',
    description: 'Accepted paper authors at the IEEE Symposium receive prioritized compute reservations on the university cluster.',
    createdAt: '2026-11-08T15:00:00Z'
  },
  {
    id: 'rel-7',
    sourceId: 'anc-011', // Sports Meet
    targetId: 'anc-012', // Sports Meet Dup
    relationshipType: 'supersedes',
    relationshipSource: 'matching',
    confidence: 0.97,
    verificationStatus: 'suggested',
    description: 'Potential duplicate detected: Highly matching titles, matching date (16 Nov), and sports events.',
    createdAt: '2026-11-03T15:00:00Z'
  },
  {
    id: 'rel-8',
    sourceId: 'anc-006', // Hostel Room Allotment
    targetId: 'anc-018', // Holiday Schedule
    relationshipType: 'happens_on',
    relationshipSource: 'extracted',
    confidence: 0.95,
    verificationStatus: 'verified',
    description: 'Hostel room surrender date (18 Dec) is aligned directly before the start of the winter campus shutdown.',
    createdAt: '2026-11-06T10:00:00Z'
  },
  {
    id: 'rel-9',
    sourceId: 'anc-009', // Convocation
    targetId: 'anc-002', // Exams
    relationshipType: 'requires_participation',
    relationshipSource: 'publisher',
    confidence: 0.99,
    verificationStatus: 'verified',
    description: 'Graduand degree validation requires zero pending exam grades from the Controller of Examinations.',
    createdAt: '2026-11-04T12:00:00Z'
  },
  {
    id: 'rel-10',
    sourceId: 'anc-016', // Venture Competition
    targetId: 'anc-004', // HackCampus
    relationshipType: 'related_to',
    relationshipSource: 'matching',
    confidence: 0.85,
    verificationStatus: 'verified',
    description: 'HackCampus winning software prototypes are fast-tracked into the SMS Venture Pitch pool for $25k seed grant consideration.',
    createdAt: '2026-11-09T18:00:00Z'
  }
];

// DUPLICATE DETECTIONS FOR ADMIN REVIEW
export const INITIAL_DUPLICATES: DuplicateCluster[] = [
  {
    id: 'dup-001',
    titleMatchScore: 0.94,
    announcementIds: ['anc-011', 'anc-012'],
    reason: 'Identical trial dates (16 Nov 2026), matching location (University Stadium), and overlapping title keywords ("Sports Meet", "Athletics Championship").',
    status: 'detected',
    createdAt: '2026-11-03T15:00:00Z'
  }
];

// USER PROFILES FOR DEMO ROLE SWITCHER
export const DEMO_PROFILES: Record<string, UserProfile> = {
  student: {
    id: 'usr-student-01',
    fullName: 'Priya Sharma',
    role: 'student',
    email: 'priya.s@student.university.edu',
    departmentId: 'dept-cse',
    program: 'B.Tech Computer Science',
    semester: 6,
    followedDepartments: ['dept-cse', 'dept-tp', 'dept-exam'],
    followedCategories: ['cat-placements', 'cat-exams', 'cat-competitions']
  },
  publisher: {
    id: 'usr-publisher-01',
    fullName: 'Dr. Anand Verma',
    role: 'publisher',
    email: 'placements@university.edu',
    departmentId: 'dept-tp',
    program: 'Faculty / T&P Administration',
    semester: 0,
    followedDepartments: ['dept-tp', 'dept-cse', 'dept-ece'],
    followedCategories: ['cat-placements', 'cat-academics']
  },
  admin: {
    id: 'usr-admin-01',
    fullName: 'Dean Arthur Vance',
    role: 'admin',
    email: 'registrar@university.edu',
    departmentId: 'dept-exam',
    program: 'Office of the Academic Registrar',
    semester: 0,
    followedDepartments: ['dept-cse', 'dept-tp', 'dept-exam', 'dept-dosa'],
    followedCategories: ['cat-circulars', 'cat-exams', 'cat-placements']
  }
};

// INITIAL PERSONAL REMINDERS FOR STUDENT
export const INITIAL_REMINDERS: PersonalReminder[] = [
  {
    id: 'rem-1',
    userId: 'usr-student-01',
    announcementId: 'anc-001',
    title: 'Google Fellowship Portal Registration Deadline',
    reminderDate: '2026-11-18',
    reminderTime: '17:00',
    status: 'pending',
    createdAt: '2026-11-11T08:00:00Z'
  },
  {
    id: 'rem-2',
    userId: 'usr-student-01',
    announcementId: 'anc-002',
    title: 'Download and Print Autumn Exam Hall Ticket',
    reminderDate: '2026-11-26',
    reminderTime: '20:00',
    status: 'pending',
    createdAt: '2026-11-11T12:00:00Z'
  },
  {
    id: 'rem-3',
    userId: 'usr-student-01',
    announcementId: 'anc-004',
    title: 'Submit HackCampus 2026 Team Idea Abstract',
    reminderDate: '2026-11-24',
    reminderTime: '22:00',
    status: 'completed',
    createdAt: '2026-11-10T09:00:00Z'
  }
];

// USER NOTIFICATIONS
export const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-student-01',
    announcementId: 'anc-001',
    type: 'urgent_announcement',
    title: 'Google Placement Portal Registration Closing Soon',
    message: 'Only 7 days remaining to submit your resume for Google Summer 2026 recruitment.',
    createdAt: '2026-11-11T09:00:00Z',
    importance: 'urgent'
  },
  {
    id: 'notif-2',
    userId: 'usr-student-01',
    announcementId: 'anc-002',
    type: 'deadline',
    title: 'End-Sem Hall Tickets Active from 20 November',
    message: 'Verify your 75% attendance quota before portal generation opens.',
    createdAt: '2026-11-11T11:30:00Z',
    importance: 'high'
  },
  {
    id: 'notif-3',
    userId: 'usr-student-01',
    announcementId: 'anc-003',
    type: 'department_notice',
    title: 'MCM Scholarship Applications Now Active',
    message: 'Dean of Student Affairs has opened endowment financial aid submissions.',
    createdAt: '2026-11-09T14:00:00Z',
    importance: 'normal'
  }
];

// ANNOUNCEMENT VERSION HISTORY (For Change Detection Feature)
export const INITIAL_VERSIONS: AnnouncementVersion[] = [
  {
    id: 'ver-001',
    announcementId: 'anc-001',
    versionNumber: 1,
    previousContent: 'Google Fellowship drive announced. Assessment date tentatively 25 November.',
    updatedContent: 'Proctored coding diagnostic finalized for 21 November 2026 (10:00 AM) on HackerRank.',
    changeSummary: 'Confirmed diagnostic assessment date and updated minimum CGPA requirements from 7.5 to 8.0 per corporate guidelines.',
    updatedBy: 'Dr. Anand Verma',
    createdAt: '2026-11-11T14:30:00Z'
  }
];

