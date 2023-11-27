import { ULItemProps } from "../utils/customVariables";
import ExternalLink from "./Links/ExternalLink";

export default function ULItem({
  label,
  body,
  isLink,
  className,
  hiddenLabel,
}: ULItemProps) {
  return (
    <li className={`flex gap-2 ${className}`}>
      <span className={hiddenLabel ? "sr-only" : "w-32 font-semibold"}>
        {label}:
      </span>
      {isLink ? (
        <ExternalLink
          href={body}
          className="truncate underline underline-offset-2"
        >
          {body}
        </ExternalLink>
      ) : (
        <p className="break-words">{body}</p>
      )}
    </li>
  );
}
