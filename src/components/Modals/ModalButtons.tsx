import Button, { ButtonType, LinkType } from "../Button";

export type ModalButtonType = {
	body: React.ReactNode;
} & (ButtonType | LinkType);

export type ModalButtonsProps = {
	primaryButton: ModalButtonType;
	secondaryButton: ModalButtonType;
	closeModal: () => void;
};

export default function ModalButtons({
	primaryButton,
	secondaryButton,
	closeModal,
}: ModalButtonsProps) {
	const { body: primaryButtonBody, ...primaryButtonProps } = primaryButton;
	const { body: secondaryButtonBody, ...secondaryButtonProps } =
		secondaryButton;

	return (
		<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-6">
			<Button
				{...secondaryButtonProps}
				onClick={() => {
					closeModal();
					if (secondaryButtonProps.onClick) {
						secondaryButtonProps.onClick();
					}
				}}
			>
				{secondaryButtonBody}
			</Button>
			<Button
				{...primaryButtonProps}
				style="inverse"
				onClick={() => {
					closeModal();
					if (primaryButtonProps.onClick) {
						primaryButtonProps.onClick();
					}
				}}
			>
				{primaryButtonBody}
			</Button>
		</div>
	);
}
