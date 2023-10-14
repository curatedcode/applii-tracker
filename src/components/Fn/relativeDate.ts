import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import { SortByType } from "@/src/customVariables";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    past: "1m",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1yr",
    yy: "%dyr",
  },
  config: {
    thresholds: [
      { l: "s", r: 1 },
      { l: "m", r: 1 },
      { l: "mm", r: 59, d: "minute" },
      { l: "h", r: 1 },
      { l: "hh", r: 23, d: "hour" },
      { l: "d", r: 1 },
      { l: "dd", r: 29, d: "day" },
      { l: "M", r: 1 },
      { l: "MM", r: 11, d: "month" },
      { l: "y", r: 1 },
      { l: "yy", d: "year" },
    ],
  },
});

export default function relativeDate(
  date: string,
  sortBy: SortByType,
): {
  time: string;
  title: string;
} {
  const currentDate = dayjs();
  const dateFrom = currentDate.from(date, true);

  if (sortBy === "dateCreated") {
    return { time: dateFrom, title: `Created ${dateFrom} ago` };
  }
  return { time: dateFrom, title: `Updated ${dateFrom} ago` };
}
