import { defaultFocusHoverClasses } from "@/src/types/global";
import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export type FormTextareaProps = {
	id: string;
	label: string;
	rows?: number;
	registerName?: string;
	// biome-ignore lint/suspicious/noExplicitAny: Type safety isn't needed on this
	register: UseFormRegister<any>;
	error?: string;
	className?: string;
	placeholder?: string;
	isRequired?: boolean;
};

export default function FormTextarea({
	id,
	label,
	registerName,
	register,
	error,
	className,
	isRequired,
	...props
}: FormTextareaProps) {
	return (
		<div className={`grid gap-1 ${className}`}>
			<div className="flex flex-col md:flex-row md:gap-1">
				<label htmlFor={id} className="sr-only">
					{label}
				</label>
				<textarea
					id={id}
					className={`${defaultFocusHoverClasses} w-full resize-none rounded-md bg-light-secondary px-3 py-1.5 placeholder:opacity-70 dark:bg-dark-secondary ${
						error ? "ring-1 ring-red-500" : ""
					}`}
					aria-required={isRequired}
					{...props}
					{...register(registerName ?? id)}
				/>
			</div>
			<ErrorMessage error={error} />
		</div>
	);
}
