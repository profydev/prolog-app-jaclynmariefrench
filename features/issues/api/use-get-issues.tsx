import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import { Issue, IssueStatus } from "@api/issues.types";
import { useRouter } from "next/router";

const QUERY_KEY = "issues";

function transformIssueStatus(status: string): IssueStatus {
  switch (status) {
    case "open":
      return IssueStatus.unresolved;
    default:
      return status as IssueStatus;
  }
}

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetIssues(page: number) {
  const router = useRouter();
  let { status } = router.query;

  //checking status select box
  if (typeof status === "string") {
    status = ["unresolved", "resolved"].includes(status) ? status : undefined;
  } else {
    status = undefined;
  }

  const query = useQuery<Page<Issue>, Error>(
    [getQueryKey(page), status],
    ({ signal }) =>
      getIssues(page, { signal, status } as {
        signal: AbortSignal;
        status?: "unresolved" | "resolved";
      }),
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
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, { signal }),
      );
    }
  }, [query.data, page, queryClient]);
  return query;
}
