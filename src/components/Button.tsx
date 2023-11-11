import { StandardButtonProps } from "@/src/utils/customVariables";

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
        className={`h-fit w-fit whitespace-nowrap rounded-md p-0.5 font-medium transition-opacity hover:opacity-80 ${className}`}
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
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-main px-5 py-2 text-center text-sm font-medium text-light-text outline-none transition-all duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-main dark:text-dark-text dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
