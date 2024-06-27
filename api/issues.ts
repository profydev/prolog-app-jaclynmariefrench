import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status, level, project },
    signal: options?.signal,
  });
  return data;
}

// Comment from Johannes It might be simpler to define a IssueFilter type somewhere
// at the API level (I mean in the /api folder so you don't have to type these
// fields all the time.
