import groupApplicationsByDateRange from "@/src/components/Metrics/groupApplicationsByDateRange";
import { FullApplicationType } from "@/src/types/applications";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("group applications by date range", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("1 year grouping", () => {
		vi.setSystemTime("10/05/2023");

		const grouped = groupApplicationsByDateRange({
			applications,
			timeline: "1 year",
		});

		expect(grouped).toStrictEqual([
			{ label: "Oct", applications: [] },
			{ label: "Nov", applications: [] },
			{ label: "Dec", applications: [] },
			{ label: "Jan", applications: [] },
			{ label: "Feb", applications: [] },
			{ label: "Mar", applications: [] },
			{
				label: "Apr",
				applications: [
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
						contacts: [],
						notes: [],
						dateCreated: "2023-04-28T04:00:00.000Z",
						dateModified: "2023-10-12T20:00:00.000Z",
					},
				],
			},
			{
				label: "May",
				applications: [
					{
						id: 9,
						position: "Human Resources Specialist",
						company: "Amazon",
						postingURL: "example.com",
						status: "interviewing",
						contacts: [],
						notes: [],
						dateCreated: "2023-05-22T04:00:00.000Z",
						dateModified: "2023-05-22T06:00:00.000Z",
						dateApplied: "2023-05-24T04:00:00.000Z",
						dateInterviewing: "2023-05-26T04:00:00.000Z",
					},
				],
			},
			{
				label: "Jun",
				applications: [
					{
						id: 1,
						position: "Marketing Manager",
						company: "Coca-Cola",
						postingURL: "example.com",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-06-13T04:00:00.000Z",
						dateModified: "2023-06-13T06:00:00.000Z",
					},
				],
			},
			{
				label: "Jul",
				applications: [
					{
						id: 3,
						position: "Data Engineer",
						company: "Daylight Solutions",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-28T04:00:00.000Z",
						dateModified: "2023-11-12T20:00:00.000Z",
					},
					{
						id: 7,
						position: "Accountant",
						company: "Deloitte",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-17T04:00:00.000Z",
						dateModified: "2023-07-17T06:00:00.000Z",
						dateApplied: "2023-07-22T04:00:00.000Z",
					},
				],
			},
			{
				label: "Aug",
				applications: [
					{
						id: 2,
						position: "Project Coordinator",
						company: "UNICEF",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-08-28T04:00:00.000Z",
						dateModified: "2023-08-28T06:00:00.000Z",
					},
				],
			},
			{
				label: "Sep",
				applications: [
					{
						id: 8,
						position: "Graphic Designer",
						company: "Adobe",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
					},
				],
			},
			{
				label: "Oct",
				applications: [
					{
						id: 6,
						position: "Data Analyst",
						company: "Netflix",
						postingURL: "example.com",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-08T04:00:00.000Z",
						dateModified: "2023-10-08T06:00:00.000Z",
						dateApplied: "2023-10-10T04:00:00.000Z",
					},
					{
						id: 10,
						position: "Human Resources Specialist",
						company: "Amazon",
						status: "offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
					},
				],
			},
		]);
	});

	test("6 months grouping", () => {
		vi.setSystemTime("10/05/2023");

		const grouped = groupApplicationsByDateRange({
			applications,
			timeline: "6 months",
		});

		expect(grouped).toStrictEqual([
			{
				label: "May",
				applications: [
					{
						id: 9,
						position: "Human Resources Specialist",
						company: "Amazon",
						postingURL: "example.com",
						status: "interviewing",
						contacts: [],
						notes: [],
						dateCreated: "2023-05-22T04:00:00.000Z",
						dateModified: "2023-05-22T06:00:00.000Z",
						dateApplied: "2023-05-24T04:00:00.000Z",
						dateInterviewing: "2023-05-26T04:00:00.000Z",
					},
				],
			},
			{
				label: "Jun",
				applications: [
					{
						id: 1,
						position: "Marketing Manager",
						company: "Coca-Cola",
						postingURL: "example.com",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-06-13T04:00:00.000Z",
						dateModified: "2023-06-13T06:00:00.000Z",
					},
				],
			},
			{
				label: "Jul",
				applications: [
					{
						id: 3,
						position: "Data Engineer",
						company: "Daylight Solutions",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-28T04:00:00.000Z",
						dateModified: "2023-11-12T20:00:00.000Z",
					},
					{
						id: 7,
						position: "Accountant",
						company: "Deloitte",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-17T04:00:00.000Z",
						dateModified: "2023-07-17T06:00:00.000Z",
						dateApplied: "2023-07-22T04:00:00.000Z",
					},
				],
			},
			{
				label: "Aug",
				applications: [
					{
						id: 2,
						position: "Project Coordinator",
						company: "UNICEF",
						status: "needToApply",
						contacts: [],
						notes: [],
						dateCreated: "2023-08-28T04:00:00.000Z",
						dateModified: "2023-08-28T06:00:00.000Z",
					},
				],
			},
			{
				label: "Sep",
				applications: [
					{
						id: 8,
						position: "Graphic Designer",
						company: "Adobe",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
					},
				],
			},
			{
				label: "Oct",
				applications: [
					{
						id: 6,
						position: "Data Analyst",
						company: "Netflix",
						postingURL: "example.com",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-08T04:00:00.000Z",
						dateModified: "2023-10-08T06:00:00.000Z",
						dateApplied: "2023-10-10T04:00:00.000Z",
					},
					{
						id: 10,
						position: "Human Resources Specialist",
						company: "Amazon",
						status: "offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
					},
				],
			},
		]);
	});

	test("1 month grouping", () => {
		vi.setSystemTime("10/05/2023");

		const grouped = groupApplicationsByDateRange({
			applications,
			timeline: "1 month",
		});

		expect(grouped).toStrictEqual([
			{
				label: "09/04 - 09/11",
				applications: [
					{
						id: 8,
						position: "Graphic Designer",
						company: "Adobe",
						status: "applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
					},
				],
			},
			{
				label: "09/12 - 09/19",
				applications: [],
			},
			{
				label: "09/20 - 09/27",
				applications: [],
			},
			{
				label: "09/28 - 10/05",
				applications: [
					{
						id: 10,
						position: "Human Resources Specialist",
						company: "Amazon",
						status: "offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
					},
				],
			},
		]);
	});

	test("1 week grouping", () => {
		vi.setSystemTime("10/05/2023");

		const grouped = groupApplicationsByDateRange({
			applications,
			timeline: "1 week",
		});

		expect(grouped).toStrictEqual([
			{ label: "09/29", applications: [] },
			{ label: "09/30", applications: [] },
			{ label: "10/01", applications: [] },
			{ label: "10/02", applications: [] },
			{ label: "10/03", applications: [] },
			{
				label: "10/04",
				applications: [
					{
						id: 10,
						position: "Human Resources Specialist",
						company: "Amazon",
						status: "offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
					},
				],
			},
			{ label: "10/05", applications: [] },
		]);
	});
});

const applications: FullApplicationType[] = [
	{
		id: 1,
		position: "Marketing Manager",
		company: "Coca-Cola",
		postingURL: "example.com",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: "2023-06-13T04:00:00.000Z",
		dateModified: "2023-06-13T06:00:00.000Z",
	},
	{
		id: 2,
		position: "Project Coordinator",
		company: "UNICEF",
		status: "needToApply",
		contacts: [],
		notes: [],
		dateCreated: "2023-08-28T04:00:00.000Z",
		dateModified: "2023-08-28T06:00:00.000Z",
	},
	{
		id: 3,
		position: "Data Engineer",
		company: "Daylight Solutions",
		status: "needToApply",
		contacts: [],
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
		contacts: [],
		notes: [],
		dateCreated: "2023-04-28T04:00:00.000Z",
		dateModified: "2023-10-12T20:00:00.000Z",
	},
	{
		id: 6,
		position: "Data Analyst",
		company: "Netflix",
		postingURL: "example.com",
		status: "applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-10-08T04:00:00.000Z",
		dateModified: "2023-10-08T06:00:00.000Z",
		dateApplied: "2023-10-10T04:00:00.000Z",
	},
	{
		id: 7,
		position: "Accountant",
		company: "Deloitte",
		status: "applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-07-17T04:00:00.000Z",
		dateModified: "2023-07-17T06:00:00.000Z",
		dateApplied: "2023-07-22T04:00:00.000Z",
	},
	{
		id: 8,
		position: "Graphic Designer",
		company: "Adobe",
		status: "applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-09-05T04:00:00.000Z",
		dateModified: "2023-09-05T06:00:00.000Z",
		dateApplied: "2023-09-07T04:00:00.000Z",
	},
	{
		id: 9,
		position: "Human Resources Specialist",
		company: "Amazon",
		postingURL: "example.com",
		status: "interviewing",
		contacts: [],
		notes: [],
		dateCreated: "2023-05-22T04:00:00.000Z",
		dateModified: "2023-05-22T06:00:00.000Z",
		dateApplied: "2023-05-24T04:00:00.000Z",
		dateInterviewing: "2023-05-26T04:00:00.000Z",
	},
	{
		id: 10,
		position: "Human Resources Specialist",
		company: "Amazon",
		status: "offer",
		contacts: [],
		notes: [],
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
		contacts: [],
		notes: [],
		dateCreated: "2023-11-07T04:00:00.000Z",
		dateModified: "2023-11-07T06:00:00.000Z",
		dateApplied: "2023-11-09T04:00:00.000Z",
		dateInterviewing: "2023-11-11T04:00:00.000Z",
		dateOffered: "2023-11-13T04:00:00.000Z",
	},
	{
		id: 12,
		position: "Sales Representative",
		company: "Apple",
		postingURL: "example.com",
		status: "closed",
		contacts: [],
		notes: [],
		dateCreated: "2023-11-05T04:00:00.000Z",
		dateModified: "2023-11-05T06:00:00.000Z",
		dateApplied: "2023-11-07T04:00:00.000Z",
		dateInterviewing: "2023-11-09T04:00:00.000Z",
		dateOffered: "2023-11-11T04:00:00.000Z",
		dateClosed: "2023-11-13T04:00:00.000Z",
	},
];
