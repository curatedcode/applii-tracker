import { defaultFocusClassName } from "@/src/types/global";
import { UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export type FormInputProps = {
  id: string;
  type?: "text" | "email" | "date" | "number";
  label: string;
  registerName?: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  placeholder?: string;
  isRequired?: boolean;
};

export default function FormInput({
  id,
  type,
  label,
  registerName,
  register,
  error,
  className,
  placeholder,
  isRequired,
}: FormInputProps) {
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
          id={id}
          type={type ?? "text"}
          aria-required={isRequired}
          placeholder={placeholder}
          className={`w-full rounded-md bg-light-secondary px-3 py-1.5 transition-all placeholder:opacity-70 dark:bg-dark-secondary ${defaultFocusClassName} ${
            error ? "ring-1 ring-red-500" : ""
          }`}
          {...register(registerName ?? id)}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
}
