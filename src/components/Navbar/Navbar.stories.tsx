import Navbar from "@/src/components/Navbar";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Navbar",
	component: Navbar,
	argTypes: {
		items: {
			description: "The nav links you want to be displayed",
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export const Default: Story = {
	args: {
		items: [
			{ name: "Home", href: "/home" },
			{ name: "Applications", href: "/applications" },
			{ name: "Other", href: "/other" },
		],
		showSettingsGear: true,
	},
	render: (args) => {
		return (
			<div className="w-full max-w-lg">
				<Navbar {...args} />
			</div>
		);
	},
};

export default meta;
