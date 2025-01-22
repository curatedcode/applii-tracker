import { defaultFocusHoverClasses } from "@/src/types/global";
import { type ForwardedRef, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export type FormTextareaProps = {
	id: string;
	label: string;
	rows?: number;
	error?: string;
	className?: string;
	placeholder?: string;
	isRequired?: boolean;
} & UseFormRegisterReturn<string>;

const FormTextarea = forwardRef(
	(props: FormTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
		const { id, label, error, className, isRequired, ...rest } = props;

		return (
			<div className={`grid gap-1 ${className}`}>
				<div className="flex flex-col md:flex-row md:gap-1">
					<label htmlFor={id} className="sr-only">
						{label}
					</label>
					<textarea
						{...rest}
						id={id}
						className={`${defaultFocusHoverClasses} w-full resize-none rounded-md bg-light-secondary px-3 py-1.5 placeholder:opacity-70 dark:bg-dark-secondary ${
							error ? "ring-1 ring-red-500" : ""
						}`}
						aria-required={isRequired}
						ref={ref}
					/>
				</div>
				<ErrorMessage error={error} />
			</div>
		);
	},
);

export default FormTextarea;
