import { Button } from "@features/ui";
import styles from "./issue-no-results.module.scss";

export function IssueNoResults() {
  return (
    <div className={styles.noResultContainer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/illustration.svg" alt="cloud and search glass" />
      <h2>No issues found</h2>
      <p>
        Either the filters you selected are too restrictive or there are no
        issues for your projects.
      </p>
      <div>
        <Button />
      </div>
    </div>
  );
}
