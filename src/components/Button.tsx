import Link from "next/link";
import { defaultFocusHoverClasses } from "../types/global";

export type ButtonType = {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit";
};

export type LinkType = {
  as: "link";
  href: string;
  onClick?: () => void;
};

export type ButtonProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: "icon" | "inverse" | "default";
} & (ButtonType | LinkType);

export default function Button(props: ButtonProps) {
  const { as, style, className, children, ...rest } = props;

  if (as === "link") {
    if (style === "icon") {
      return (
        <Link
          className={`${defaultFocusHoverClasses} whitespace-nowrap rounded-md bg-light-secondary p-1.5 font-medium dark:bg-dark-secondary ${className}`}
          href={props.href}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    if (style === "inverse") {
      return (
        <Link
          className={`${defaultFocusHoverClasses} flex h-fit min-w-button items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-white dark:bg-light-secondary dark:text-light-text ${className}`}
          href={props.href}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        className={`${defaultFocusHoverClasses} flex h-fit min-w-button items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
        href={props.href}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  if (style === "icon") {
    return (
      <button
        className={`${defaultFocusHoverClasses} whitespace-nowrap rounded-md bg-light-secondary p-1.5 font-medium dark:bg-dark-secondary ${className}`}
        type={props.type ?? "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (style === "inverse") {
    return (
      <button
        className={`${defaultFocusHoverClasses} flex h-fit min-w-button items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-white dark:bg-light-secondary dark:text-light-text ${className}`}
        type={props.type ?? "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${defaultFocusHoverClasses} flex h-fit min-w-button items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
      type={props.type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
