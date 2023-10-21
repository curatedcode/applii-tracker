import { ExternalLinkProps } from "../../utils/customVariables";

export default function ExternalLink({
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a rel="nofollow noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}
