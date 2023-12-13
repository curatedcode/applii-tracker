import generateMetricLabels from "@/src/components/Metrics/generateMetricLabels";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("metric labels", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("1 year labels", () => {
    vi.setSystemTime("05/05/2023");

    const labels = generateMetricLabels("1 year");

    expect(labels).toStrictEqual([
      "May, 2022",
      "Jun, 2022",
      "Jul, 2022",
      "Aug, 2022",
      "Sep, 2022",
      "Oct, 2022",
      "Nov, 2022",
      "Dec, 2022",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
    ]);
  });

  test("6 months labels", () => {
    vi.setSystemTime("02/05/2023");

    const labels = generateMetricLabels("6 months");

    expect(labels).toStrictEqual([
      "Sep, 2022",
      "Oct, 2022",
      "Nov, 2022",
      "Dec, 2022",
      "Jan",
      "Feb",
    ]);
  });

  test("1 month labels", () => {
    vi.setSystemTime("01/12/2023");

    const labels = generateMetricLabels("1 month");
    expect(labels).toStrictEqual([
      "12/12/22 - 12/19/22",
      "12/20/22 - 12/27/22",
      "12/28/22 - 01/04",
      "01/05 - 01/12",
    ]);
  });

  test("1 month labels", () => {
    vi.setSystemTime("10/05/2023");

    const labels = generateMetricLabels("1 month");
    expect(labels).toStrictEqual([
      "09/04 - 09/11",
      "09/12 - 09/19",
      "09/20 - 09/27",
      "09/28 - 10/05",
    ]);
  });

  test("1 week labels", () => {
    vi.setSystemTime("01/05/2023");

    const labels = generateMetricLabels("1 week");

    expect(labels).toStrictEqual([
      "12/30/22",
      "12/31/22",
      "01/01",
      "01/02",
      "01/03",
      "01/04",
      "01/05",
    ]);
  });
});
