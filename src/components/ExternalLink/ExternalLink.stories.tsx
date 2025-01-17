import ExternalLink from "@/src/components/ExternalLink";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Input/External Link",
	component: ExternalLink,
	render: (args) => (
		<div className="p-2">
			<ExternalLink {...args} />
		</div>
	),
	tags: ["autodocs"],
	argTypes: {
		style: {
			description: "Different style variants",
		},
		openInNewTab: {
			description: "Whether to open the link in a new tab",
		},
		className: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof ExternalLink>;

export const Default: Story = {
	args: {
		children: "ExternalLink",
		openInNewTab: true,
		href: "www.google.com",
	},
};

export const Underline: Story = {
	args: {
		children: "Underline",
		style: "underline",
		openInNewTab: true,
		href: "www.google.com",
	},
};

export default meta;
