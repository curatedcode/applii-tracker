import { FormInputProps } from "@/src/utils/customVariables";

export default function FormInput({
  id,
  type,
  label,
  registerName,
  register,
  error,
  className,
  placeholder,
  hiddenLabel,
  isRequired,
}: FormInputProps) {
  return (
    <div className={`grid gap-1 ${className}`}>
      <div className="grid">
        <label
          htmlFor={id}
          className={hiddenLabel ? "sr-only" : "mb-1 ml-1 opacity-80"}
        >
          {label}
        </label>
        <div className="relative">
          {isRequired && (
            <span className="absolute left-0 top-1/4 -translate-x-full -translate-y-1/4 pr-2 text-sm">
              *
            </span>
          )}
          <input
            id={id}
            type={type ?? "text"}
            placeholder={placeholder}
            aria-required={isRequired}
            className={`h-10 w-full rounded-md bg-light-secondary px-3 py-1.5 transition-all duration-100 placeholder:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${
              error ? "border-red-500 focus-within:!border-red-500" : ""
            }`}
            {...register(registerName ?? id)}
          />
        </div>
      </div>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
