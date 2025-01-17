import type { Meta, StoryObj } from "@storybook/react";
import MetricsSkeleton from "./MetricsSkeleton";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/Metrics Skeleton",
	component: MetricsSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof MetricsSkeleton>;

export const Default: Story = {};

export default meta;
