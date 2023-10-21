import { ULItemProps } from "../utils/customVariables";
import ExternalLink from "./Links/ExternalLink";

export default function DLGroup({
  label,
  body,
  isLink,
  className,
}: ULItemProps) {
  return (
    <li className={`grid grid-cols-3 gap-2 ${className}`}>
      <span className="font-semibold">{label}:</span>
      {isLink ? (
        <ExternalLink
          href={body}
          className="col-span-2 truncate underline underline-offset-2"
        >
          {body}
        </ExternalLink>
      ) : (
        <p className="col-span-2 break-words">{body}</p>
      )}
    </li>
  );
}
