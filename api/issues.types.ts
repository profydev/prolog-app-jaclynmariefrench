export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  open = "open",
  resolved = "resolved",
}

export type IssueFilter = {
  projectName?: string;
  status?: IssueStatus;
  level?: IssueLevel;
};

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level?: IssueLevel;
  numEvents: number;
  numUsers: number;
  status?: IssueStatus;
};
