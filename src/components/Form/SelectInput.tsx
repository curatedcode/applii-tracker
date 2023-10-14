import { FormSelectProps } from "@/src/customVariables";

export default function FormSelect({
  id,
  label,
  options,
  registerName,
  register,
  error,
  hiddenLabel,
  className,
  isRequired,
}: FormSelectProps) {
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
          <select
            id={id}
            className={`duration-50 h-10 w-full border bg-neutral-100 px-3 py-1.5 text-site-main transition-colors focus-within:border-neutral-600 focus-within:outline-none ${
              error ? "border-red-500 focus-within:!border-red-500" : ""
            }`}
            aria-required={isRequired}
            {...register(registerName ?? id)}
          >
            {options.map((option, index) => (
              <option value={option.id} key={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
