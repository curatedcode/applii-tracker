import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = {
  style?: "transparent";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  if (style === "transparent") {
    return (
      <button className={`px-4 py-1.5 font-bold` + className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={`px-4 py-1.5 font-bold` + className} {...props}>
      {children}
    </button>
  );
}
