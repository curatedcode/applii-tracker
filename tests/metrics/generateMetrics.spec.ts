import generateMetrics from "@/src/components/Metrics/generateMetrics";
import { FullApplicationType } from "@/src/types/applications";
import { statusColors } from "@/src/types/global";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("generates metrics", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("returns 1 year metrics", () => {
		vi.setSystemTime("11/14/2023");

		const { chartData, simpleMetrics } = generateMetrics({
			timeline: "1 year",
			applications,
		});

		expect(simpleMetrics).toStrictEqual({
			percentages: [
				{ percentage: "42%", label: "Need To Apply" },
				{ percentage: "25%", label: "Applied" },
				{ percentage: "8%", label: "Interviewing" },
				{ percentage: "17%", label: "Offer" },
				{ percentage: "8%", label: "Closed" },
			],
			totalApplications: 12,
		});

		expect(chartData).toStrictEqual([
			{
				date: "Nov",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Dec",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Jan",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Feb",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Mar",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Apr",
				"Need To Apply": 2,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "May",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 1,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Jun",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Jul",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Aug",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Sep",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Oct",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 1,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Nov",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 1,
				OfferColor: statusColors.offer,
				Closed: 1,
				ClosedColor: statusColors.closed,
			},
		]);
	});

	test("returns 6 month metrics", () => {
		vi.setSystemTime("11/14/2023");

		const { chartData, simpleMetrics } = generateMetrics({
			timeline: "6 months",
			applications,
		});

		expect(simpleMetrics).toStrictEqual({
			percentages: [
				{ percentage: "33%", label: "Need To Apply" },
				{ percentage: "33%", label: "Applied" },
				{ percentage: "0%", label: "Interviewing" },
				{ percentage: "22%", label: "Offer" },
				{ percentage: "11%", label: "Closed" },
			],
			totalApplications: 9,
		});

		expect(chartData).toStrictEqual([
			{
				date: "Jun",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Jul",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Aug",
				"Need To Apply": 1,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Sep",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Oct",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 1,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 1,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "Nov",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 1,
				OfferColor: statusColors.offer,
				Closed: 1,
				ClosedColor: statusColors.closed,
			},
		]);
	});

	test("returns 1 month metrics", () => {
		vi.setSystemTime("11/14/2023");

		const { chartData, simpleMetrics } = generateMetrics({
			timeline: "1 month",
			applications,
		});

		expect(simpleMetrics).toStrictEqual({
			percentages: [
				{ percentage: "0%", label: "Need To Apply" },
				{ percentage: "0%", label: "Applied" },
				{ percentage: "0%", label: "Interviewing" },
				{ percentage: "50%", label: "Offer" },
				{ percentage: "50%", label: "Closed" },
			],
			totalApplications: 2,
		});

		expect(chartData).toStrictEqual([
			{
				date: "10/14 - 10/21",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "10/22 - 10/29",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "10/30 - 11/06",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 1,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/07 - 11/14",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 1,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
		]);
	});

	test("returns 1 week metrics", () => {
		vi.setSystemTime("11/14/2023");

		const { chartData, simpleMetrics } = generateMetrics({
			timeline: "1 week",
			applications,
		});

		expect(simpleMetrics).toStrictEqual({
			percentages: [
				{ percentage: "0%", label: "Need To Apply" },
				{ percentage: "0%", label: "Applied" },
				{ percentage: "0%", label: "Interviewing" },
				{ percentage: "0%", label: "Offer" },
				{ percentage: "0%", label: "Closed" },
			],
			totalApplications: 0,
		});

		expect(chartData).toStrictEqual([
			{
				date: "11/08",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/09",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/10",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/11",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/12",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/13",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
			{
				date: "11/14",
				"Need To Apply": 0,
				"Need To ApplyColor": statusColors.needToApply,
				Applied: 0,
				AppliedColor: statusColors.applied,
				Interviewing: 0,
				InterviewingColor: statusColors.interviewing,
				Offer: 0,
				OfferColor: statusColors.offer,
				Closed: 0,
				ClosedColor: statusColors.closed,
			},
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
		dateCreated: "2023-09-03T04:00:00.000Z",
		dateModified: "2023-09-03T06:00:00.000Z",
		dateApplied: "2023-09-05T04:00:00.000Z",
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
		dateCreated: "2023-11-07T05:00:00.000Z",
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
