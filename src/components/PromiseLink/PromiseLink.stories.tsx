import PromiseLink from "@/src/components/PromiseLink";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "PromiseLink",
	component: PromiseLink,
	argTypes: {
		promise: {
			description: "A promise that returns a string to be used as the href",
		},
		loading: {
			description: "Message displayed while the promise is running",
		},
		error: {
			description: "Message displayed if the promise fails",
		},
		maxRetries: {
			description: "The max number of retires",
			defaultValue: 3,
		},
		tryAgainOnError: {
			description: "If you want the promise to be re-run after a failure",
			defaultValue: false,
		},
		children: {
			description: "This will be displayed before the link is clicked",
		},
		openInNewTab: {
			description: "If you want the link to open in a new tab",
			defaultValue: true,
		},
	},
} satisfies Meta<typeof PromiseLink>;

export const Resolves: Story = {
	args: {
		promise: async () => {
			return await new Promise((res) =>
				setTimeout(() => res("www.google.com"), 3000),
			);
		},
		children: <div>Begin</div>,
		error: "Uh-Oh please try again!",
		loading: "Fetching that for you",
	},
};

export const Rejects: Story = {
	args: {
		promise: async () => {
			return await new Promise((_, rej) => setTimeout(rej, 3000));
		},
		children: <div>Begin</div>,
		error: "Uh-Oh please try again!",
		loading: "Fetching that for you",
	},
};
export default meta;
