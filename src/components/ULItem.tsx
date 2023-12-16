import ExternalLink from "./ExternalLink";

export type ULItemProps = {
  label: string;
  body: string;
  isLink?: boolean;
  className?: string;
  hiddenLabel?: boolean;
};

export default function ULItem({
  label,
  body,
  isLink,
  className,
  hiddenLabel,
}: ULItemProps) {
  return (
    <li className={`grid gap-1 xs:flex xs:gap-2 ${className}`}>
      <span
        className={
          hiddenLabel ? "sr-only" : "min-w-[8rem] max-w-[8rem] font-semibold"
        }
      >
        {label}:
      </span>
      {isLink ? (
        <ExternalLink
          href={body}
          className="break-all underline underline-offset-1"
        >
          {body}
        </ExternalLink>
      ) : (
        <p className="break-all">{body}</p>
      )}
    </li>
  );
}
