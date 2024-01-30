import { ApplicationType } from "@/src/types/applications";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ClockIcon, TrophyIcon } from "@heroicons/react/24/solid";
import BoardSectionCard from "./BoardSectionCard";

export type LandingBoardSectionProps = {
	title: "Need To Apply" | "Offer";
	cards: ApplicationType[];
	className?: string;
};

export default function BoardSection({
	title,
	cards,
	className,
}: LandingBoardSectionProps) {
	return (
		<div
			className={`grid w-full max-w-board-section gap-1 rounded-md border-[3px] border-light-secondary bg-light-secondary p-1 py-2 shadow-lg shadow-light-tertiary ring-2 ring-light-tertiary dark:border-dark-secondary dark:bg-dark-secondary dark:shadow-dark-tertiary dark:ring-dark-tertiary ${className}`}
		>
			<div className="relative flex items-center justify-between gap-1 px-2">
				<h2 className="flex gap-2 text-lg font-medium">
					{title === "Need To Apply" ? (
						<ClockIcon
							className="w-5 text-applii-needToApply"
							aria-hidden="true"
						/>
					) : (
						<TrophyIcon className="w-5 text-applii-offer" aria-hidden="true" />
					)}
					<span>{title}</span>
				</h2>
				<div>
					<PlusCircleIcon
						className="h-6 w-6 transition-opacity hover:opacity-80"
						aria-hidden="true"
					/>
				</div>
			</div>
			<div className="grid h-board-section w-full auto-rows-min gap-2 overflow-auto px-2 py-1">
				{cards.map((card) => (
					<BoardSectionCard key={crypto.randomUUID()} {...card} />
				))}
			</div>
		</div>
	);
}
