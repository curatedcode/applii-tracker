import type { Meta, StoryObj } from "@storybook/react";
import EditApplicationSkeleton from "./EditApplicationSkeleton";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/Edit Application Skeleton",
	component: EditApplicationSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof EditApplicationSkeleton>;

export const Default: Story = {};

export default meta;
