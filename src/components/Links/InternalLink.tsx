import { InternalLinkProps } from "@/src/utils/customVariables";
import Link from "next/link";

export default function InternalLink({
  className,
  children,
  ...props
}: InternalLinkProps) {
  return (
    <Link
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-all duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
