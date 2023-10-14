import generateMetricLabels from "@/src/components/Fn/generateMetricLabels";
import dayjs from "dayjs";
import { afterEach, beforeEach } from "vitest";
import { describe, expect, test, vi } from "vitest";

describe("metric labels", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("1 week labels", () => {
    const fakeDate = dayjs("10/05/2023").toISOString();
    vi.setSystemTime(fakeDate);

    const labels = generateMetricLabels("1 week");

    expect(labels).toStrictEqual([
      "9/29",
      "9/30",
      "10/1",
      "10/2",
      "10/3",
      "10/4",
      "10/5",
    ]);
  });

  test("1 month labels", () => {
    const fakeDate = dayjs("10/05/2023").toISOString();
    vi.setSystemTime(fakeDate);

    const labels = generateMetricLabels("1 month");

    expect(labels).toStrictEqual([
      "9/5 - 9/12",
      "9/13 - 9/20",
      "9/21 - 9/28",
      "9/29 - 10/6",
    ]);
  });

  test("6 months labels", () => {
    const fakeDate = dayjs("10/05/2023").toISOString();
    vi.setSystemTime(fakeDate);

    const labels = generateMetricLabels("6 months");

    expect(labels).toStrictEqual(["May", "Jun", "Jul", "Aug", "Sep", "Oct"]);
  });

  test("1 year labels", () => {
    const fakeDate = dayjs("10/05/2023").toISOString();
    vi.setSystemTime(fakeDate);

    const labels = generateMetricLabels("1 year");

    expect(labels).toStrictEqual([
      "Oct, 2022",
      "Nov, 2022",
      "Dec, 2022",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ]);
  });
});
