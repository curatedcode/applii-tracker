import getContrastingColor from "../Fn/getContrastingColor";

export type BoardSectionCardMockProps = {
	bgColor: string;
	className?: string;
	company?: string;
	position?: string;
};

function BoardSectionCardMock({
	bgColor,
	className,
	company,
	position,
}: BoardSectionCardMockProps) {
	const positionLabel =
		position && position.length > 0 ? position : "Account Manager";
	const companyLabel =
		company && company.length > 0 ? company : "Leading Company";

	const hexColor = bgColor.slice(1);

	return (
		<div
			className={`h-board-section-card max-w-board-section w-full rounded-md px-3 py-2 text-black ${className}`}
			style={{ backgroundColor: bgColor, color: getContrastingColor(hexColor) }}
			data-axe-ignore={true}
		>
			<div className="relative flex h-full flex-col justify-between">
				<div className="grid font-medium">
					<span className="line-clamp-1">{positionLabel}</span>
					<span className="line-clamp-1">{companyLabel}</span>
				</div>
				<span className="absolute bottom-0.5 right-0 text-sm">1m</span>
			</div>
		</div>
	);
}

export default BoardSectionCardMock;
