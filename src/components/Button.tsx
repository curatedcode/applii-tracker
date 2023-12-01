import {
  StandardButtonProps,
  defaultFocusClassName,
} from "@/src/utils/customVariables";

export default function Button({
  style,
  children,
  className,
  type = "button",
  ...props
}: StandardButtonProps) {
  if (style === "icon") {
    return (
      <button
        className={`whitespace-nowrap rounded-md bg-light-secondary p-1.5 font-medium transition-opacity hover:opacity-90 dark:bg-dark-secondary ${defaultFocusClassName} ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (style === "shaded") {
    return (
      <button
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-primary px-5 py-2 text-center text-sm font-medium text-light-text transition-all hover:opacity-90 dark:bg-dark-primary dark:text-dark-text ${defaultFocusClassName} ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (style === "outline") {
    return (
      <button
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text outline-none ring-1 ring-light-secondary transition-all hover:bg-light-secondary hover:opacity-90  dark:text-dark-text  dark:hover:bg-dark-secondary ${defaultFocusClassName} ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (style === "inverse") {
    return (
      <button
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text transition-all hover:opacity-90 dark:bg-light-secondary dark:text-light-text ${defaultFocusClassName} ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all hover:opacity-90 dark:bg-dark-secondary ${defaultFocusClassName} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
