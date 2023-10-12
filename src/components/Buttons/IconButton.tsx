import { IconButtonProps } from "@/src/customVariables";

export default function IconButton({
  className,
  type = "button",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`h-fit w-fit rounded-md p-0.5 font-medium transition-opacity hover:opacity-80 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
