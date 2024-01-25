import { z } from "zod";
import { FullApplicationType } from "./applications";

export const monthShorthands = z.enum([
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
	"Nov",
	"Dec",
]);

export type ChartDataLabelType =
	| `${number}/${number}`
	| `${number}/${number}, ${number}`
	| `${number}/${number} - ${number}/${number}`
	| z.infer<typeof monthShorthands>
	| `${z.infer<typeof monthShorthands>}, ${number}`;

export const zodChartDataLabelArraySchema = z.custom<ChartDataLabelType[]>(
	(valArray) => {
		if (!Array.isArray(valArray)) return false;

		const MM_DD_Regex = new RegExp(/\d\d\/\d\d/i);
		const MM_DD_YYRegex = new RegExp(/\d\d\/\d\d\/\d\d/i);

		const MM_DD_MM_DD_Regex = new RegExp(/\d\d\/\d\d\s-\s\d\d\/\d\d/i);
		const MM_DD_MM_DD_YY_Regex = new RegExp(/\d\d\/\d\d\s-\s\d\d\/\d\d\/\d\d/i);
		const MM_DD_YY_MM_DD_Regex = new RegExp(/\d\d\/\d\d\/\d\d\s-\s\d\d\/\d\d/i);
		const MM_DD_YY_MM_DD_YY_Regex = new RegExp(
			/\d\d\/\d\d\/\d\d\s-\s\d\d\/\d\d\/\d\d/i,
		);

		const MMM_Regex = new RegExp(/[A-Za-z][A-Za-z][A-Za-z]/i);
		const MMM_YYYY_Regex = new RegExp(/[A-Za-z][A-Za-z][A-Za-z],\s\d\d\d\d/i);

		for (let i = 0; i < valArray.length; i++) {
			const val = valArray[i];
			if (
				!MM_DD_Regex.test(val) &&
				!MM_DD_YYRegex.test(val) &&
				!MM_DD_MM_DD_Regex.test(val) &&
				!MM_DD_MM_DD_YY_Regex.test(val) &&
				!MM_DD_YY_MM_DD_Regex.test(val) &&
				!MM_DD_YY_MM_DD_YY_Regex.test(val) &&
				!MMM_Regex.test(val) &&
				!MMM_YYYY_Regex.test(val)
			) {
				return false;
			}
		}
		return true;
	},
);

export type ChartDataType = {
	date: ChartDataLabelType;
	totalNeedToApply: number;
	totalApplied: number;
	totalInterviewing: number;
	totalOffer: number;
	totalClosed: number;
};

export const chartStageKeys = [
	"Need To Apply",
	"Applied",
	"Interviewing",
	"Offer",
	"Closed",
] as const;

export type ApplicationsInDateRangeType = {
	label: ChartDataLabelType;
	applications: FullApplicationType[];
};

export const timelineUnits = {
	"1 year": 13,
	"6 months": 6,
	"1 month": 4,
	"1 week": 7,
} as const;

export type FormattedChartDataType = {
	date: ChartDataLabelType;
	"Need To Apply": number;
	"Need To ApplyColor": `#${string}`;
	Applied: number;
	AppliedColor: `#${string}`;
	Interviewing: number;
	InterviewingColor: `#${string}`;
	Offer: number;
	OfferColor: `#${string}`;
	Closed: number;
	ClosedColor: `#${string}`;
};

export const colorVisibleAcrossThemes = "#666666";
