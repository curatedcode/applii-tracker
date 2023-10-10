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
  TimelineType,
  applicationColors,
} from "@/src/customVariables";
import { useEffect, useState } from "react";
import { getApplicationMetrics } from "@/src/db";
import MetricsSkeleton from "@/src/components/Loading/MetricsSkeleton";

ChartJS.defaults.color = "#F5F5F5";

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

  const [timeline, setTimeline] = useState<TimelineType>("1 month");

  useEffect(() => {
    getApplicationMetrics(timeline).then((data) => setMetricsData(data));
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
      <div aria-live="polite" className="sr-only">
        <p>Loaded metrics.</p>
      </div>
      <div className="-mt-4 mb-12 flex items-center gap-2 justify-self-center text-sm">
        <label htmlFor="sortByInput" className="mb-1 font-semibold">
          Sort by:
        </label>
        <select
          id="sortByInput"
          className="duration-50 h-fit w-fit rounded-md border border-transparent bg-site-section px-2 py-1 text-base transition-colors focus-within:border-inherit focus-within:outline-none"
          onChange={(e) => setTimeline(e.currentTarget.value as TimelineType)}
          defaultValue={"1 month"}
        >
          <option value="1 week">1 week</option>
          <option value="1 month">1 month</option>
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
        </select>
      </div>
      <div className="grid w-full max-w-6xl justify-items-center gap-12 justify-self-center md:gap-20">
        <div className="grid h-fit w-full max-w-xs text-xl">
          <h1 className="mb-6 w-fit justify-self-center px-1 text-2xl font-semibold">
            Percent in each stage
          </h1>
          {simpleStats.percents.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{stat.label}:</span>
              <span>{stat.percent}</span>
            </div>
          ))}
          <span className="mt-2 flex w-full justify-end border-t-2 pt-1 font-semibold">
            Total Applications: {simpleStats.totalApplications}
          </span>
        </div>
        <div className="hidden w-full text-neutral-100 md:block">
          <Bar
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
        </div>
        <div className="mt-12 justify-self-center font-semibold md:hidden">
          <span>Switch to landscape mode to view chart.</span>
        </div>
      </div>
    </>
  );
}
