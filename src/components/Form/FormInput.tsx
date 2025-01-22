"use client";
import { defaultFocusHoverClasses } from "@/src/types/global";
import { type ForwardedRef, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export type FormInputProps = {
	id: string;
	type?: "text" | "email" | "date" | "number";
	label: string;
	error?: string;
	className?: string;
	placeholder?: string;
	isRequired?: boolean;
} & UseFormRegisterReturn<string>;

const FormInput = forwardRef(
	(props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
		const {
			id,
			type,
			label,
			error,
			className,
			placeholder,
			isRequired,
			...rest
		} = props;

		return (
			<div className={`grid gap-1 ${className}`}>
				<div className="flex flex-col md:flex-row md:items-center md:gap-1">
					<label
						htmlFor={id}
						className="mb-1 ml-1 flex gap-1 text-sm leading-tight opacity-80 md:w-32"
					>
						{label}
						{isRequired && <span className="text-red-500">*</span>}
					</label>
					<input
						{...rest}
						id={id}
						type={type ?? "text"}
						aria-required={isRequired}
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

export default FormInput;
