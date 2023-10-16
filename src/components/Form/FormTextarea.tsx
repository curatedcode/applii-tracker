import { FormTextareaProps } from "@/src/customVariables";

export default function FormTextarea({
  id,
  label,
  registerName,
  register,
  error,
  className,
  hiddenLabel,
  isRequired,
  ...props
}: FormTextareaProps) {
  return (
    <div className={`grid gap-1 ${className}`}>
      <div className="grid gap-1">
        <label
          htmlFor={id}
          className={hiddenLabel ? "sr-only" : "ml-1 opacity-80"}
        >
          {label}
        </label>
        <div className="relative">
          {isRequired && (
            <span className="absolute left-0 -translate-x-full pr-2 text-sm">
              *
            </span>
          )}
          <textarea
            id={id}
            className={`content-scrollbar w-full resize-none rounded-md bg-light-secondary px-3 py-1.5 outline-none transition-all duration-100 placeholder:opacity-70 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${
              error ? "border-red-500 focus-within:!border-red-500" : ""
            }`}
            aria-required={isRequired}
            {...props}
            {...register(registerName ?? id)}
          />
        </div>
      </div>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
