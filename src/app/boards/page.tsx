"use client";
import { useEffect, useState } from "react";

import BoardSection from "@/src/components/Board/BoardSection";
import IndexedDBNotSupported from "@/src/components/IndexedDBNotSupported";
import HomeSkeleton from "@/src/components/Loading/HomeSkeleton";
import SelectInput from "@/src/components/SelectInput";
import { GroupedApplicationsType } from "@/src/types/applications";
import {
	OptionType,
	SortByLabelType,
	SortByValueType,
	sortByOptions,
} from "@/src/types/global";
import { getAllApplications } from "@/src/utils/db";

export default function Home() {
	const [allApplications, setAllApplications] =
		useState<GroupedApplicationsType>();
	const [isIndexedDBSupported, setIsIndexedDBSupported] =
		useState<boolean>(true);

	const [sortBy, setSortBy] = useState<
		OptionType<SortByLabelType, SortByValueType>
	>(sortByOptions[1]);

	useEffect(() => {
		if (!window) return;
		if (!window.indexedDB) {
			setIsIndexedDBSupported(false);
			return;
		}
		getAllApplications(sortBy.value, "grouped").then((data) =>
			setAllApplications(data),
		);
	}, [sortBy]);

	if (!isIndexedDBSupported) return <IndexedDBNotSupported />;

	if (!allApplications) return <HomeSkeleton />;

	const { needToApply, applied, interviewing, offer, closed } = allApplications;

	return (
		<>
			<div id="loadingHome" aria-live="polite" className="sr-only">
				<p>Loaded applications.</p>
			</div>
			<div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-center md:gap-4">
				<h1 className="text-3xl font-semibold">All applications</h1>
				<div className="h-0 border-l border-l-light-tertiary dark:border-l-dark-tertiary md:h-full" />
				<SelectInput
					options={sortByOptions}
					selected={sortBy}
					setSelected={setSortBy}
				/>
			</div>
			<div className="flex w-full flex-wrap justify-center gap-4 justify-self-center">
				<BoardSection
					title="Need To Apply"
					cards={needToApply}
					sortBy={sortBy.value}
					status="needToApply"
				/>
				<BoardSection
					title="Applied"
					cards={applied}
					sortBy={sortBy.value}
					status="applied"
				/>
				<BoardSection
					title="Interviewing"
					cards={interviewing}
					sortBy={sortBy.value}
					status="interviewing"
				/>
				<BoardSection
					title="Offer"
					cards={offer}
					sortBy={sortBy.value}
					status="offer"
				/>
				<BoardSection
					title="Closed"
					cards={closed}
					sortBy={sortBy.value}
					status="closed"
				/>
			</div>
		</>
	);
}
