import { expect, it, vi, describe, beforeEach, afterEach } from "vitest";
import relativeDate from "../src/components/Fn/relativeDate";

describe("Relative time with created label", () => {
  describe("seconds being returned as minutes", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1 second ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 1).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1m",
        title: "Created 1m ago",
      });
    });

    it("should return 5 seconds ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 5).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1m",
        title: "Created 1m ago",
      });
    });

    it("should return 59 seconds ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 59).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1m",
        title: "Created 1m ago",
      });
    });
  });

  describe("minutes", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 1, 0).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1m",
        title: "Created 1m ago",
      });
    });

    it("should return 5m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 5).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "5m",
        title: "Created 5m ago",
      });
    });
  });

  describe("hours", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1h", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 0, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1h",
        title: "Created 1h ago",
      });
    });

    it("should return 5h", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 0, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 5, 0).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "5h",
        title: "Created 5h ago",
      });
    });
  });

  describe("days", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1d", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 29).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1d",
        title: "Created 1d ago",
      });
    });

    it("should return 5d", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 25).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "5d",
        title: "Created 5d ago",
      });
    });
  });

  describe("months", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1mo", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 2, 28).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1mo",
        title: "Created 1mo ago",
      });
    });

    it("should return 10mo", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2022, 5, 28).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "10mo",
        title: "Created 10mo ago",
      });
    });
  });

  describe("dates outside of current day", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1yr", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2022, 3, 28).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "1yr",
        title: "Created 1yr ago",
      });
    });

    it("should return 5yr", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2018, 3, 30).toISOString();

      expect(relativeDate(fakeNow, "dateCreated")).toStrictEqual({
        time: "5yr",
        title: "Created 5yr ago",
      });
    });
  });
});

describe("Relative date with updated label", () => {
  describe("seconds being returned as minutes", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1 second ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 1).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1m",
        title: "Updated 1m ago",
      });
    });

    it("should return 5 seconds ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 5).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1m",
        title: "Updated 1m ago",
      });
    });

    it("should return 59 seconds ago as 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0, 59).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1m",
        title: "Updated 1m ago",
      });
    });
  });

  describe("minutes", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 1, 0).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1m",
        title: "Updated 1m ago",
      });
    });

    it("should return 5m", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 5).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "5m",
        title: "Updated 5m ago",
      });
    });
  });

  describe("hours", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1h", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 0, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 1, 0).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1h",
        title: "Updated 1h ago",
      });
    });

    it("should return 5h", () => {
      const fakeSystemDate = new Date(2023, 3, 30, 0, 0, 0);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 30, 5, 0).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "5h",
        title: "Updated 5h ago",
      });
    });
  });

  describe("days", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1d", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 29).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1d",
        title: "Updated 1d ago",
      });
    });

    it("should return 5d", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 3, 25).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "5d",
        title: "Updated 5d ago",
      });
    });
  });

  describe("months", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1mo", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2023, 2, 28).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1mo",
        title: "Updated 1mo ago",
      });
    });

    it("should return 10mo", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2022, 5, 28).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "10mo",
        title: "Updated 10mo ago",
      });
    });
  });

  describe("dates outside of current day", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return 1yr", () => {
      const fakeSystemDate = new Date(2023, 3, 28);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2022, 3, 28).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "1yr",
        title: "Updated 1yr ago",
      });
    });

    it("should return 5yr", () => {
      const fakeSystemDate = new Date(2023, 3, 30);
      vi.setSystemTime(fakeSystemDate);

      const fakeNow = new Date(2018, 3, 30).toISOString();

      expect(relativeDate(fakeNow, "dateModified")).toStrictEqual({
        time: "5yr",
        title: "Updated 5yr ago",
      });
    });
  });
});
