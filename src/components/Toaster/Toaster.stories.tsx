import Button from "@/src/components/Button";
import Toaster from "@/src/components/Toaster";
import type { Meta, StoryObj } from "@storybook/react";
import toast from "react-hot-toast";

type Story = StoryObj<typeof meta>;

const meta = {
	title: "Toast",
	component: Toaster,
	tags: ["autodocs"],
	render: () => {
		return (
			<div className="flex w-full justify-center mt-24 gap-4">
				<Toaster />
				<Button
					onClick={() => toast.success("This is a success toast!")}
					className="text-green-800"
				>
					Show success toast
				</Button>
				<Button
					onClick={() => toast.error("This is a error toast!")}
					className="text-red-800"
				>
					Show error toast
				</Button>
			</div>
		);
	},
} satisfies Meta<typeof Toaster>;

export const Default: Story = {};

export default meta;
