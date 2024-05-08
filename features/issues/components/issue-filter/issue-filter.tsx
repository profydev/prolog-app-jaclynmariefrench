import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonVariant,
  ButtonIcon,
  SelectBox,
} from "@features/ui";
import { IssueLevel, IssueStatus } from "@api/issues.types";
// import type { Issue } from "@api/issues.types";
import capitalize from "lodash/capitalize";
import styles from "./issue-filter.module.scss";

export function IssueFilter() {
  const issueLevels = Object.values(IssueLevel).map((level) => ({
    value: level,
    label: capitalize(level),
  }));

  const issueStatus = Object.values(IssueStatus).map((status) => ({
    value: status,
    label: capitalize(status),
  }));

  return (
    <div className={styles.filterContainer}>
      <Button
        size={ButtonSize.Large}
        color={ButtonColor.Primary}
        variant={ButtonVariant.Default}
        onClick={() => {
          console.log("button click");
        }}
      >
        <ButtonIcon src="/icons/check.svg" />
        Resolve selected issues
      </Button>
      <SelectBox
        options={issueStatus}
        onChange={() => {
          // Add your logic here
        }}
        placeholder="Status" // Add the placeholder property
      />
      <SelectBox
        options={issueLevels}
        onChange={() => {
          // Add your logic here
        }}
        placeholder="Level" // Add the placeholder property
      />
    </div>
  );
}
