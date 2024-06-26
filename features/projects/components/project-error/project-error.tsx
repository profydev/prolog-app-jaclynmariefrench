import { UnstyledButton } from "@features/ui";
import styles from "./project-error.module.scss";

export type ProjectErrorProps = {
  onRetry: () => void;
};

export function ProjectError({ onRetry }: ProjectErrorProps) {
  return (
    <div className={styles["error-container"]}>
      <div className={styles["left-banner"]}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/icons/alert-circle.svg"}
            alt="alert icon"
            className={styles["alert-circle"]}
          />
        </div>
        <p>There was a problem while loading the project data</p>
      </div>
      <UnstyledButton className={styles["right-banner"]} onClick={onRetry}>
        <p>Try again</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/icons/arrow-right.svg"}
          alt="arrow"
          className={styles["error-arrow"]}
        />
      </UnstyledButton>
    </div>
  );
}
