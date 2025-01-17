import type { Meta, StoryObj } from "@storybook/react";
import FAQAccordion from "./FAQAccordion";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Landing/FAQ",
	component: FAQAccordion,
	tags: ["autodocs"],
} satisfies Meta<typeof FAQAccordion>;

export const Default: Story = {};

export default meta;
