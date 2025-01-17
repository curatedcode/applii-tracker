import type { Meta, StoryObj } from "@storybook/react";
import ViewApplicationSkeleton from "./ViewApplicationSkeleton";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/View Application Skeleton",
	component: ViewApplicationSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof ViewApplicationSkeleton>;

export const Default: Story = {};

export default meta;
