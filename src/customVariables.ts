import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { GetAllApplicationsReturnType } from "./db";

export type ApplicationStatusType = z.infer<typeof applicationStatuses>;

export const applicationStatuses = z.enum([
  "needToApply",
  "applied",
  "interviewing",
  "offer",
  "closed",
]);

export type ApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateCreated: string;
  dateModified: string;
  dateApplied?: string;
  dateInterviewed?: string;
  dateOffered?: string;
  dateClosed?: string;
};

export type CardApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateModified: string;
};

export type CreateApplicationType = {
  position: string;
  company: string;
  postingURL?: string;
  status: ApplicationStatusType;
  dateCreated: string;
  dateModified?: string;
  dateApplied?: string;
  dateInterviewed?: string;
  dateOffered?: string;
  dateClosed?: string;
};

export type UpdateApplicationType = Partial<CreateApplicationType> & {
  id: number;
};
