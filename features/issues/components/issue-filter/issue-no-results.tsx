import { Button, ButtonSize } from "@features/ui";
import styles from "./issue-no-results.module.scss";
import { IssueFilter } from "./issue-filter";
import { useRouter } from "next/router";

export function IssueNoResults() {
  const router = useRouter();

  const clearFilters = () => {
    router.push({
      pathname: router.pathname,
      query: { results: "none" },
    });
  };

  return (
    <div className={styles.noResultContainer}>
      <div className={styles.filterContainer}>
        <div>
          <IssueFilter showButton={false} />
        </div>
      </div>
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
          <Button
            size={ButtonSize.Large}
            className={styles.button}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
