import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import { Issue, IssueStatus } from "@api/issues.types";

const QUERY_KEY = "issues";

type Status = "unresolved" | "resolved";
type Level = "info" | "warning" | "error";

function transformIssueStatus(status: string | undefined): IssueStatus {
  if (status === undefined) {
    // handle the undefined case, perhaps return a default value or throw an error
    return IssueStatus.unresolved; // or throw new Error('status is undefined');
  }

  switch (status) {
    case "open":
      return IssueStatus.unresolved;
    default:
      return status as IssueStatus;
  }
}

export function getQueryKey(page?: number, status?: string, level?: string) {
  return [QUERY_KEY, page, status, level];
}

export function useGetIssues(page: number, status?: string, level?: string) {
  // Convert status to a valid value or undefined
  const validStatus = ["open", "resolved"].includes(status ?? "")
    ? status
    : "open";
  const validLevel = level ?? "";

  // Explicitly cast variables to expected types
  const statusAsStatus = transformIssueStatus(validStatus) as Status;
  const levelAsLevel = validLevel as Level;

  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, validStatus, validLevel),
    ({ signal }) => getIssues(page, validStatus, levelAsLevel, { signal }),
    {
      keepPreviousData: true,
      select: (data) => {
        data.items = data.items.map((issue) => ({
          ...issue,
          status: transformIssueStatus(issue.status),
        }));
        return data;
      },
    },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(
        getQueryKey(page + 1, validStatus, level),
        ({ signal }) =>
          getIssues(page + 1, validStatus, levelAsLevel, { signal }),
      );
    }
  }, [
    query.data,
    page,
    validStatus,
    level,
    queryClient,
    levelAsLevel,
    statusAsStatus,
  ]);

  return query;
}
