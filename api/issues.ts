import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

type Options = {
  signal?: AbortSignal;
  status?: "unresolved" | "resolved" | "open" | undefined;
};

export async function getIssues(page: number, options?: Options) {
  let { status } = options || {};
  if (status === "unresolved") {
    status = "open";
  }

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status },
    signal: options?.signal,
  });
  return data;
}
