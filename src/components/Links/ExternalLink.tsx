import { defaultFocusHoverClasses } from "@/src/types/global";

export type ExternalLinkProps = {
  href: string;
  style?: "button" | "underline";
  title?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  openInNewTab?: boolean;
};

export default function ExternalLink({
  children,
  style,
  className,
  openInNewTab = true,
  ...props
}: ExternalLinkProps) {
  if (style === "button") {
    return (
      <a
        rel="nofollow noreferrer"
        target={openInNewTab ? "_blank" : "_self"}
        className={`${defaultFocusHoverClasses} flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  if (style === "underline") {
    return (
      <a
        rel="nofollow noreferrer"
        target={openInNewTab ? "_blank" : "_self"}
        className={`${defaultFocusHoverClasses} underline underline-offset-1 ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      rel="nofollow noreferrer"
      target={openInNewTab ? "_blank" : "_self"}
      className={`${defaultFocusHoverClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
