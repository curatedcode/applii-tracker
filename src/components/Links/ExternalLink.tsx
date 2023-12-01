import {
  ExternalLinkProps,
  defaultFocusClassName,
} from "../../utils/customVariables";

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
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium dark:bg-dark-secondary ${defaultFocusClassName} ${className}`}
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
        className={`underline underline-offset-1 transition-opacity hover:opacity-80 ${defaultFocusClassName} ${className}`}
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
      className={`${defaultFocusClassName} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
