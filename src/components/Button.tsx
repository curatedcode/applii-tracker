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
};

export type ButtonProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  style?: "icon" | "shaded" | "outline" | "inverse";
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

    if (style === "shaded") {
      return (
        <Link
          className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-primary px-5 py-2 text-center text-sm font-medium text-light-text dark:bg-dark-primary dark:text-dark-text ${className}`}
          href={props.href}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    if (style === "outline") {
      return (
        <Link
          className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text ring-1 ring-light-secondary hover:bg-light-secondary dark:text-dark-text dark:hover:bg-dark-secondary ${className}`}
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
          className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text dark:bg-light-secondary dark:text-light-text ${className}`}
          href={props.href}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <Link
        className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
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

  if (style === "shaded") {
    return (
      <button
        className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-primary px-5 py-2 text-center text-sm font-medium text-light-text dark:bg-dark-primary dark:text-dark-text ${className}`}
        type={props.type ?? "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (style === "outline") {
    return (
      <button
        className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md px-5 py-2 text-center text-sm font-medium text-light-text ring-1 ring-light-secondary hover:bg-light-secondary dark:text-dark-text dark:hover:bg-dark-secondary ${className}`}
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
        className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-dark-secondary px-5 py-2 text-center text-sm font-medium text-dark-text dark:bg-light-secondary dark:text-light-text ${className}`}
        type={props.type ?? "button"}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${defaultFocusHoverClasses} min-w-button flex h-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
      type={props.type ?? "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
