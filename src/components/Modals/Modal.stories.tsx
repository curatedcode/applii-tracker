import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Modals/Modal",
	component: Modal,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Modal>;

export const Default: Story = {
	args: {
		description: "",
	},
};

export default meta;
