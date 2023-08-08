export type ApplicationType = {
  id: number;
  position: string;
  company: string;
  postingURL: string;
  dateCreated: Date;
  dateModified?: Date;
  dateApplied?: Date;
  dateInterviewed?: Date;
  dateClosed?: Date;
};

export type CreateApplicationType = {
  position: string;
  company: string;
  postingURL: string;
  dateCreated: Date;
  dateModified?: Date;
  dateApplied?: Date;
  dateInterviewed?: Date;
  dateClosed?: Date;
};

export type UpdateApplicationType = Partial<CreateApplicationType> & {
  id: number;
};
