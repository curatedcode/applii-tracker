import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FormCardColorInput, {
	type FormCardColorInputProps,
} from "./FormCardColorInput";

function Template(args: FormCardColorInputProps) {
	const [color, setColor] = useState("#009688");

	return <FormCardColorInput {...args} color={color} setColor={setColor} />;
}

const meta = {
	title: "Form/Card Mock",
	component: Template,
	tags: ["autodocs"],
	argTypes: {
		color: {
			description: "The current color for the cards background",
		},
		company: {
			description: "Updated as the user types it, also has a default",
		},
		position: {
			description: "Updated as the user types it, also has a default",
		},
		error: {
			description: "User visible error message",
		},
		setColor: {
			table: {
				disable: true,
			},
		},
		id: {
			table: {
				disable: true,
			},
		},
		label: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "#009688",
		id: "SB_FormCardColorInput",
		label: "Card color",
	},
};
