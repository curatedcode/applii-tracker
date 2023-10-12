import dayjs from "dayjs";

export default function formatDate(date: string) {
  const dateDayJS = dayjs(date);
  const isSameYear = dateDayJS.year() === dayjs().year();

  if (isSameYear) {
    return dateDayJS.format("MM/DD");
  }

  return dateDayJS.format("MM/DD/YYYY");
}
