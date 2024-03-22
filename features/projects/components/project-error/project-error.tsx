import styles from "./project-error.module.scss";
import { Button } from "@features/ui";

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

      {/*will need to be a button*/}
      <Button className={styles["right-banner"]} onClick={onRetry}>
        <p>Try again</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/icons/arrow-right.svg"}
          alt="arrow"
          className={styles["error-arrow"]}
        />
      </Button>
    </div>
  );
}
