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
          className={hiddenLabel ? "sr-only" : "mb-1 ml-1 opacity-80"}
        >
          {label}
        </label>
        <div className="relative">
          {isRequired && (
            <span className="absolute left-0 -translate-x-full pr-2 text-2xl">
              *
            </span>
          )}
          <textarea
            id={id}
            className={`duration-50 w-full border bg-neutral-100 px-3 py-1.5 text-site-main transition-colors focus-within:border-neutral-600 focus-within:outline-none ${
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
