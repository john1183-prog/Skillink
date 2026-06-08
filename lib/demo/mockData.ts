import type { AssessmentQuestion, CareerPath, Opportunity, VerifiedSkill, RoadmapMilestone } from '@/types'

export const pythonAssessment: AssessmentQuestion[] = [
  { id: 'q1',  question: "What is the output of: print(type([]))?",                           options: ["<class 'list'>", "<class 'array'>", "list", "TypeError"],                                                      correctIndex: 0, explanation: "[] creates an empty list. type() returns the class." },
  { id: 'q2',  question: "Which method adds an element to the end of a list?",                options: ["add()", "insert()", "append()", "push()"],                                                                       correctIndex: 2, explanation: "append() adds to the end. insert() requires an index." },
  { id: 'q3',  question: "What does len('Hello') return?",                                    options: ["4", "5", "6", "TypeError"],                                                                                      correctIndex: 1, explanation: "'Hello' has 5 characters." },
  { id: 'q4',  question: "Which of these is a valid Python dictionary?",                       options: ['{"name": "Amara", "age": 20}', '["name", "Amara"]', "(name: Amara)", "{name = Amara}"],                       correctIndex: 0, explanation: "Dictionaries use {key: value} pairs with colons." },
  { id: 'q5',  question: "What is the correct syntax for a function in Python?",              options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"],                                     correctIndex: 1, explanation: "Python uses the 'def' keyword." },
  { id: 'q6',  question: "What does range(1, 5) generate?",                                   options: ["[1,2,3,4,5]", "[1,2,3,4]", "[0,1,2,3,4]", "[1,5]"],                                                           correctIndex: 1, explanation: "range(start, stop) excludes the stop value." },
  { id: 'q7',  question: "How do you check if a key exists in a dictionary d?",               options: ["d.has('key')", "'key' in d", "d.contains('key')", "d.exists('key')"],                                          correctIndex: 1, explanation: "The 'in' operator checks dictionary key existence." },
  { id: 'q8',  question: "What is the output of: print(10 // 3)?",                            options: ["3.33", "3", "4", "3.0"],                                                                                        correctIndex: 1, explanation: "// is floor division — returns integer quotient." },
  { id: 'q9',  question: "Which statement handles exceptions in Python?",                      options: ["catch/throw", "try/except", "try/catch", "error/handle"],                                                       correctIndex: 1, explanation: "Python uses try/except for exception handling." },
  { id: 'q10', question: "What does [x*2 for x in range(3)] produce?",                        options: ["[0,2,4]", "[1,2,3]", "[2,4,6]", "[0,1,2]"],                                                                   correctIndex: 0, explanation: "range(3) gives [0,1,2]. Multiplied by 2 gives [0,2,4]." },
]

export const mockCareerPaths: CareerPath[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Extract strategic insights from large datasets to drive decisions in Nigerian fintech and enterprise sectors.',
    matchReason: 'Your EEE background in signal processing maps directly to data pipeline architecture.',
    demandScore: 0.88,
    matchPercentage: 78,
    averageSalary: '₦350,000 – ₦600,000/mo',
    requiredSkills: ['Python', 'SQL', 'Data Visualization', 'Statistical Analysis', 'Machine Learning Basics'],
    skillGaps: [
      { skillName: 'Python Programming',  priority: 'High',   currentLevel: 20, requiredLevel: 85, recommendedResource: { title: 'Python for Data Analysis — FreeCodeCamp', url: 'https://freecodecamp.org' } },
      { skillName: 'SQL & Databases',     priority: 'High',   currentLevel: 45, requiredLevel: 75, recommendedResource: { title: 'SQL Crash Course — W3Schools', url: 'https://w3schools.com/sql' } },
      { skillName: 'Data Visualization',  priority: 'Medium', currentLevel: 35, requiredLevel: 80, recommendedResource: { title: 'Tableau Public Training', url: 'https://public.tableau.com' } },
    ],
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems Engineer',
    description: "Design firmware and hardware interfaces for IoT devices powering Africa's smart infrastructure.",
    matchReason: 'Your EEE core modules in microcontrollers and circuit design are directly transferable.',
    demandScore: 0.75,
    matchPercentage: 65,
    averageSalary: '₦280,000 – ₦520,000/mo',
    requiredSkills: ['C/C++', 'Microcontrollers', 'RTOS', 'PCB Design', 'Firmware Development'],
    skillGaps: [
      { skillName: 'RTOS Fundamentals',   priority: 'High',   currentLevel: 15, requiredLevel: 80, recommendedResource: { title: 'FreeRTOS Official Docs', url: 'https://freertos.org' } },
      { skillName: 'Firmware Development',priority: 'Medium', currentLevel: 30, requiredLevel: 75, recommendedResource: { title: 'Arduino & ESP32 Projects', url: 'https://arduino.cc' } },
    ],
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Specialist',
    description: "Engineer solar and wind energy systems addressing Nigeria's power infrastructure challenges.",
    matchReason: 'Power systems modules in your EEE curriculum align with grid-scale renewable projects.',
    demandScore: 0.70,
    matchPercentage: 58,
    averageSalary: '₦250,000 – ₦480,000/mo',
    requiredSkills: ['Power Systems', 'AutoCAD', 'Energy Auditing', 'Solar PV Design', 'Grid Analysis'],
    skillGaps: [
      { skillName: 'Solar PV Design', priority: 'High', currentLevel: 10, requiredLevel: 85, recommendedResource: { title: 'NABCEP PV Associate Study', url: 'https://nabcep.org' } },
    ],
  },
]

export const recommendations = mockCareerPaths

export const mockOpportunities: Opportunity[] = [
  {
    id: 'flutterwave-intern',
    title: 'Data Analytics Intern',
    company: 'Flutterwave, Lagos',
    type: 'Internship',
    description: 'Work with Africa\'s leading fintech to analyze payment transaction data and build dashboards for product teams.',
    tags: ['Python', 'SQL', 'Tableau', 'Remote-friendly'],
    matchScore: 82,
    applicationUrl: 'https://flutterwave.com/careers',
  },
  {
    id: 'google-scholarship',
    title: 'Google Africa Developer Scholarship',
    company: 'Google & Andela',
    type: 'Scholarship',
    description: 'A 6-month intensive program covering data, mobile, and cloud tracks. Fully funded with stipend.',
    tags: ['Data Track', 'Scholarship', 'Stipend', 'Certificate'],
    matchScore: 91,
    applicationUrl: 'https://andela.com/alc',
  },
  {
    id: 'hng-internship',
    title: 'HNG Internship 12',
    company: 'HNG Tech',
    type: 'Bootcamp',
    description: "Nigeria's largest remote internship program. Build real products and compete for placement at top Nigerian tech companies.",
    tags: ['Remote', 'Competitive', 'Portfolio', 'Networking'],
    matchScore: 76,
    applicationUrl: 'https://hng.tech',
  },
]

export const opportunities = mockOpportunities

export const mockVerifiedSkills: VerifiedSkill[] = []

export const mockRoadmapMilestones: RoadmapMilestone[] = [
  { id: 'm1', title: 'Complete Career Compass Assessment',    desc: 'Identify your ideal career path through AI-powered personality and aptitude analysis.',        status: 'completed',  relatedSkills: ['Self-Assessment'] },
  { id: 'm2', title: 'Verify Python Programming',           desc: 'Pass the timed Python assessment to earn your first verified skill badge.',                     status: 'in_progress',relatedSkills: ['Python Programming'] },
  { id: 'm3', title: 'Complete SQL & Databases Module',     desc: 'Prove SQL proficiency through structured query challenges.',                                     status: 'locked',     relatedSkills: ['SQL & Databases'] },
  { id: 'm4', title: 'Data Visualization Project',          desc: 'Build a dashboard using real Nigerian economic data and submit for review.',                     status: 'locked',     relatedSkills: ['Data Visualization'] },
  { id: 'm5', title: 'Apply to 3 Matched Opportunities',   desc: 'Use your verified passport to apply to curated internships and scholarships.',                   status: 'locked',     relatedSkills: ['Python Programming', 'SQL & Databases'] },
]
