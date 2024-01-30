import { ApplicationType } from "./applications";

export type ChartDataType = {
	date: string;
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
	label: string;
	applications: ApplicationType[];
};

export const timelineUnits = {
	"1 year": 13,
	"6 months": 6,
	"1 month": 4,
	"1 week": 7,
} as const;

export type FormattedChartDataType = {
	date: string;
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
