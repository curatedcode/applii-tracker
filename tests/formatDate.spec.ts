import formatDate from "@/src/components/Fn/formatDate";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("format date", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("return date without year", () => {
    const systemTime = new Date("10/05/2023");
    vi.setSystemTime(systemTime);

    const date = new Date("10/11/2023").toISOString();
    const result = formatDate(date);

    expect(result).toStrictEqual("10/11");
  });

  test("return date with year", () => {
    const systemTime = new Date("10/05/2023");
    vi.setSystemTime(systemTime);

    const date = new Date("10/11/2022").toISOString();
    const result = formatDate(date);

    expect(result).toStrictEqual("10/11/2022");
  });
});
