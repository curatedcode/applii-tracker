import { defaultFocusHoverClasses } from "@/src/types/global";
import Link from "next/link";

export type InternalLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
  style?: "buttonShaded" | "button" | "outline" | "inverse";
};

export default function InternalLink({
  style,
  className,
  children,
  ...props
}: InternalLinkProps) {
  if (style === "button") {
    return (
      <Link
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "buttonShaded") {
    return (
      <Link
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-primary px-5 py-2 text-center text-sm font-medium text-light-text dark:bg-dark-primary dark:text-dark-text ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "outline") {
    return (
      <Link
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text ring-1 ring-light-secondary hover:bg-light-secondary dark:text-dark-text dark:ring-dark-secondary dark:hover:bg-dark-secondary ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "inverse") {
    return (
      <Link
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text dark:bg-light-secondary dark:text-light-text ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
