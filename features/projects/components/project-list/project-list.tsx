import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { LoadingScreen } from "@features/ui";
import { ProjectError } from "../project-error";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div
        className={styles["loading-container"]}
        data-testid="loading-container"
      >
        <LoadingScreen />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div data-testid="project-error">
        <ProjectError onRetry={refetch} />
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
