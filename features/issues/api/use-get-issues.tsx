import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import { Issue, IssueLevel, IssueStatus } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(
  page?: number,
  status?: string,
  level?: string,
  project?: string,
) {
  return [QUERY_KEY, page, status, level, project];
}

// Function to transform IssueStatus to API status
function toApiIssueStatus(status: IssueStatus | undefined): string | undefined {
  switch (status) {
    case IssueStatus.unresolved:
      return "open";
    case IssueStatus.resolved:
      return "resolved";
    default:
      return undefined;
  }
}

// Function to transform API status to IssueStatus
function fromApiIssueStatus(
  status: string | undefined,
): IssueStatus | undefined {
  switch (status) {
    case "open":
      return IssueStatus.unresolved;
    case "resolved":
      return IssueStatus.resolved;
    case IssueStatus.unresolved:
      return status;
    default:
      return undefined;
  }
}

// Use the new functions in useGetIssues
export function useGetIssues(
  page: number,
  status?: IssueStatus,
  level?: IssueLevel,
  project?: string,
) {
  const apiStatus = toApiIssueStatus(status);
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, status, level, project),
    ({ signal }) => getIssues(page, apiStatus, level, project, { signal }),
    {
      keepPreviousData: true,
      select: (data) => {
        data.items = data.items.map((issue) => ({
          ...issue,
          status: fromApiIssueStatus(issue.status),
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
        getQueryKey(page + 1, status, level, project),
        ({ signal }) =>
          getIssues(page + 1, toApiIssueStatus(status), level, project, {
            signal,
          }),
      );
    }
  }, [query.data, page, level, queryClient, status, project]);

  return query;
}
