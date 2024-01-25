import { ArrayFieldProps } from "@/src/types/applications";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useFieldArray } from "react-hook-form";
import Button from "../Button";
import FormInput from "./FormInput";

export default function ContactsFields({
	register,
	control,
	className,
}: ArrayFieldProps) {
	const { fields, append, remove } = useFieldArray({
		name: "contacts",
		control,
	});

	return (
		<div className={`grid w-full auto-rows-min ${className}`}>
			<h2 className="mb-6 w-fit justify-self-center border-b px-1 text-lg font-semibold">
				Contacts
			</h2>
			<ul className="grid md:max-h-96 md:overflow-y-scroll md:p-0.5">
				{fields.map((field, index) => (
					<li key={field.id} className="mb-6 grid gap-3">
						<FormInput
							id={`contactNameInput${index}`}
							label="Name"
							registerName={`contacts.${index}.name`}
							register={register}
							isRequired
						/>
						<FormInput
							id={`contactPositionInput${index}`}
							label="Position"
							registerName={`contacts.${index}.position`}
							register={register}
						/>
						<FormInput
							id={`contactPhoneInput${index}`}
							label="Phone"
							registerName={`contacts.${index}.phone`}
							register={register}
						/>
						<FormInput
							id={`contactEmailInput${index}`}
							label="Email"
							registerName={`contacts.${index}.email`}
							register={register}
						/>
						<Button
							onClick={() => remove(index)}
							className="mr-2 mt-1 justify-self-end"
							title={`Delete Contact ${index + 1}`}
							style="icon"
						>
							<TrashIcon aria-hidden="true" className="w-5" />
						</Button>
					</li>
				))}
			</ul>
			<Button
				onClick={() =>
					append({
						name: "",
						position: "",
						phone: "",
						email: "",
					})
				}
				className={`justify-self-center ${
					fields.length > 0 ? "md:mt-2" : "md:-mt-1"
				}`}
			>
				<UserPlusIcon className="w-4" aria-hidden="true" />
				<span>Add Contact</span>
			</Button>
		</div>
	);
}
