import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { FormWrapper } from "../../../.storybook/helpers";
import FormTextarea, { type FormTextareaProps } from "./FormTextarea";

type Story = StoryObj<typeof meta>;

function Template(
	args: Omit<
		FormTextareaProps,
		"id" | "label" | "register" | "error" | "className" | "registerName"
	>,
) {
	return (
		<FormWrapper
			schema={z.object({
				storyFormTextarea: z.string(),
			})}
		>
			{({ methods }) => (
				<FormTextarea
					id="storyFormTextarea"
					label="My text area"
					register={methods.register}
					error={methods.formState.errors.storyFormTextarea?.message}
					{...args}
				/>
			)}
		</FormWrapper>
	);
}

const meta = {
	title: "Form/Text Area",
	component: Template,
	tags: ["autodocs"],
} satisfies Meta<typeof Template>;

export const Default: Story = {};

export const With_Placeholder: Story = {
	args: {
		placeholder: "Please enter",
	},
};

export const Is_Required: Story = {
	args: {
		isRequired: true,
	},
};

export default meta;
