"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  GetApplicationMetricsReturnType,
  TimelineLabelValueType,
  applicationColors,
  timelineOptions,
} from "@/src/utils/customVariables";
import { useEffect, useState } from "react";
import { getApplicationMetrics } from "@/src/utils/db";
import MetricsSkeleton from "@/src/components/Loading/MetricsSkeleton";
import SelectInput from "@/src/components/SelectInput";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Metrics() {
  const [metricsData, setMetricsData] =
    useState<GetApplicationMetricsReturnType>();

  const [timeline, setTimeline] = useState<TimelineLabelValueType>(
    timelineOptions[3],
  );

  useEffect(() => {
    getApplicationMetrics(timeline.value).then((data) => setMetricsData(data));
  }, [timeline]);

  if (!metricsData) return <MetricsSkeleton />;

  const {
    needToApply,
    applied,
    interviewing,
    offer,
    closed,
    labels,
    simpleStats,
  } = metricsData;

  return (
    <>
      <div id="loadingMetrics" aria-live="polite" className="sr-only">
        <p>Loaded metrics.</p>
      </div>
      <div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-center md:gap-4">
        <h1 className="text-3xl font-semibold">Metrics</h1>
        <div className="h-0 border-l md:h-full"></div>
        <SelectInput
          options={timelineOptions}
          selected={timeline}
          setSelected={setTimeline}
        />
      </div>
      <div className="grid w-full max-w-6xl justify-items-center gap-12 justify-self-center md:gap-20">
        <Bar
          id="metricsChart"
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom" as const,
                labels: {
                  font: {
                    size: 16,
                    weight: "500",
                  },
                },
                title: {
                  display: true,
                  padding: 6,
                },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                label: "Need To Apply",
                data: needToApply,
                backgroundColor: applicationColors.needToApply,
              },
              {
                label: "Applied",
                data: applied,
                backgroundColor: applicationColors.applied,
              },
              {
                label: "Interview",
                data: interviewing,
                backgroundColor: applicationColors.interviewing,
              },
              {
                label: "Offer",
                data: offer,
                backgroundColor: applicationColors.offer,
              },
              {
                label: "Closed",
                data: closed,
                backgroundColor: applicationColors.closed,
              },
            ],
          }}
        />
        <div className="grid h-fit w-full max-w-sm rounded-md bg-light-secondary px-4 py-3 text-lg dark:bg-dark-secondary">
          <h1 className="mb-3 text-center text-2xl font-semibold">
            Percent in each stage
          </h1>
          {simpleStats.percents.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{stat.label}:</span>
              <span>{stat.percent}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
