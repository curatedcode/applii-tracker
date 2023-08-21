export type ApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL: string;
  dateCreated: string;
  dateModified?: string;
  dateApplied?: string;
  dateInterviewed?: string;
  dateClosed?: string;
};

export type CreateApplicationType = {
  position: string;
  company: string;
  postingURL: string;
  dateCreated: string;
  dateModified?: string;
  dateApplied?: string;
  dateInterviewed?: string;
  dateClosed?: string;
};

export type UpdateApplicationType = Partial<CreateApplicationType> & {
  id: number;
};
