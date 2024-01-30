import { Dispatch, SetStateAction } from "react";
import { Control, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type ApplicationStatusType = z.infer<typeof applicationStatuses>;

export const applicationStatusesArray: ApplicationStatusType[] = [
	"needToApply",
	"applied",
	"interviewing",
	"offer",
	"closed",
];

export const applicationStatuses = z.enum([
	"needToApply",
	"applied",
	"interviewing",
	"offer",
	"closed",
]);

export const application = z.object({
	id: z.number(),
	position: z.string(),
	company: z.string(),
	postingURL: z.string().optional(),
	status: applicationStatuses,
	dateCreated: z.string(),
	dateModified: z.string(),
	dateApplied: z.string().optional(),
	dateInterviewing: z.string().optional(),
	dateOffered: z.string().optional(),
	dateClosed: z.string().optional(),
	contacts: z
		.array(
			z.object({
				name: z.string(),
				position: z.string().optional(),
				phone: z.string().optional(),
				email: z.string().optional(),
			}),
		)
		.optional(),
	notes: z
		.array(
			z.object({
				body: z.string(),
			}),
		)
		.optional(),
	cardColor: z.string(),
});

export type ApplicationType = z.infer<typeof application>;

export type NotesType = {
	body: string;
};

export type ContactType = {
	name: string;
	position?: string;
	phone?: string;
	email?: string;
};

export type ApplicationStatusLabelValueType = {
	label: z.infer<typeof applicationStatusLabel>;
	value: z.infer<typeof applicationStatuses>;
};

export const applicationStatusLabel = z.enum([
	"Need To Apply",
	"Applied",
	"Interviewing",
	"Offer",
	"Closed",
]);

export const formSchema = z.object({
	position: z.string().min(1, { message: "Position can't be empty" }),
	company: z.string().min(1, { message: "Company can't be empty" }),
	postingURL: z.string().optional(),
	status: z.object({
		label: applicationStatusLabel,
		value: applicationStatuses,
	}),
	dateApplied: z.string().optional(),
	dateInterviewing: z.string().optional(),
	dateOffered: z.string().optional(),
	dateClosed: z.string().optional(),
	contacts: z
		.array(
			z.object({
				name: z.string(),
				position: z.string().optional(),
				phone: z.string().optional(),
				email: z.string().optional(),
			}),
		)
		.optional(),
	notes: z.array(z.object({ body: z.string() })).optional(),
	cardColor: z.string(),
});

export type FormContextType = {
	contactsData: ContactType[];
	setContactsData: Dispatch<SetStateAction<ContactType[]>>;
	notesData: NotesType[];
	setNotesData: Dispatch<SetStateAction<NotesType[]>>;
	isFormCompleted: boolean;
	setIsFormCompleted: Dispatch<SetStateAction<boolean>>;
};

export const applicationStatusSelectOptions: ApplicationStatusLabelValueType[] =
	[
		{ value: "needToApply", label: "Need To Apply" },
		{ value: "applied", label: "Applied" },
		{ value: "interviewing", label: "Interviewing" },
		{ value: "offer", label: "Offer" },
		{ value: "closed", label: "Closed" },
	];

export type ArrayFieldProps = {
	register: UseFormRegister<z.infer<typeof formSchema>>;
	control: Control<z.infer<typeof formSchema>>;
	className?: string;
};

export type GroupedApplicationsType = {
	needToApply: ApplicationType[];
	applied: ApplicationType[];
	interviewing: ApplicationType[];
	offer: ApplicationType[];
	closed: ApplicationType[];
};

export type FormatApplicationsType = "grouped";
