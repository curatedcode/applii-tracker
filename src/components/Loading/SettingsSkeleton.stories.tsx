import type { Meta, StoryObj } from "@storybook/react";
import SettingsSkeleton from "./SettingsSkeleton";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/Settings Skeleton",
	component: SettingsSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof SettingsSkeleton>;

export const Default: Story = {};

export default meta;
