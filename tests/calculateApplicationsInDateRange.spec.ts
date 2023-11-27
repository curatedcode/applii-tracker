import calculateApplicationsInDateRange from "@/src/components/Fn/calculateApplicationsInDateRange";
import { FullApplicationType } from "@/src/utils/customVariables";
import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const standardDateCreated = dayjs("03/12/2023").toISOString();

const mockNeedToApplyApps: FullApplicationType[] = [
  {
    id: 1,
    position: "Engineer",
    company: "Microsoft",
    status: "needToApply",
    dateCreated: dayjs("12/18/2022").toISOString(),
    dateModified: dayjs("12/18/2022").toISOString(),
  },
  {
    id: 2,
    position: "Engineer",
    company: "Microsoft",
    status: "needToApply",
    dateCreated: dayjs("02/23/2023").toISOString(),
    dateModified: dayjs("02/23/2023").toISOString(),
  },
  {
    id: 3,
    position: "Engineer",
    company: "Microsoft",
    status: "needToApply",
    dateCreated: dayjs("06/16/2023").toISOString(),
    dateModified: dayjs("06/16/2023").toISOString(),
  },
  {
    id: 4,
    position: "Engineer",
    company: "Microsoft",
    status: "needToApply",
    dateCreated: dayjs("09/01/2023").toISOString(),
    dateModified: dayjs("09/01/2023").toISOString(),
  },
  {
    id: 5,
    position: "Engineer",
    company: "Microsoft",
    status: "needToApply",
    dateCreated: dayjs("10/04/2023").toISOString(),
    dateModified: dayjs("10/04/2023").toISOString(),
  },
];

const mockAppliedApps: FullApplicationType[] = [
  {
    id: 1,
    position: "Engineer",
    company: "Microsoft",
    status: "applied",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateApplied: dayjs("12/18/2022").toISOString(),
  },
  {
    id: 2,
    position: "Engineer",
    company: "Microsoft",
    status: "applied",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateApplied: dayjs("02/23/2023").toISOString(),
  },
  {
    id: 3,
    position: "Engineer",
    company: "Microsoft",
    status: "applied",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateApplied: dayjs("06/16/2023").toISOString(),
  },
  {
    id: 4,
    position: "Engineer",
    company: "Microsoft",
    status: "applied",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateApplied: dayjs("09/01/2023").toISOString(),
  },
  {
    id: 5,
    position: "Engineer",
    company: "Microsoft",
    status: "applied",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateApplied: dayjs("10/04/2023").toISOString(),
  },
];

const mockInterviewingApps: FullApplicationType[] = [
  {
    id: 1,
    position: "Engineer",
    company: "Microsoft",
    status: "interviewing",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateInterviewing: dayjs("12/18/2022").toISOString(),
  },
  {
    id: 2,
    position: "Engineer",
    company: "Microsoft",
    status: "interviewing",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateInterviewing: dayjs("02/23/2023").toISOString(),
  },
  {
    id: 3,
    position: "Engineer",
    company: "Microsoft",
    status: "interviewing",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateInterviewing: dayjs("06/16/2023").toISOString(),
  },
  {
    id: 4,
    position: "Engineer",
    company: "Microsoft",
    status: "interviewing",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateInterviewing: dayjs("09/01/2023").toISOString(),
  },
  {
    id: 5,
    position: "Engineer",
    company: "Microsoft",
    status: "interviewing",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateInterviewing: dayjs("10/04/2023").toISOString(),
  },
];

const mockOfferApps: FullApplicationType[] = [
  {
    id: 1,
    position: "Engineer",
    company: "Microsoft",
    status: "offer",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateOffered: dayjs("12/18/2022").toISOString(),
  },
  {
    id: 2,
    position: "Engineer",
    company: "Microsoft",
    status: "offer",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateOffered: dayjs("02/23/2023").toISOString(),
  },
  {
    id: 3,
    position: "Engineer",
    company: "Microsoft",
    status: "offer",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateOffered: dayjs("06/16/2023").toISOString(),
  },
  {
    id: 4,
    position: "Engineer",
    company: "Microsoft",
    status: "offer",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateOffered: dayjs("09/01/2023").toISOString(),
  },
  {
    id: 5,
    position: "Engineer",
    company: "Microsoft",
    status: "offer",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateOffered: dayjs("10/04/2023").toISOString(),
  },
];

const mockClosedApps: FullApplicationType[] = [
  {
    id: 1,
    position: "Engineer",
    company: "Microsoft",
    status: "closed",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateClosed: dayjs("12/18/2022").toISOString(),
  },
  {
    id: 2,
    position: "Engineer",
    company: "Microsoft",
    status: "closed",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateClosed: dayjs("02/23/2023").toISOString(),
  },
  {
    id: 3,
    position: "Engineer",
    company: "Microsoft",
    status: "closed",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateClosed: dayjs("06/16/2023").toISOString(),
  },
  {
    id: 4,
    position: "Engineer",
    company: "Microsoft",
    status: "closed",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateClosed: dayjs("09/01/2023").toISOString(),
  },
  {
    id: 5,
    position: "Engineer",
    company: "Microsoft",
    status: "closed",
    dateCreated: standardDateCreated,
    dateModified: standardDateCreated,
    dateClosed: dayjs("10/04/2023").toISOString(),
  },
];

const mockWeekLabels = ["9/29", "9/30", "10/1", "10/2", "10/3", "10/4", "10/5"];
const mockOneMonthLabels = [
  "9/5 - 9/12",
  "9/13 - 9/20",
  "9/21 - 9/28",
  "9/29 - 10/6",
];
const mockSixMonthLabels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const mockYearLabels = [
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
];

describe.sequential("applications in each date range", () => {
  describe("need to apply applications", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("apps in 1 week", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockNeedToApplyApps,
        dateType: "dateCreated",
        labels: mockWeekLabels,
        timeline: "1 week",
      });

      expect(result).toStrictEqual([0, 0, 0, 0, 0, 1, 0]);
    });

    test("apps in 1 month", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockNeedToApplyApps,
        dateType: "dateCreated",
        labels: mockOneMonthLabels,
        timeline: "1 month",
      });

      expect(result).toStrictEqual([0, 0, 0, 1]);
    });

    test("apps in 6 months", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockNeedToApplyApps,
        dateType: "dateCreated",
        labels: mockSixMonthLabels,
        timeline: "6 months",
      });

      expect(result).toStrictEqual([0, 1, 0, 0, 1, 1]);
    });

    test("apps in 1 year", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockNeedToApplyApps,
        dateType: "dateCreated",
        labels: mockYearLabels,
        timeline: "1 year",
      });

      expect(result).toStrictEqual([0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]);
    });
  });

  describe("applied applications", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("apps in 1 week", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockAppliedApps,
        dateType: "dateApplied",
        labels: mockWeekLabels,
        timeline: "1 week",
      });

      expect(result).toStrictEqual([0, 0, 0, 0, 0, 1, 0]);
    });

    test("apps in 1 month", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockAppliedApps,
        dateType: "dateApplied",
        labels: mockOneMonthLabels,
        timeline: "1 month",
      });

      expect(result).toStrictEqual([0, 0, 0, 1]);
    });

    test("apps in 6 months", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockAppliedApps,
        dateType: "dateApplied",
        labels: mockSixMonthLabels,
        timeline: "6 months",
      });

      expect(result).toStrictEqual([0, 1, 0, 0, 1, 1]);
    });

    test("apps in 1 year", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockAppliedApps,
        dateType: "dateApplied",
        labels: mockYearLabels,
        timeline: "1 year",
      });

      expect(result).toStrictEqual([0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]);
    });
  });

  describe("interviewing applications", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("apps in 1 week", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockInterviewingApps,
        dateType: "dateInterviewing",
        labels: mockWeekLabels,
        timeline: "1 week",
      });

      expect(result).toStrictEqual([0, 0, 0, 0, 0, 1, 0]);
    });

    test("apps in 1 month", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockInterviewingApps,
        dateType: "dateInterviewing",
        labels: mockOneMonthLabels,
        timeline: "1 month",
      });

      expect(result).toStrictEqual([0, 0, 0, 1]);
    });

    test("apps in 6 months", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockInterviewingApps,
        dateType: "dateInterviewing",
        labels: mockSixMonthLabels,
        timeline: "6 months",
      });

      expect(result).toStrictEqual([0, 1, 0, 0, 1, 1]);
    });

    test("apps in 1 year", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockInterviewingApps,
        dateType: "dateInterviewing",
        labels: mockYearLabels,
        timeline: "1 year",
      });

      expect(result).toStrictEqual([0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]);
    });
  });

  describe("offered applications", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("apps in 1 week", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockOfferApps,
        dateType: "dateOffered",
        labels: mockWeekLabels,
        timeline: "1 week",
      });

      expect(result).toStrictEqual([0, 0, 0, 0, 0, 1, 0]);
    });

    test("apps in 1 month", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockOfferApps,
        dateType: "dateOffered",
        labels: mockOneMonthLabels,
        timeline: "1 month",
      });

      expect(result).toStrictEqual([0, 0, 0, 1]);
    });

    test("apps in 6 months", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockOfferApps,
        dateType: "dateOffered",
        labels: mockSixMonthLabels,
        timeline: "6 months",
      });

      expect(result).toStrictEqual([0, 1, 0, 0, 1, 1]);
    });

    test("apps in 1 year", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockOfferApps,
        dateType: "dateOffered",
        labels: mockYearLabels,
        timeline: "1 year",
      });

      expect(result).toStrictEqual([0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]);
    });
  });

  describe("closed applications", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    test("apps in 1 week", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockClosedApps,
        dateType: "dateClosed",
        labels: mockWeekLabels,
        timeline: "1 week",
      });

      expect(result).toStrictEqual([0, 0, 0, 0, 0, 1, 0]);
    });

    test("apps in 1 month", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockClosedApps,
        dateType: "dateClosed",
        labels: mockOneMonthLabels,
        timeline: "1 month",
      });

      expect(result).toStrictEqual([0, 0, 0, 1]);
    });

    test("apps in 6 months", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockClosedApps,
        dateType: "dateClosed",
        labels: mockSixMonthLabels,
        timeline: "6 months",
      });

      expect(result).toStrictEqual([0, 1, 0, 0, 1, 1]);
    });

    test("apps in 1 year", () => {
      const fakeDate = dayjs("10/05/2023").toISOString();
      vi.setSystemTime(fakeDate);

      const result = calculateApplicationsInDateRange({
        applications: mockClosedApps,
        dateType: "dateClosed",
        labels: mockYearLabels,
        timeline: "1 year",
      });

      expect(result).toStrictEqual([0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]);
    });
  });
});
