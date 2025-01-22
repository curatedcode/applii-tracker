import type { Meta, StoryObj } from "@storybook/react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { FormWrapper } from "../../../.storybook/helpers";
import FormSelectInput from "./FormSelectInput";

type Story = StoryObj<typeof meta>;

function Template() {
	return (
		<FormWrapper
			schema={z.object({
				storyFormSelectInput: z.string(),
			})}
		>
			{({ methods }) => {
				const _value = methods.watch("storyFormSelectInput");

				return (
					<Controller
						name="storyFormSelectInput"
						control={methods.control}
						render={({ field }) => (
							<FormSelectInput
								{...field}
								label="My input"
								options={["Apples", "Bananas", "Watermelons"]}
							/>
						)}
					/>
				);
			}}
		</FormWrapper>
	);
}

const meta = {
	title: "Form/Select Input",
	component: Template,
	tags: ["autodocs"],
} satisfies Meta<typeof Template>;

export const Default: Story = {};

export default meta;
