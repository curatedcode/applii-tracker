"use client";

import getAllDemoApplications from "@/src/components/Demo/getAllDemoApplications";
import MetricsSkeleton from "@/src/components/Loading/MetricsSkeleton";
import { Chart } from "@/src/components/Metrics/Chart";
import generateMetrics, {
	GenerateMetricsReturnType,
} from "@/src/components/Metrics/generateMetrics";
import SelectInput from "@/src/components/SelectInput";
import { TimelineLabelValueType, timelineOptions } from "@/src/types/global";
import { useEffect, useState } from "react";

export default function Metrics() {
	const [metricsData, setMetricsData] = useState<GenerateMetricsReturnType>();

	const [timeline, setTimeline] = useState<TimelineLabelValueType>(
		timelineOptions[3],
	);

	useEffect(() => {
		setMetricsData(
			generateMetrics({
				timeline: timeline.value,
				applications: getAllDemoApplications("dateCreated"),
			}),
		);
	}, [timeline]);

	if (!metricsData) return <MetricsSkeleton />;

	const { chartData, simpleMetrics } = metricsData;

	return (
		<>
			<div id="loadingMetrics" aria-live="polite" className="sr-only">
				<p>Loaded metrics.</p>
			</div>
			<div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-center md:gap-4">
				<h1 className="text-3xl font-semibold">Metrics</h1>
				<div className="h-0 border-l md:h-full" />
				<SelectInput
					options={timelineOptions}
					selected={timeline}
					setSelected={setTimeline}
				/>
			</div>
			<div className="grid w-full max-w-6xl justify-items-center gap-12 justify-self-center md:gap-20">
				<Chart data={chartData} />
				<div className="grid h-fit w-full max-w-sm gap-2 divide-y divide-light-secondary rounded-md border border-light-secondary py-2 shadow shadow-light-tertiary dark:divide-dark-secondary dark:border-dark-secondary dark:shadow-dark-tertiary sm:-mt-12 sm:text-lg">
					<h1 className="px-3 text-center text-xl font-semibold sm:text-2xl">
						Applications in each stage
					</h1>
					<div className="px-3 pb-1 pt-2">
						{simpleMetrics.percentages.map((stat) => (
							<div
								key={crypto.randomUUID()}
								className="flex items-center justify-between"
							>
								<span>{stat.label}:</span>
								<span>{stat.percentage}</span>
							</div>
						))}
					</div>
					<div className="flex justify-between px-3 pt-2">
						<span>Total applications:</span>
						<span>{simpleMetrics.totalApplications}</span>
					</div>
				</div>
			</div>
		</>
	);
}
