import { InternalLinkProps } from "@/src/customVariables";
import Link from "next/link";

export default function InternalLink({
  style,
  className,
  children,
  ...props
}: InternalLinkProps) {
  if (style === "outline") {
    return (
      <Link
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md border-2 border-neutral-100 px-4 py-1.5 text-center font-medium transition-opacity focus-within:opacity-80 focus-within:outline-none hover:opacity-80 ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md border-2 bg-neutral-100 px-4 py-1.5 text-center font-medium text-black transition-opacity focus-within:opacity-80 focus-within:outline-none hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
