import groupApplicationsByDateRange from "@/src/components/Metrics/groupApplicationsByDateRange";
import type { zApplication } from "@/src/types/db";
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
			{ label: "Oct, 2022", applications: [] },
			{ label: "Nov, 2022", applications: [] },
			{ label: "Dec, 2022", applications: [] },
			{ label: "Jan", applications: [] },
			{ label: "Feb", applications: [] },
			{ label: "Mar", applications: [] },
			{
				label: "Apr",
				applications: [
					{
						id: 4,
						position: "Project Manager",
						company: {
							id: 0,
							name: "Mason Consulting",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-04-28T04:00:00.000Z",
						dateModified: "2023-10-12T20:00:00.000Z",
						cardColor: "#c62828",
					},
					{
						id: 5,
						position: "Senior Data Analyst",
						company: {
							id: 0,
							name: "Acme Inc.",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-04-28T04:00:00.000Z",
						dateModified: "2023-10-12T20:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "May",
				applications: [
					{
						id: 9,
						position: "Human Resources Specialist",
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Interviewing",
						contacts: [],
						notes: [],
						dateCreated: "2023-05-22T04:00:00.000Z",
						dateModified: "2023-05-22T06:00:00.000Z",
						dateApplied: "2023-05-24T04:00:00.000Z",
						dateInterviewing: "2023-05-26T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Jun",
				applications: [
					{
						id: 1,
						position: "Marketing Manager",
						company: {
							id: 0,
							name: "Coca-Cola",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-06-13T04:00:00.000Z",
						dateModified: "2023-06-13T06:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Jul",
				applications: [
					{
						id: 3,
						position: "Data Engineer",
						company: {
							id: 0,
							name: "Daylight Solutions",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-28T04:00:00.000Z",
						dateModified: "2023-11-12T20:00:00.000Z",
						cardColor: "#c62828",
					},
					{
						id: 7,
						position: "Accountant",
						company: {
							id: 0,
							name: "Deloitte",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-17T04:00:00.000Z",
						dateModified: "2023-07-17T06:00:00.000Z",
						dateApplied: "2023-07-22T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Aug",
				applications: [
					{
						id: 2,
						position: "Project Coordinator",
						company: {
							id: 0,
							name: "UNICEF",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-08-28T04:00:00.000Z",
						dateModified: "2023-08-28T06:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Sep",
				applications: [
					{
						id: 8,
						position: "Graphic Designer",
						company: {
							id: 0,
							name: "Adobe",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Oct",
				applications: [
					{
						id: 6,
						position: "Data Analyst",
						company: {
							id: 0,
							name: "Netflix",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-08T04:00:00.000Z",
						dateModified: "2023-10-08T06:00:00.000Z",
						dateApplied: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
					},
					{
						id: 10,
						position: "Human Resources Specialist",
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
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
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Interviewing",
						contacts: [],
						notes: [],
						dateCreated: "2023-05-22T04:00:00.000Z",
						dateModified: "2023-05-22T06:00:00.000Z",
						dateApplied: "2023-05-24T04:00:00.000Z",
						dateInterviewing: "2023-05-26T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Jun",
				applications: [
					{
						id: 1,
						position: "Marketing Manager",
						company: {
							id: 0,
							name: "Coca-Cola",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-06-13T04:00:00.000Z",
						dateModified: "2023-06-13T06:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Jul",
				applications: [
					{
						id: 3,
						position: "Data Engineer",
						company: {
							id: 0,
							name: "Daylight Solutions",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-28T04:00:00.000Z",
						dateModified: "2023-11-12T20:00:00.000Z",
						cardColor: "#c62828",
					},
					{
						id: 7,
						position: "Accountant",
						company: {
							id: 0,
							name: "Deloitte",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-07-17T04:00:00.000Z",
						dateModified: "2023-07-17T06:00:00.000Z",
						dateApplied: "2023-07-22T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Aug",
				applications: [
					{
						id: 2,
						position: "Project Coordinator",
						company: {
							id: 0,
							name: "UNICEF",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Need To Apply",
						contacts: [],
						notes: [],
						dateCreated: "2023-08-28T04:00:00.000Z",
						dateModified: "2023-08-28T06:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Sep",
				applications: [
					{
						id: 8,
						position: "Graphic Designer",
						company: {
							id: 0,
							name: "Adobe",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{
				label: "Oct",
				applications: [
					{
						id: 6,
						position: "Data Analyst",
						company: {
							id: 0,
							name: "Netflix",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						postingURL: "example.com",
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-08T04:00:00.000Z",
						dateModified: "2023-10-08T06:00:00.000Z",
						dateApplied: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
					},
					{
						id: 10,
						position: "Human Resources Specialist",
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
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
						company: {
							id: 0,
							name: "Adobe",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Applied",
						contacts: [],
						notes: [],
						dateCreated: "2023-09-05T04:00:00.000Z",
						dateModified: "2023-09-05T06:00:00.000Z",
						dateApplied: "2023-09-07T04:00:00.000Z",
						cardColor: "#c62828",
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
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
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
						company: {
							id: 0,
							name: "Amazon",
							contacts: [],
							contactIds: [],
						},
						companyId: 0,
						status: "Offer",
						contacts: [],
						notes: [],
						dateCreated: "2023-10-04T04:00:00.000Z",
						dateModified: "2023-10-04T06:00:00.000Z",
						dateApplied: "2023-10-06T04:00:00.000Z",
						dateInterviewing: "2023-10-08T04:00:00.000Z",
						dateOffered: "2023-10-10T04:00:00.000Z",
						cardColor: "#c62828",
					},
				],
			},
			{ label: "10/05", applications: [] },
		]);
	});
});

const applications: zApplication["GET"][] = [
	{
		id: 1,
		position: "Marketing Manager",
		company: {
			id: 0,
			name: "Coca-Cola",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		postingURL: "example.com",
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: "2023-06-13T04:00:00.000Z",
		dateModified: "2023-06-13T06:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 2,
		position: "Project Coordinator",
		company: {
			id: 0,
			name: "UNICEF",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: "2023-08-28T04:00:00.000Z",
		dateModified: "2023-08-28T06:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 3,
		position: "Data Engineer",
		company: {
			id: 0,
			name: "Daylight Solutions",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: "2023-07-28T04:00:00.000Z",
		dateModified: "2023-11-12T20:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 4,
		position: "Project Manager",
		company: {
			id: 0,
			name: "Mason Consulting",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: "2023-04-28T04:00:00.000Z",
		dateModified: "2023-10-12T20:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 5,
		position: "Senior Data Analyst",
		company: {
			id: 0,
			name: "Acme Inc.",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: "2023-04-28T04:00:00.000Z",
		dateModified: "2023-10-12T20:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 6,
		position: "Data Analyst",
		company: {
			id: 0,
			name: "Netflix",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		postingURL: "example.com",
		status: "Applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-10-08T04:00:00.000Z",
		dateModified: "2023-10-08T06:00:00.000Z",
		dateApplied: "2023-10-10T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 7,
		position: "Accountant",
		company: {
			id: 0,
			name: "Deloitte",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-07-17T04:00:00.000Z",
		dateModified: "2023-07-17T06:00:00.000Z",
		dateApplied: "2023-07-22T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 8,
		position: "Graphic Designer",
		company: {
			id: 0,
			name: "Adobe",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Applied",
		contacts: [],
		notes: [],
		dateCreated: "2023-09-05T04:00:00.000Z",
		dateModified: "2023-09-05T06:00:00.000Z",
		dateApplied: "2023-09-07T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 9,
		position: "Human Resources Specialist",
		company: {
			id: 0,
			name: "Amazon",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		postingURL: "example.com",
		status: "Interviewing",
		contacts: [],
		notes: [],
		dateCreated: "2023-05-22T04:00:00.000Z",
		dateModified: "2023-05-22T06:00:00.000Z",
		dateApplied: "2023-05-24T04:00:00.000Z",
		dateInterviewing: "2023-05-26T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 10,
		position: "Human Resources Specialist",
		company: {
			id: 0,
			name: "Amazon",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Offer",
		contacts: [],
		notes: [],
		dateCreated: "2023-10-04T04:00:00.000Z",
		dateModified: "2023-10-04T06:00:00.000Z",
		dateApplied: "2023-10-06T04:00:00.000Z",
		dateInterviewing: "2023-10-08T04:00:00.000Z",
		dateOffered: "2023-10-10T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 11,
		position: "Sales Representative",
		company: {
			id: 0,
			name: "Apple",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Offer",
		contacts: [],
		notes: [],
		dateCreated: "2023-11-07T04:00:00.000Z",
		dateModified: "2023-11-07T06:00:00.000Z",
		dateApplied: "2023-11-09T04:00:00.000Z",
		dateInterviewing: "2023-11-11T04:00:00.000Z",
		dateOffered: "2023-11-13T04:00:00.000Z",
		cardColor: "#c62828",
	},
	{
		id: 12,
		position: "Sales Representative",
		company: {
			id: 0,
			name: "Apple",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		postingURL: "example.com",
		status: "Closed",
		contacts: [],
		notes: [],
		dateCreated: "2023-11-05T04:00:00.000Z",
		dateModified: "2023-11-05T06:00:00.000Z",
		dateApplied: "2023-11-07T04:00:00.000Z",
		dateInterviewing: "2023-11-09T04:00:00.000Z",
		dateOffered: "2023-11-11T04:00:00.000Z",
		dateClosed: "2023-11-13T04:00:00.000Z",
		cardColor: "#c62828",
	},
];
