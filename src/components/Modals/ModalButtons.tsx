import Button from "../Button";
import InternalLink from "../Links/InternalLink";

type ButtonType = {
  as: "button";
  onClick?: () => void;
  type?: "button" | "submit";
};

type LinkType = {
  as: "link";
  href: string;
};

export type ModalButtonType = {
  body: string | React.ReactNode;
} & (ButtonType | LinkType);

export type ModalButtonsProps = {
  primaryButton: ModalButtonType;
  secondaryButton: ModalButtonType;
};

export default function ModalButtons({
  primaryButton,
  secondaryButton,
}: ModalButtonsProps) {
  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
      {secondaryButton.as === "button" ? (
        <Button onClick={secondaryButton.onClick} type={secondaryButton.type}>
          {secondaryButton.body}
        </Button>
      ) : (
        <InternalLink href={secondaryButton.href}>
          {secondaryButton.body}
        </InternalLink>
      )}
      {primaryButton.as === "button" ? (
        <Button
          onClick={primaryButton.onClick}
          style="inverse"
          type={primaryButton.type}
        >
          {primaryButton.body}
        </Button>
      ) : (
        <InternalLink href={primaryButton.href} style="inverse">
          {primaryButton.body}
        </InternalLink>
      )}
    </div>
  );
}
