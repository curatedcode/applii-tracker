import { defaultFocusHoverClasses } from "../types/global";

export type ButtonProps = {
  id?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  title?: string;
  style?: "icon" | "shaded" | "outline" | "inverse";
};

export default function Button({
  style,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  if (style === "icon") {
    return (
      <button
        className={`${defaultFocusHoverClasses} whitespace-nowrap rounded-md bg-light-secondary p-1.5 font-medium dark:bg-dark-secondary ${className}`}
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
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-primary px-5 py-2 text-center text-sm font-medium text-light-text dark:bg-dark-primary dark:text-dark-text ${className}`}
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
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text ring-1 ring-light-secondary hover:bg-light-secondary dark:text-dark-text dark:hover:bg-dark-secondary ${className}`}
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
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text dark:bg-light-secondary dark:text-light-text ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
