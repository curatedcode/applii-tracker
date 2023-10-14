import { FormInputProps } from "@/src/customVariables";

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
      <div className="grid gap-1">
        <label
          htmlFor={id}
          className={hiddenLabel ? "sr-only" : "mb-1 ml-1 opacity-80"}
        >
          {label}
        </label>
        <div className="relative">
          {isRequired && (
            <span className="absolute left-0 top-1/4 -translate-x-full -translate-y-1/4 pr-2 text-2xl">
              *
            </span>
          )}
          <input
            id={id}
            type={type ?? "text"}
            placeholder={placeholder}
            aria-required={isRequired}
            className={`duration-50 h-10 w-full border bg-neutral-100 px-3 py-1.5 text-site-main transition-colors focus-within:border-neutral-600 focus-within:outline-none ${
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
