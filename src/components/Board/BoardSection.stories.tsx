import { ApplicationType } from "@/src/types/applications";
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
		status: "needToApply",
		title: "Need To Apply",
	},
};

export const Full: Story = {
	args: {
		cards: mockApplications(),
		sortBy: "dateModified",
		status: "needToApply",
		title: "Need To Apply",
	},
};

function mockApplications(): ApplicationType[] {
	return [
		{
			id: 1,
			position: "Marketing Manager",
			company: "Coca-Cola",
			postingURL: "example.com",
			status: "needToApply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(7, "month").toISOString(),
			dateModified: dayjs().subtract(7, "month").toISOString(),
			cardColor: "#c62828",
		},
		{
			id: 2,
			position: "Project Coordinator",
			company: "UNICEF",
			status: "needToApply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(5, "month").toISOString(),
			dateModified: dayjs().subtract(5, "month").add(2, "hour").toISOString(),
			cardColor: "#1565c0",
		},
		{
			id: 3,
			position: "Data Engineer",
			company: "Daylight Solutions",
			status: "needToApply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(6, "month").toISOString(),
			dateModified: dayjs().subtract(2, "month").toISOString(),
			cardColor: "#2e7d32",
		},
		{
			id: 4,
			position: "Project Manager",
			company: "Mason Consulting",
			status: "needToApply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(9, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#f9a825",
		},
		{
			id: 5,
			position: "Senior Data Analyst",
			company: "Acme Inc.",
			status: "needToApply",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(9, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#6a1b9a",
		},
		{
			id: 6,
			position: "Data Analyst",
			company: "Netflix",
			postingURL: "example.com",
			status: "applied",
			notes: [],
			dateCreated: dayjs().subtract(3, "month").toISOString(),
			dateModified: dayjs().subtract(3, "month").toISOString(),
			dateApplied: dayjs().subtract(6, "month").add(2, "day").toISOString(),
			cardColor: "#ef6c00",
		},
		{
			id: 7,
			position: "Accountant",
			company: "Deloitte",
			status: "applied",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(6, "month").toISOString(),
			dateModified: dayjs().subtract(6, "month").add(4, "hour").toISOString(),
			dateApplied: dayjs().subtract(6, "month").add(4, "day").toISOString(),
			cardColor: "#4e342e",
		},
		{
			id: 8,
			position: "Graphic Designer",
			company: "Adobe",
			status: "applied",
			contacts: [],
			notes: [],
			dateCreated: dayjs().subtract(3, "month").toISOString(),
			dateModified: dayjs().subtract(4, "month").toISOString(),
			dateApplied: dayjs().subtract(3, "month").toISOString(),
			cardColor: "#37474f",
		},
		{
			id: 9,
			position: "Human Resources Specialist",
			company: "Amazon",
			postingURL: "example.com",
			status: "interviewing",
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
		},
		{
			id: 10,
			position: "Human Resources Specialist",
			company: "Amazon",
			status: "offer",
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
		},
		{
			id: 11,
			position: "Sales Representative",
			company: "Apple",
			status: "offer",
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
		},
		{
			id: 12,
			position: "Sales Representative",
			company: "Apple",
			postingURL: "example.com",
			status: "closed",
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
		},
	];
}

export default meta;
