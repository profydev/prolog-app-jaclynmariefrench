import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { IssueFilter, IssueNoResults } from "../issue-filter";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import { Checkbox, CheckboxSize } from "@features/ui";
import { useState } from "react";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const status = router.query.status as keyof typeof IssueStatus as IssueStatus;
  const level = router.query.level as keyof typeof IssueLevel as IssueLevel;
  const project = router.query.project as string;

  //checkboxes state in list
  const [checkedIssues, setCheckedIssues] = useState<{
    [key: number]: boolean;
  }>({});
  const handleCheckboxChange = (id: number) => {
    setCheckedIssues((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };
      const allChecked = Object.values(newState).every((val) => val === true);
      const someChecked = Object.values(newState).some((val) => val === true);

      // Update the allChecked and someChecked state
      setAllChecked(allChecked);
      setSomeChecked(someChecked);

      return newState;
    });
  };

  //checkboxes state for select all aka checkbox in header
  const [allChecked, setAllChecked] = useState(false);
  const [someChecked, setSomeChecked] = useState(false);

  const handleAllCheckboxChange = () => {
    if (allChecked || someChecked) {
      // If all checkboxes or some checkboxes are checked, uncheck all
      setCheckedIssues(() => {
        setAllChecked(false);
        setSomeChecked(false);
        return {};
      });
    } else {
      //If no checkboxes are checked, check all
      const newCheckedIssues = (items || []).reduce(
        (acc, issue) => {
          acc[issue.id as unknown as number] = true;
          return acc;
        },
        {} as { [key: number]: boolean },
      );
      setCheckedIssues(newCheckedIssues);
      setAllChecked(true);
      setSomeChecked(false); // We know that all are checked, so set this to false
    }
  };

  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage, project, status, level },
    });

  const issuesPage = useGetIssues(page, status, level, project);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  if (issuesPage.data && issuesPage.data.items.length === 0) {
    return <IssueNoResults />;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  return (
    <div className={styles.issueListContainer}>
      <div className={styles.filterListContainer}>
        <IssueFilter />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={`${styles.headerCell} ${styles.checkboxCell}`}>
                {status === IssueStatus.unresolved && (
                  <Checkbox
                    size={CheckboxSize.Small}
                    checked={allChecked}
                    indeterminate={!allChecked && someChecked}
                    onChange={handleAllCheckboxChange}
                  />
                )}
                Issue
              </th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId] || ""}
                isChecked={
                  checkedIssues[issue.id as unknown as number] || false
                }
                onCheckboxChange={() =>
                  handleCheckboxChange(issue.id as unknown as number)
                }
                status={status}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
