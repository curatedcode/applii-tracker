import { FullApplicationType } from "@/src/utils/customVariables";

export const needToApplyMocks: FullApplicationType[] = [
  {
    id: 1,
    position: "Marketing Manager",
    company: "Coca-Cola",
    postingURL: "example.com",
    status: "needToApply",
    contacts: [
      {
        name: "Alice Jones",
        phone: "222-333-4444",
        email: "alicejones@examples.com",
        position: "Accountant",
      },
      {
        name: "Bob Smith",
        phone: "222-333-4444",
        email: "bobsmith@examples.com",
        position: "Software Engineer",
      },
    ],
    notes: [
      {
        title: "Cover letter draft",
        body: "I have drafted a cover letter for the position of senior web developer at ABC Inc. I have explained why I am interested in working for them, how I can contribute to their goals, and what makes me a good fit for their team. I have also attached some samples of my previous work and testimonials from my clients.",
      },
      {
        title: "Interview preperation",
        body: `I have an interview scheduled for next week with ABC Inc. I need to prepare for some common questions, such as:
      - Tell me about yourself and your background.
      - What are some of the projects that you are most proud of and why?
      - What are some of the challenges that you have faced and how did you overcome them?
      - How do you approach web development and what are some of the best practices that you follow?
      - How do you collaborate with other developers and stakeholders?
      - How do you learn new technologies and keep yourself updated?
      `,
      },
    ],
    dateCreated: "2023-06-13T04:00:00.000Z",
    dateModified: "2023-06-13T06:00:00.000Z",
  },
  {
    id: 2,
    position: "Project Coordinator",
    company: "UNICEF",
    status: "needToApply",
    contacts: [
      {
        name: "Carol Lee",
        phone: "222-333-4444",
        email: "carollee@examples.com",
        position: "Marketing Manager",
      },
    ],
    notes: [],
    dateCreated: "2023-08-28T04:00:00.000Z",
    dateModified: "2023-08-28T06:00:00.000Z",
  },
  {
    id: 3,
    position: "Software Engineer",
    company: "Daylight Solutions",
    status: "needToApply",
    contacts: [
      {
        name: "James Dalton",
        phone: "222-333-4444",
        email: "jamesdalton@examples.com",
        position: "Recruiter",
      },
    ],
    notes: [],
    dateCreated: "2023-07-28T04:00:00.000Z",
    dateModified: "2023-11-12T20:00:00.000Z",
  },
  {
    id: 4,
    position: "Project Manager",
    company: "Mason Consulting",
    status: "needToApply",
    contacts: [],
    notes: [],
    dateCreated: "2023-04-28T04:00:00.000Z",
    dateModified: "2023-10-12T20:00:00.000Z",
  },
  {
    id: 5,
    position: "Senior Data Analyst",
    company: "Acme Inc.",
    status: "needToApply",
    contacts: [
      {
        name: "Liam Williams",
        phone: "222-333-4444",
        email: "liamwilliams@examples.com",
        position: "Chef",
      },
      {
        name: "Mia Rodriguez",
        phone: "222-333-4444",
        email: "miarodriguez@examples.com",
        position: "Social Worker",
      },
    ],
    notes: [
      {
        title: "Salary negotiation",
        body: `I have received an offer letter from ABC Inc. with a salary of $80,000 per year. I think this is a fair offer, but I would like to negotiate for a higher amount, based on my research and the market value. I have prepared a counteroffer of $85,000 per year, with some supporting reasons, such as:
      - I have more than five years of experience in web development, with a proven track record of delivering high-quality and innovative solutions.
      - I have skills and expertise in some of the latest and most in-demand technologies, such as React, Django, and Power BI.
      - I have received positive feedback and recognition from my previous employers and clients, as well as some awards and certifications.
      `,
      },
    ],
    dateCreated: "2023-04-28T04:00:00.000Z",
    dateModified: "2023-10-12T20:00:00.000Z",
  },
];

export const appliedMocks: FullApplicationType[] = [
  {
    id: 6,
    position: "Data Analyst",
    company: "Netflix",
    postingURL: "example.com",
    status: "applied",
    notes: [
      {
        title: "Thank you email",
        body: "I have sent a thank you email to the hiring manager after the interview. I have thanked them for their time and consideration, reiterated my interest and enthusiasm for the position, and highlighted some of the key points that we discussed. I have also asked them about the next steps and the timeline for the hiring process.",
      },
    ],
    dateCreated: "2023-10-08T04:00:00.000Z",
    dateModified: "2023-10-08T06:00:00.000Z",
    dateApplied: "2023-10-10T04:00:00.000Z",
  },
  {
    id: 7,
    position: "Accountant",
    company: "Deloitte",
    status: "applied",
    contacts: [
      {
        name: "David Chen",
        phone: "222-333-4444",
        email: "davidchen@examples.com",
        position: "Data Analyst",
      },
      {
        name: "Emma Wilson",
        phone: "222-333-4444",
        email: "emmawilson@examples.com",
        position: "Teacher",
      },
      {
        name: "Frank Miller",
        phone: "222-333-4444",
        email: "frankmiller@examples.com",
        position: "Lawyer",
      },
    ],
    notes: [
      {
        title: "Salary negotiation",
        body: `I have received an offer letter from ABC Inc. with a salary of $80,000 per year. I think this is a fair offer, but I would like to negotiate for a higher amount, based on my research and the market value. I have prepared a counteroffer of $85,000 per year, with some supporting reasons, such as:
        - I have more than five years of experience in web development, with a proven track record of delivering high-quality and innovative solutions.
        - I have skills and expertise in some of the latest and most in-demand technologies, such as React, Django, and Power BI.
        - I have received positive feedback and recognition from my previous employers and clients, as well as some awards and certifications.
        `,
      },
      {
        title: "Acceptance letter",
        body: "I have decided to accept the offer from ABC Inc. and join their team as a senior web developer. I have written an acceptance letter to the hiring manager, expressing my gratitude and excitement for the opportunity. I have also confirmed the details of the offer, such as the salary, benefits, start date, and reporting structure. I have asked them to send me the official contract and any other documents that I need to sign.",
      },
      {
        title: "Resignation letter",
        body: "I have written a resignation letter to my current employer, informing them of my decision to leave the company and pursue a new opportunity. I have thanked them for the support and guidance that they have provided me during my tenure, and highlighted some of the achievements and learnings that I have gained. I have also assured them of my cooperation and assistance during the transition period, and offered to train my replacement and hand over my responsibilities.",
      },
    ],
    dateCreated: "2023-07-17T04:00:00.000Z",
    dateModified: "2023-07-17T06:00:00.000Z",
    dateApplied: "2023-07-22T04:00:00.000Z",
  },
  {
    id: 8,
    position: "Graphic Designer",
    company: "Adobe",
    status: "applied",
    contacts: [
      {
        name: "Grace Kim",
        phone: "222-333-4444",
        email: "gracekim@examples.com",
        position: "Nurse",
      },
      {
        name: "Henry Brown",
        phone: "222-333-4444",
        email: "henrybrown@examples.com",
        position: "Sales Representative",
      },
      {
        name: "Isabella Garcia",
        phone: "222-333-4444",
        email: "isabellagarcia@examples.com",
        position: "Graphic Designer",
      },
    ],
    notes: [],
    dateCreated: "2023-09-03T04:00:00.000Z",
    dateModified: "2023-09-03T06:00:00.000Z",
    dateApplied: "2023-09-05T04:00:00.000Z",
  },
];

export const interviewingMocks: FullApplicationType[] = [
  {
    id: 9,
    position: "Human Resources Specialist",
    company: "Amazon",
    postingURL: "example.com",
    status: "interviewing",
    contacts: [
      {
        name: "Jack Taylor",
        phone: "222-333-4444",
        email: "jacktaylor@examples.com",
        position: "Project Manager",
      },
      {
        name: "Kelly Johnson",
        phone: "222-333-4444",
        email: "kellyjohnson@examples.com",
        position: "Journalist",
      },
    ],
    notes: [
      {
        title: "Farewell email",
        body: "I have sent a farewell email to my colleagues and coworkers, announcing my departure and expressing my appreciation and gratitude for their friendship and collaboration. I have shared some of the memorable moments and experiences that we have had together, and wished them all the best for their future endeavors. I have also provided them with my personal contact information, and invited them to stay in touch.",
      },
      {
        title: "Linkedin update",
        body: "I have updated my LinkedIn profile with my new job title and company name. I have also added a summary of my role and responsibilities, and some of the skills and technologies that I will be using. I have also updated my headline and photo, and turned on the open to work feature, to showcase my availability and interest for new opportunities.",
      },
    ],
    dateCreated: "2023-05-22T04:00:00.000Z",
    dateModified: "2023-05-22T06:00:00.000Z",
    dateApplied: "2023-05-24T04:00:00.000Z",
    dateInterviewing: "2023-05-26T04:00:00.000Z",
  },
];

export const offerMocks: FullApplicationType[] = [
  {
    id: 10,
    position: "Human Resources Specialist",
    company: "Amazon",
    status: "offer",
    contacts: [],
    notes: [
      {
        title: "Networking email",
        body: "I have sent a networking email to one of my former classmates, who works at XYZ Inc., a company that I am interested in. I have congratulated them on their recent promotion, and asked them how they are doing and what they are working on. I have also expressed my interest in learning more about their company and the projects that they are involved in. I have asked them if they have some time to chat with me, and suggested some possible dates and times.",
      },
      {
        title: "Recommendation request",
        body: "I have requested a recommendation from one of my former supervisors, who can vouch for my skills and performance as a web developer. I have reminded them of some of the projects that we have worked on together, and the results and outcomes that we have achieved. I have also explained why I need their recommendation, and how it will help me in my job search. I have thanked them for their support and assistance, and asked them to write a brief and positive recommendation for me on LinkedIn.",
      },
      {
        title: "Follow-up email",
        body: "I have sent a follow-up email to the hiring manager at XYZ Inc., after applying for the position of web developer. I have expressed my interest and enthusiasm for the role, and reiterated my qualifications and fit for the company. I have also attached my updated resume and portfolio, and highlighted some of the relevant skills and projects that I have. I have asked them about the status of my application, and the next steps and the timeline for the hiring process.",
      },
    ],
    dateCreated: "2023-10-04T04:00:00.000Z",
    dateModified: "2023-10-04T06:00:00.000Z",
    dateApplied: "2023-10-06T04:00:00.000Z",
    dateInterviewing: "2023-10-08T04:00:00.000Z",
    dateOffered: "2023-10-10T04:00:00.000Z",
  },
  {
    id: 11,
    position: "Sales Representative",
    company: "Apple",
    status: "offer",
    contacts: [
      {
        name: "Liam Williams",
        phone: "222-333-4444",
        email: "liamwilliams@examples.com",
        position: "Chef",
      },
      {
        name: "Mia Rodriguez",
        phone: "222-333-4444",
        email: "miarodriguez@examples.com",
        position: "Social Worker",
      },
    ],
    notes: [],
    dateCreated: "2023-11-07T04:00:00.000Z",
    dateModified: "2023-11-07T06:00:00.000Z",
    dateApplied: "2023-11-09T04:00:00.000Z",
    dateInterviewing: "2023-11-11T04:00:00.000Z",
    dateOffered: "2023-11-13T04:00:00.000Z",
  },
];

export const closedMocks: FullApplicationType[] = [
  {
    id: 12,
    position: "Sales Representative",
    company: "Apple",
    postingURL: "example.com",
    status: "closed",
    contacts: [
      {
        name: "Noah Martin",
        phone: "222-333-4444",
        email: "noahmartin@examples.com",
        position: "Electrician",
      },
      {
        name: "Olivia Smith",
        phone: "222-333-4444",
        email: "oliviasmith@examples.com",
        position: "Photographer",
      },
    ],
    notes: [],
    dateCreated: "2023-11-05T04:00:00.000Z",
    dateModified: "2023-11-05T06:00:00.000Z",
    dateApplied: "2023-11-07T04:00:00.000Z",
    dateInterviewing: "2023-11-09T04:00:00.000Z",
    dateOffered: "2023-11-11T04:00:00.000Z",
    dateClosed: "2023-11-13T04:00:00.000Z",
  },
];

export const allMockApplications = needToApplyMocks.concat(
  appliedMocks,
  interviewingMocks,
  offerMocks,
  closedMocks,
);
