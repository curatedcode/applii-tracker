import { StandardButtonProps } from "@/src/customVariables";

export default function Button({
  style,
  children,
  className,
  type = "button",
  ...props
}: StandardButtonProps) {
  if (style === "outline") {
    return (
      <button
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md border-2 border-neutral-100 px-4 py-1.5 text-center font-medium transition-opacity focus-within:opacity-80 focus-within:outline-none hover:opacity-80 ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (style === "transparent") {
    return (
      <button
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md border-2 border-transparent px-4 py-1.5 text-center font-medium transition-opacity focus-within:opacity-80 focus-within:outline-none hover:opacity-80 ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 rounded-md border-2 bg-neutral-100 px-4 py-1.5 text-center font-medium text-black transition-opacity focus-within:opacity-80 focus-within:outline-none hover:opacity-80 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
