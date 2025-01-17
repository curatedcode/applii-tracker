import type { Meta, StoryObj } from "@storybook/react";
import ErrorMessage from "./ErrorMessage";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Form/Error Message",
	component: ErrorMessage,
	tags: ["autodocs"],
	argTypes: {
		error: {
			description: "The error message that will be visible to the user",
		},
	},
} satisfies Meta<typeof ErrorMessage>;

export const No_Error: Story = {};

export const Has_Error: Story = {
	args: {
		error: "Incorrect value for field",
	},
};

export default meta;
