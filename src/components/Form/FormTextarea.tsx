import { FormTextareaProps } from "@/src/utils/customVariables";
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
          className={`w-full resize-none rounded-md bg-light-secondary px-3 py-1.5 outline-none transition-all duration-100 placeholder:opacity-70 focus-within:outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${
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
