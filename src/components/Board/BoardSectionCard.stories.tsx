import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import BoardSectionCard from "./BoardSectionCard";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Board/Card",
	component: BoardSectionCard,
	tags: ["autodocs"],
	argTypes: {
		cardColor: {
			description: "Background color",
		},
		mode: {
			description: "Alters the link to the application",
		},
		sortBy: {
			description: "Displays title on hover depending on this value",
		},
		contacts: {
			table: {
				disable: true,
			},
		},
		id: {
			table: {
				disable: true,
			},
		},
		status: {
			table: {
				disable: true,
			},
		},
		notes: {
			table: {
				disable: true,
			},
		},
		dateCreated: {
			table: {
				disable: true,
			},
		},
		dateModified: {
			table: {
				disable: true,
			},
		},
		dateApplied: {
			table: {
				disable: true,
			},
		},
		dateInterviewing: {
			table: {
				disable: true,
			},
		},
		dateOffered: {
			table: {
				disable: true,
			},
		},
		dateClosed: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof BoardSectionCard>;

export const Default: Story = {
	args: {
		id: 12,
		position: "Sales Representative",
		company: {
			id: 0,
			name: "Apple",
			contacts: [],
			contactIds: [],
		},
		companyId: 0,
		status: "Need To Apply",
		contacts: [],
		notes: [],
		dateCreated: dayjs().subtract(1, "month").toISOString(),
		dateModified: dayjs().subtract(1, "month").add(1, "hour").toISOString(),
		dateApplied: dayjs().subtract(1, "month").add(2, "day").toISOString(),
		dateInterviewing: dayjs().subtract(1, "month").add(3, "day").toISOString(),
		dateOffered: dayjs().subtract(1, "month").add(1, "week").toISOString(),
		dateClosed: dayjs().subtract(1, "month").add(2, "week").toISOString(),
		cardColor: "#009688",
		sortBy: "dateModified",
		location: "In-person",
		submission: "Job Fair",
		jobType: "Full-time",
	},
};

export default meta;
