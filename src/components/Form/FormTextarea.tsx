import {
  FormTextareaProps,
  defaultFocusClassName,
} from "@/src/utils/customVariables";
import ErrorMessage from "./ErrorMessage";

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
          className={`w-full resize-none rounded-md bg-light-secondary px-3 py-1.5 outline-none transition-all duration-100 placeholder:opacity-70 dark:bg-dark-secondary ${
            error ? "ring-1 ring-red-500" : ""
          } ${defaultFocusClassName}`}
          aria-required={isRequired}
          {...props}
          {...register(registerName ?? id)}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
}
