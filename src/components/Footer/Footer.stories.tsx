import Footer from "@/src/components/Footer";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Footer",
	component: Footer,
	tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export const Default: Story = {};

export default meta;
