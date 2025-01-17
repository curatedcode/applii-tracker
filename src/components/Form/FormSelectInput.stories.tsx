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
				storyFormSelectInput: z.object({
					label: z.string(),
					value: z.string(),
				}),
			})}
		>
			{({ methods }) => {
				const value = methods.watch("storyFormSelectInput");

				return (
					<Controller
						name="storyFormSelectInput"
						control={methods.control}
						render={({ field: { onChange } }) => (
							<FormSelectInput
								options={[
									{ label: "Apples", value: "apples" },
									{ label: "Bananas", value: "bananas" },
									{ label: "Watermelons", value: "watermelons" },
								]}
								selected={value ?? { label: "Apples", value: "apples" }}
								setSelected={onChange}
								label="My input"
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
