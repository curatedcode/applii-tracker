import { InternalLinkProps } from "@/src/utils/customVariables";
import Link from "next/link";

export default function InternalLink({
  style,
  className,
  children,
  ...props
}: InternalLinkProps) {
  if (style === "button") {
    return (
      <Link
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all duration-100 focus-within:outline-none hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "buttonShaded") {
    return (
      <Link
        className={`bg-light-primary dark:bg-dark-primary flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text outline-none transition-all duration-100 focus-within:outline-none hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:text-dark-text dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "outline") {
    return (
      <Link
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text outline-none ring-1 ring-light-secondary transition-all duration-100 focus-within:outline-none hover:bg-light-secondary hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:text-dark-text dark:ring-dark-secondary dark:hover:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (style === "inverse") {
    return (
      <Link
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text outline-none transition-all duration-100 focus-within:outline-none hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-light-secondary focus-visible:ring-opacity-75 focus-visible:ring-offset-light-secondary dark:bg-light-secondary dark:text-light-text dark:focus-visible:ring-black dark:focus-visible:ring-offset-black ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all duration-100 focus-within:outline-none hover:opacity-90 focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
