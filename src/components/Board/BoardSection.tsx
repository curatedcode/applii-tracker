import {
	ApplicationStatusType,
	ApplicationType,
	applicationStatusLabel,
} from "@/src/types/applications";
import { SortByValueType } from "@/src/types/global";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
	ArchiveBoxXMarkIcon,
	ChatBubbleBottomCenterTextIcon,
	ClockIcon,
	EnvelopeIcon,
	TrophyIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { z } from "zod";
import LandingBoardSectionCard from "../Landing/BoardSectionCard";
import BoardSectionCard from "./BoardSectionCard";

type DefaultSectionType = {
	mode?: "default";
	title: z.infer<typeof applicationStatusLabel>;
	sortBy: SortByValueType;
	status: ApplicationStatusType;
};

type DemoSectionType = {
	mode: "demo";
	title: z.infer<typeof applicationStatusLabel>;
	sortBy: SortByValueType;
};

type LandingSectionType = {
	mode: "landing";
	title: "Need To Apply" | "Offer";
};

export type BoardSectionProps = {
	cards: ApplicationType[];
	className?: string;
	status: ApplicationStatusType;
} & (DefaultSectionType | DemoSectionType | LandingSectionType);

export default function BoardSection(props: BoardSectionProps) {
	const { mode, cards, className } = props;
	let quickCreateLink = "";

	switch (mode) {
		case "demo":
			quickCreateLink = `/demo/applications/create?status=${props}`;
			break;
		case "landing":
			quickCreateLink = "";
			break;
		default:
			quickCreateLink = `/boards/applications/create?status=${props.status}`;
	}

	function Icon(): React.ReactNode {
		switch (props.status) {
			case "needToApply":
				return (
					<ClockIcon
						className="w-5 text-applii-needToApply"
						aria-hidden="true"
					/>
				);
			case "applied":
				return <EnvelopeIcon className="w-5 text-applii-applied" />;
			case "interviewing":
				return (
					<ChatBubbleBottomCenterTextIcon
						className="w-5 text-applii-interviewing"
						aria-hidden="true"
					/>
				);
			case "offer":
				return (
					<TrophyIcon className="w-5 text-applii-offer" aria-hidden="true" />
				);
			case "closed":
				return (
					<ArchiveBoxXMarkIcon
						className="w-5 text-applii-closed"
						aria-hidden="true"
					/>
				);
		}
	}

	return (
		<div
			className={`grid w-full max-w-board-section gap-1 rounded-md border-[3px] border-light-secondary bg-light-secondary p-1 py-2 ring-2 ring-light-tertiary dark:border-dark-secondary dark:bg-dark-secondary dark:ring-dark-tertiary text-light-text dark:text-dark-text ${className}`}
		>
			<div className="relative flex items-center justify-between gap-1 px-2">
				<h2 className="flex gap-2 text-lg font-medium">
					{Icon()}
					<span>{props.title}</span>
				</h2>
				{mode === "landing" ? (
					<div>
						<PlusCircleIcon
							className="h-6 w-6 transition-opacity hover:opacity-80"
							aria-hidden="true"
						/>
					</div>
				) : (
					<Link
						href={quickCreateLink}
						aria-label={`Create new ${props.title} application`}
					>
						<PlusCircleIcon
							className="h-6 w-6 transition-opacity hover:opacity-80"
							aria-hidden="true"
						/>
					</Link>
				)}
			</div>
			<div className="grid h-board-section w-full auto-rows-min gap-2 overflow-auto px-2 py-1">
				{cards.length > 0 ? (
					mode === "landing" ? (
						cards.map((card) => (
							<LandingBoardSectionCard key={card.id} {...card} />
						))
					) : (
						cards.map((card) => (
							<BoardSectionCard
								key={card.id}
								mode={mode}
								sortBy={props.sortBy}
								{...card}
							/>
						))
					)
				) : (
					<span className="mt-4 justify-self-center">
						Nothing to show yet...
					</span>
				)}
			</div>
		</div>
	);
}
