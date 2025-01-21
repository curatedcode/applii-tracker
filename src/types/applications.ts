import { zApplication, zStatus } from "@/src/types/db";
import type { Control, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type ApplicationStatusLabelValueType = {
	label: zApplication["GET"]["status"];
	value: zApplication["GET"]["status"];
};

export const applicationStatusLabel = z.enum([
	"Need To Apply",
	"Applied",
	"Interviewing",
	"Offer",
	"Closed",
]);

export const zApplicationForm = zApplication.INSERT.omit({
	status: true,
}).extend({
	status: z.object({
		label: zStatus,
		value: zStatus,
	}),
});

export type zApplicationForm = z.infer<typeof zApplicationForm>;

export const applicationStatusSelectOptions: ApplicationStatusLabelValueType[] =
	[
		{ value: "Need To Apply", label: "Need To Apply" },
		{ value: "Applied", label: "Applied" },
		{ value: "Interviewing", label: "Interviewing" },
		{ value: "Offer", label: "Offer" },
		{ value: "Closed", label: "Closed" },
	];

export type ArrayFieldProps = {
	register: UseFormRegister<zApplicationForm>;
	control: Control<zApplicationForm>;
	className?: string;
};

export type GroupedApplicationsType = {
	needToApply: zApplication["GET"][];
	applied: zApplication["GET"][];
	interviewing: zApplication["GET"][];
	offer: zApplication["GET"][];
	closed: zApplication["GET"][];
};
