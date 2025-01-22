import type { zApplication } from "@/src/types/db";
import type { TimelineType } from "@/src/types/global";
import type { FormattedChartDataType } from "@/src/types/metrics";
import formatApplicationData from "./formatApplicationData";
import generateSimpleMetrics, {
	type GenerateSimpleMetricsReturnType,
} from "./generateSimpleMetrics";
import groupApplicationsByDateRange from "./groupApplicationsByDateRange";

export type GenerateMetricsProps = {
	timeline: TimelineType;
	applications: zApplication["GET"][];
};

export type GenerateMetricsReturnType = {
	chartData: FormattedChartDataType[];
	simpleMetrics: GenerateSimpleMetricsReturnType;
};

export default function generateMetrics({
	timeline,
	applications,
}: GenerateMetricsProps): GenerateMetricsReturnType {
	const applicationsInDateRange = groupApplicationsByDateRange({
		applications,
		timeline,
	});

	const simpleMetrics = generateSimpleMetrics(applicationsInDateRange);

	const dataFormatted = formatApplicationData(applicationsInDateRange);

	return {
		chartData: dataFormatted,
		simpleMetrics,
	};
}
