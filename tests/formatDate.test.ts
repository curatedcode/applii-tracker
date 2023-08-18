import { expect, it, vi, describe, beforeEach, afterEach } from "vitest";
import formatDate from "../src/components/formatDate";

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

    const fakeNow = new Date(2023, 3, 30, 1, 0, 1);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1m",
      title: "Last updated 1m ago",
    });
  });

  it("should return 5 seconds ago as 1m", () => {
    const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2023, 3, 30, 1, 0, 5);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1m",
      title: "Last updated 1m ago",
    });
  });

  it("should return 59 seconds ago as 1m", () => {
    const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2023, 3, 30, 1, 0, 59);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1m",
      title: "Last updated 1m ago",
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

    const fakeNow = new Date(2023, 3, 30, 1, 1, 0);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1m",
      title: "Last updated 1m ago",
    });
  });

  it("should return 5m", () => {
    const fakeSystemDate = new Date(2023, 3, 30, 1, 0, 0);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2023, 3, 30, 1, 5);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "5m",
      title: "Last updated 5m ago",
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

    const fakeNow = new Date(2023, 3, 30, 1, 0);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1h",
      title: "Last updated 1h ago",
    });
  });

  it("should return 5h", () => {
    const fakeSystemDate = new Date(2023, 3, 30, 0, 0, 0);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2023, 3, 30, 5, 0);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "5h",
      title: "Last updated 5h ago",
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

    const fakeNow = new Date(2023, 3, 29);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1d",
      title: "Last updated 1d ago",
    });
  });

  it("should return 5d", () => {
    const fakeSystemDate = new Date(2023, 3, 30);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2023, 3, 25);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "5d",
      title: "Last updated 5d ago",
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

    const fakeNow = new Date(2023, 2, 28);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1mo",
      title: "Last updated 1mo ago",
    });
  });

  it("should return 10mo", () => {
    const fakeSystemDate = new Date(2023, 3, 28);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2022, 5, 28);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "10mo",
      title: "Last updated 10mo ago",
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

    const fakeNow = new Date(2022, 3, 28);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "1yr",
      title: "Last updated 1yr ago",
    });
  });

  it("should return 5yr", () => {
    const fakeSystemDate = new Date(2023, 3, 30);
    vi.setSystemTime(fakeSystemDate);

    const fakeNow = new Date(2018, 3, 30);

    expect(formatDate(fakeNow)).toStrictEqual({
      time: "5yr",
      title: "Last updated 5yr ago",
    });
  });
});
