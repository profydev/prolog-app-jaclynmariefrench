export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export enum IssueStatus {
  unresolved = "unresolved",
  resolved = "resolved",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
  status: IssueStatus;
};
