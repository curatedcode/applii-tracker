import { formSchema } from "@/src/types/applications";
import type { Meta, StoryObj } from "@storybook/react";
import { FormWrapper } from "../../../.storybook/helpers";
import ContactFields from "./ContactFields";

type Story = StoryObj<typeof meta>;

function Template() {
	return (
		<FormWrapper schema={formSchema}>
			{({ methods }) => (
				<ContactFields register={methods.register} control={methods.control} />
			)}
		</FormWrapper>
	);
}

const meta = {
	title: "Form/Contact Fields",
	component: Template,
	tags: ["autodocs"],
} satisfies Meta<typeof Template>;

export const Default: Story = {};

export default meta;
