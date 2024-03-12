import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@api/projects";
import { ProjectStatus, type Project } from "@api/projects.types";

function transformStatus(status: string): ProjectStatus {
  switch (status) {
    case "info":
      return ProjectStatus.stable;
    case "error":
      return ProjectStatus.critical;
    default:
      return status as ProjectStatus;
  }
}

export function useGetProjects() {
  return useQuery<Project[], Error>(["projects"], getProjects, {
    select: (data) =>
      data.map((project) => ({
        ...project,
        status: transformStatus(project.status),
      })),
  });
}
