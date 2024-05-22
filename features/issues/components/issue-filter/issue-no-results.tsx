import { Button, ButtonSize } from "@features/ui";
import styles from "./issue-no-results.module.scss";

export function IssueNoResults() {
  return (
    <div className={styles.noResultContainer}>
      <div>Filter here</div>
      <div className={styles.contentContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/illustration.svg" alt="cloud and search glass" />
        <div className={styles.textContainer}>
          <h2 className={styles.header}>No issues found</h2>
          <p className={styles.paragraph}>
            Either the filters you selected are too restrictive or there are no
            issues for your projects.
          </p>
        </div>
        <div>
          <Button size={ButtonSize.Large} className={styles.button}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
