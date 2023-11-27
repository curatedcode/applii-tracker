import { ExternalLinkProps } from "../../utils/customVariables";

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
        className={`flex h-fit min-w-[6rem] items-center justify-center gap-1 whitespace-nowrap rounded-md bg-light-secondary px-5 py-2 text-center text-sm font-medium outline-none transition-colors duration-100 focus-within:outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-opacity-75 focus-visible:ring-offset-black dark:bg-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary ${className}`}
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
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
