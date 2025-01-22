import type { zApplication } from "@/src/types/db";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import BoardSection from "./BoardSection";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Board/Section",
	component: BoardSection,
	render: (args) => (
		<div className="p-2">
			<BoardSection {...args} />
		</div>
	),
	tags: ["autodocs"],
	argTypes: {
		cards: {
			description: "All application cards",
		},
		mode: {
			description:
				'Changes what elements make up the component. E.g., if you set it to "landing" the cards won\'t will be a div instead of anchor',
		},
		sortBy: {
			description: "Sort the card either by date modified or date created",
			if: {
				arg: "mode",
				eq: ["default", "demo"],
			},
		},
		status: {
			description: "The status for the section",
			if: {
				arg: "mode",
				eq: ["default", "demo"],
			},
		},
		title: {
			description: "The status title for the section",
		},
		className: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof BoardSection>;

export const Empty: Story = {
	args: {
		cards: [],
		sortBy: "dateModified",
		status: "Need To Apply",
		title: "Need To Apply",
	},
};

export const Full: Story = {
	args: {
		cards: mockApplications(),
		sortBy: "dateModified",
		status: "Need To Apply",
		title: "Need To Apply",
	},
};

function mockApplications(): zApplication["GET"][] {
	return [
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
			status: "Need To Apply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(7, "month").toISOString(),
			dateModified: dayjs().subtract(7, "month").toISOString(),
			cardColor: "#c62828",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(5, "month").toISOString(),
			dateModified: dayjs().subtract(5, "month").add(2, "hour").toISOString(),
			cardColor: "#1565c0",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(6, "month").toISOString(),
			dateModified: dayjs().subtract(2, "month").toISOString(),
			cardColor: "#2e7d32",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(9, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#f9a825",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(9, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#6a1b9a",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			status: "Applied",
			notes: [],
			dateCreated: dayjs().subtract(3, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			dateApplied: dayjs().subtract(6, "month").add(2, "day").toISOString(),
			cardColor: "#ef6c00",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(6, "month").toISOString(),
			dateModified: dayjs().subtract(6, "month").add(4, "hour").toISOString(),
			dateApplied: dayjs().subtract(6, "month").add(4, "day").toISOString(),
			cardColor: "#4e342e",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(3, "month").toISOString(),
			dateModified: dayjs().subtract(4, "month").toISOString(),
			dateApplied: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#37474f",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			status: "Interviewing",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(7, "month").toISOString(),
			dateModified: dayjs().subtract(7, "month").add(3, "hour").toISOString(),
			dateApplied: dayjs().subtract(7, "month").add(2, "day").toISOString(),
			dateInterviewing: dayjs()
				.subtract(6, "month")
				.add(4, "day")
				.toISOString(),
			cardColor: "#ad1457",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(2, "month").toISOString(),
			dateModified: dayjs().subtract(2, "month").add(1, "hour").toISOString(),
			dateApplied: dayjs().subtract(2, "month").add(2, "day").toISOString(),
			dateInterviewing: dayjs()
				.subtract(2, "month")
				.add(5, "day")
				.toISOString(),
			dateOffered: dayjs().subtract(6, "month").add(2, "week").toISOString(),
			cardColor: "#00838f",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			dateCreated: dayjs().subtract(2, "month").toISOString(),
			dateModified: dayjs().subtract(2, "month").add(6, "hour").toISOString(),
			dateApplied: dayjs().subtract(2, "month").toISOString(),
			dateInterviewing: dayjs()
				.subtract(2, "month")
				.add(3, "day")
				.toISOString(),
			dateOffered: dayjs().subtract(2, "month").add(6, "day").toISOString(),
			cardColor: "#fdd835",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
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
			status: "Closed",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(1, "month").toISOString(),
			dateModified: dayjs().subtract(1, "month").add(1, "hour").toISOString(),
			dateApplied: dayjs().subtract(1, "month").add(2, "day").toISOString(),
			dateInterviewing: dayjs()
				.subtract(1, "month")
				.add(3, "day")
				.toISOString(),
			dateOffered: dayjs().subtract(1, "month").add(1, "week").toISOString(),
			dateClosed: dayjs().subtract(1, "month").add(2, "week").toISOString(),
			cardColor: "#009688",
			location: "In-person",
			submission: "Job Fair",
			jobType: "Full-time",
		},
	];
}

export default meta;
