import { ApplicationType } from "@/src/types/applications";
import { TimelineType } from "@/src/types/global";
import { FormattedChartDataType } from "@/src/types/metrics";
import formatApplicationData from "./formatApplicationData";
import generateSimpleMetrics, {
	GenerateSimpleMetricsReturnType,
} from "./generateSimpleMetrics";
import groupApplicationsByDateRange from "./groupApplicationsByDateRange";

export type GenerateMetricsProps = {
	timeline: TimelineType;
	applications: ApplicationType[];
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
