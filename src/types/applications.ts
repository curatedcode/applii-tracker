import type { zApplication } from "@/src/types/db";
import type { Control, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export const applicationStatusLabel = z.enum([
	"Need To Apply",
	"Applied",
	"Interviewing",
	"Offer",
	"Closed",
]);

export type ArrayFieldProps = {
	register: UseFormRegister<zApplication["INSERT"]>;
	control: Control<zApplication["INSERT"]>;
	className?: string;
};

export type GroupedApplicationsType = {
	needToApply: zApplication["GET"][];
	applied: zApplication["GET"][];
	interviewing: zApplication["GET"][];
	offer: zApplication["GET"][];
	closed: zApplication["GET"][];
};
