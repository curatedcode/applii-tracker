import type { ArrayFieldProps } from "@/src/types/applications";
import { defaultFocusHoverClasses } from "@/src/types/global";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type ForwardedRef, forwardRef } from "react";
import { useFieldArray } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "./ErrorMessage";

export type CustomFieldsProps = Omit<ArrayFieldProps, "className">;

export default function CustomFields({ register, control }: CustomFieldsProps) {
	const { fields, append, remove } = useFieldArray({
		name: "customFields",
		control,
	});

	return (
		<>
			{fields.map((field, index) => (
				<li key={field.id} className="mb-6 grid gap-3">
					<div className="flex items-center">
						<span className="mb-1 ml-1 text-sm leading-tight opacity-80 md:w-32">
							Custom Field
						</span>
						<div className="flex flex-col w-full gap-3">
							<FormInput
								id={`customFieldLabelInput${index}`}
								label={"Label"}
								{...register(`customFields.${index}.label`)}
							/>
							<FormInput
								id={`customFieldLabelValue${index}`}
								label="Value"
								{...register(`customFields.${index}.value`)}
							/>
						</div>
					</div>
					<Button
						onClick={() => remove(index)}
						className="mr-0.5 justify-self-end"
						title={`Delete Contact ${index + 1}`}
						style="icon"
					>
						<TrashIcon aria-hidden="true" className="w-5" />
					</Button>
				</li>
			))}
			<Button
				onClick={() =>
					append({
						label: "",
						value: "",
					})
				}
				className={`justify-self-center ${
					fields.length > 0 ? "md:mt-2" : "md:mt-1"
				}`}
			>
				<PlusIcon className="w-4" aria-hidden="true" />
				<span>Add field</span>
			</Button>
		</>
	);
}

type FormInputProps = {
	id: string;
	label: string;
	error?: string;
	placeholder?: string;
} & UseFormRegisterReturn<string>;

const FormInput = forwardRef(
	(props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
		const { id, label, error, placeholder, ...rest } = props;

		return (
			<div className="grid gap-1">
				<div className="flex flex-col">
					<label
						htmlFor={id}
						className="mb-1 ml-1 flex gap-1 text-sm leading-tight opacity-80 md:w-32"
					>
						{label}
					</label>
					<input
						{...rest}
						id={id}
						type={"text"}
						placeholder={placeholder}
						className={`${defaultFocusHoverClasses} w-full rounded-md bg-light-secondary px-3 py-1.5 placeholder:opacity-70 dark:bg-dark-secondary ${
							error ? "ring-1 ring-red-500" : ""
						}`}
						ref={ref}
					/>
				</div>
				<ErrorMessage error={error} />
			</div>
		);
	},
);
