import type { Meta, StoryObj } from "@storybook/react";
import HomeSkeleton from "./HomeSkeleton";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/Home Skeleton",
	component: HomeSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof HomeSkeleton>;

export const Default: Story = {};

export default meta;
