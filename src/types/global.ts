type GrowToSizeType<
  T,
  N extends number,
  A extends T[],
  L extends number = A["length"],
> = L extends N ? A : L extends 999 ? T[] : GrowToSizeType<T, N, [...A, T]>;
export type FixedArrayType<T, N extends number> = GrowToSizeType<T, N, []>;

export async function promiseSeries(array: Promise<unknown>[]) {
  for (const promise of array) {
    await promise;
  }
}

// If you update this you need to change the tailwind config safelist accordingly
export const defaultFocusHoverClasses =
  "outline-none transition focus-within:outline-none hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-secondary focus-visible:ring-opacity-75 focus-visible:ring-offset-dark-secondary dark:focus-visible:ring-light-secondary dark:focus-visible:ring-offset-light-secondary";

export type TimelineType = "1 week" | "1 month" | "6 months" | "1 year";

export type TimelineLabelValueType = {
  label: TimelineType;
  value: TimelineType;
};

export const timelineOptions: TimelineLabelValueType[] = [
  { label: "1 week", value: "1 week" },
  { label: "1 month", value: "1 month" },
  { label: "6 months", value: "6 months" },
  { label: "1 year", value: "1 year" },
];

export type ThemesType = "light" | "dark" | "system";
export type ThemeLabels = "Light" | "Dark" | "System";

export const themes: ThemesType[] = ["light", "dark", "system"];
export const themesLabels: ThemeLabels[] = ["Light", "Dark", "System"];

export type ThemeOption = {
  label: ThemeLabels;
  value: ThemesType;
};

export const themeOptions: ThemeOption[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

export type SortByValueType = "dateModified" | "dateCreated";
export type SortByLabelType = "Date Modified" | "Date Created";

export type OptionType<TLabel, TValue> = {
  label: TLabel;
  value: TValue;
};

export const sortByOptions: OptionType<SortByLabelType, SortByValueType>[] = [
  { label: "Date Created", value: "dateCreated" },
  { label: "Date Modified", value: "dateModified" },
];

export const statusColors = {
  needToApply: "#ADD8E6",
  applied: "#22C55E",
  interviewing: "#FFDB58",
  offer: "#a891ee",
  closed: "#D9534F",
} as const;

export const readableStatus = {
  needToApply: "Need To Apply",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  closed: "Closed",
} as const;
