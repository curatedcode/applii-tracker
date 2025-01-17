import { PlusIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Input/Button",
	component: Button,
	render: (args) => (
		<div className="p-2">
			<Button {...args} />
		</div>
	),
	tags: ["autodocs"],
	argTypes: {
		as: {
			description: "Renders the element as a button or anchor component",
		},
		href: {
			if: {
				arg: "as",
				eq: "link",
			},
		},
		style: {
			description: "Different style variants",
		},
		className: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof Button>;

export const Standard_Button: Story = {
	args: {
		children: "Button",
	},
};

export const Inverse_Button: Story = {
	args: {
		children: "Inverse",
		style: "inverse",
	},
};

export const Icon_Button: Story = {
	args: {
		children: <PlusIcon className="w-4" />,
		style: "icon",
	},
};

export const Standard_Link: Story = {
	args: {
		children: "Link",
		as: "link",
		href: "",
	},
};

export const Inverse_Link: Story = {
	args: {
		children: "Link",
		as: "link",
		href: "",
		style: "inverse",
	},
};

export const Icon_Link: Story = {
	args: {
		children: <PlusIcon className="w-4" />,
		as: "link",
		href: "",
		style: "icon",
	},
};

export default meta;
