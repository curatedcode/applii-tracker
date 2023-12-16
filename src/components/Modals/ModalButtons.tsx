import Button, { ButtonType, LinkType } from "../Button";

export type ModalButtonType = {
  body: React.ReactNode;
} & (ButtonType | LinkType);

export type ModalButtonsProps = {
  primaryButton: ModalButtonType;
  secondaryButton: ModalButtonType;
};

export default function ModalButtons({
  primaryButton,
  secondaryButton,
}: ModalButtonsProps) {
  const { body: primaryButtonBody, ...primaryButtonProps } = primaryButton;
  const { body: secondaryButtonBody, ...secondaryButtonProps } =
    secondaryButton;

  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
      <Button {...secondaryButtonProps}>{secondaryButtonBody}</Button>
      <Button {...primaryButtonProps} style="inverse">
        {primaryButtonBody}
      </Button>
    </div>
  );
}
