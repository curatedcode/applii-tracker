import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { FormWrapper } from "../../../.storybook/helpers";
import FormInput from "./FormInput";

type Story = StoryObj<typeof meta>;

function Template() {
	return (
		<FormWrapper schema={z.object({ storyFormInput: z.string() })}>
			{({ methods }) => (
				<FormInput
					register={methods.register}
					id="storyFormInput"
					label="My input"
				/>
			)}
		</FormWrapper>
	);
}

const meta = {
	title: "Form/Input",
	component: Template,
	tags: ["autodocs"],
} satisfies Meta<typeof Template>;

export const Default: Story = {};

export default meta;
