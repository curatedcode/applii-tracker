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
      <div id="loadingMetrics" aria-live="polite" className="sr-only">
        <p>Loaded metrics.</p>
      </div>
      <div className="mb-12 grid justify-items-center gap-2 justify-self-center text-sm md:flex md:items-end md:gap-4">
        <h1 className="text-3xl font-semibold">Metrics</h1>
        <div className="h-0 border-l md:h-full"></div>
        <div className="flex items-center gap-2">
          <label htmlFor="sortByInput" className="mb-0.5 font-semibold">
            Range:
          </label>
          <select
            id="sortByInput"
            className="duration-50 h-fit rounded-md border border-neutral-600 bg-site-section px-3 py-1.5 transition-colors focus-within:border-inherit focus-within:outline-none"
            onChange={(e) => setTimeline(e.currentTarget.value as TimelineType)}
            defaultValue={"1 month"}
          >
            <option value="1 week" className="bg-site-section">
              1 week
            </option>
            <option value="1 month" className="bg-site-section">
              1 month
            </option>
            <option value="6 months" className="bg-site-section">
              6 months
            </option>
            <option value="1 year" className="bg-site-section">
              1 year
            </option>
          </select>
        </div>
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
        </div>
        <div className="mt-12 justify-self-center font-semibold md:hidden">
          <span>Switch to landscape mode to view chart.</span>
        </div>
      </div>
    </>
  );
}
