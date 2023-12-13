import { FullApplicationType } from "@/src/types/applications";
import { TimelineType } from "@/src/types/global";
import { FormattedChartDataType } from "@/src/types/metrics";
import formatApplicationData from "./formatApplicationData";
import generateMetricLabels from "./generateMetricLabels";
import generateSimpleMetrics, {
  GenerateSimpleMetricsReturnType,
} from "./generateSimpleMetrics";
import groupApplicationsByDateRange from "./groupApplicationsByDateRange";

export type GenerateMetricsProps = {
  timeline: TimelineType;
  applications: FullApplicationType[];
};

export type GenerateMetricsReturnType = {
  chartData: FormattedChartDataType[];
  simpleMetrics: GenerateSimpleMetricsReturnType;
};

export default function generateMetrics({
  timeline,
  applications,
}: GenerateMetricsProps): GenerateMetricsReturnType {
  const labels = generateMetricLabels(timeline);
  const applicationsInDateRange = groupApplicationsByDateRange({
    applications,
    timeline,
    labels,
  });

  const simpleMetrics = generateSimpleMetrics(applicationsInDateRange);

  const dataFormatted = formatApplicationData(applicationsInDateRange);

  return {
    chartData: dataFormatted,
    simpleMetrics,
  };
}
