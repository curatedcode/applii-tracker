import { applicationStatusLabel } from "@/src/types/applications";
import { statusColors } from "@/src/types/global";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { BarTooltipProps, ComputedDatum, ResponsiveBar } from "@nivo/bar";
import {
	FormattedChartDataType,
	chartStageKeys,
	colorVisibleAcrossThemes,
} from "../../types/metrics";

export type ChartProps = {
	data: FormattedChartDataType[];
};

export function Chart({ data }: ChartProps) {
	function getBarColor(e: ComputedDatum<FormattedChartDataType>): `#${string}` {
		const isStatus = applicationStatusLabel.safeParse(e.id);
		if (!isStatus.success) return colorVisibleAcrossThemes;

		const status = isStatus.data;
		if (status === "Need To Apply") return statusColors.needToApply;
		if (status === "Applied") return statusColors.applied;
		if (status === "Interviewing") return statusColors.interviewing;
		if (status === "Offer") return statusColors.offer;
		if (status === "Closed") return statusColors.closed;

		return colorVisibleAcrossThemes;
	}

	return (
		<>
			<div
				role="status"
				className="flex w-fit gap-2 justify-self-center rounded-md bg-light-secondary px-3 py-1.5 text-sm dark:bg-dark-secondary sm:hidden"
			>
				<ExclamationCircleIcon
					className="w-5 text-yellow-300"
					aria-hidden="true"
				/>
				<p>Rotate your device to view the chart</p>
			</div>
			<div
				id="metricsChart"
				className="mb-4 hidden h-96 w-full overflow-hidden text-light-text dark:text-dark-text sm:flex"
			>
				<ResponsiveBar
					data={data}
					keys={chartStageKeys}
					indexBy="date"
					margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
					padding={0.3}
					valueScale={{ type: "linear" }}
					indexScale={{ type: "band", round: true }}
					colors={(e) => getBarColor(e)}
					theme={{
						grid: { line: { opacity: "10%" } },
						text: { fill: colorVisibleAcrossThemes, fontWeight: 500 },
					}}
					borderColor={{
						from: "color",
						modifiers: [["darker", 1.8]],
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Date",
						legendPosition: "middle",
						legendOffset: 40,
						truncateTickAt: 0,
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Applications",
						legendPosition: "middle",
						legendOffset: -40,
						truncateTickAt: 0,
					}}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: "color",
						modifiers: [["darker", 1.8]],
					}}
					tooltip={(e) => <ChartTooltip {...e} />}
					legends={[
						{
							dataFrom: "keys",
							anchor: "top",
							direction: "row",
							justify: false,
							translateX: 0,
							translateY: -50,
							itemsSpacing: 2,
							itemWidth: 80,
							itemHeight: 20,
							itemDirection: "top-to-bottom",
							symbolSize: 20,
						},
					]}
					motionConfig={"stiff"}
					role="application"
					ariaLabel="Bar graph showing the number of job applications that made it to each stage: need to apply, applied, interviewing, offer, and closed"
					barAriaLabel={(e) =>
						`In ${e.indexValue} there were ${e.formattedValue} applications in the ${e.id} stage`
					}
				/>
			</div>
		</>
	);
}

function ChartTooltip({
	id,
	indexValue,
	color,
	formattedValue,
}: BarTooltipProps<FormattedChartDataType>) {
	return (
		<div
			role="tooltip"
			className="invisible flex animate-appear items-center gap-1 rounded-md bg-light-secondary px-3 py-1.5 font-medium shadow dark:bg-dark-secondary"
		>
			<div
				aria-hidden="true"
				className="h-4 w-4"
				style={{ backgroundColor: color }}
			/>
			<span>
				{indexValue}: {id} - {formattedValue}
			</span>
		</div>
	);
}
