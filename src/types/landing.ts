import dayjs from "dayjs";
import { FullApplicationType } from "./applications";

const currentDate = dayjs();

export const needToApplyMocks: FullApplicationType[] = [
	{
		id: 2,
		position: "Project Coordinator",
		company: "UNICEF",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(1, "week").toISOString(),
		dateModified: "2023-08-28T06:00:00.000Z",
	},
	{
		id: 3,
		position: "Data Engineer",
		company: "Daylight Solutions",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(3, "week").toISOString(),
		dateModified: "2023-11-12T20:00:00.000Z",
	},
	{
		id: 1,
		position: "Marketing Manager",
		company: "Coca-Cola",
		postingURL: "example.com",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(1, "month").toISOString(),
		dateModified: "2023-06-13T06:00:00.000Z",
	},
	{
		id: 5,
		position: "Senior Data Analyst",
		company: "Acme Inc.",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(1.5, "month").toISOString(),
		dateModified: "2023-10-12T20:00:00.000Z",
	},
	{
		id: 4,
		position: "Project Manager",
		company: "Mason Consulting",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(3, "month").toISOString(),
		dateModified: "2023-10-12T20:00:00.000Z",
	},
];

export const offerMocks: FullApplicationType[] = [
	{
		id: 11,
		position: "Sales Representative",
		company: "Apple",
		status: "offer",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(1, "week").toISOString(),
		dateModified: "2023-11-07T06:00:00.000Z",
		dateApplied: "2023-11-09T04:00:00.000Z",
		dateInterviewing: "2023-11-11T04:00:00.000Z",
		dateOffered: "2023-11-13T04:00:00.000Z",
	},
	{
		id: 10,
		position: "Human Resources Specialist",
		company: "Amazon",
		status: "offer",
		contacts: [],
		notes: [],
		dateCreated: currentDate.subtract(1, "month").toISOString(),
		dateModified: "2023-10-04T06:00:00.000Z",
		dateApplied: "2023-10-06T04:00:00.000Z",
		dateInterviewing: "2023-10-08T04:00:00.000Z",
		dateOffered: "2023-10-10T04:00:00.000Z",
	},
];
