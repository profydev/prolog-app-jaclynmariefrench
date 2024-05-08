import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonVariant,
  ButtonIcon,
  SelectBox,
  InputBox,
  InputIcon,
} from "@features/ui";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import capitalize from "lodash/capitalize";
import styles from "./issue-filter.module.scss";
import { useRouter } from "next/router";

export function IssueFilter() {
  const issueLevels = Object.values(IssueLevel).map((level) => ({
    value: level,
    label: capitalize(level),
  }));

  const issueStatus = Object.values(IssueStatus).map((status) => ({
    value: status,
    label: capitalize(status),
  }));

  const router = useRouter();

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
        onChange={(option) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, status: option },
          });
        }}
        placeholder="Status"
      />
      <SelectBox
        options={issueLevels}
        onChange={() => {
          // Add your logic here
        }}
        placeholder="Level" // Add the placeholder property
      />
      <InputBox
        onChange={() => {
          // Add your logic here
        }}
        placeholder="Project Name"
        disabled={false}
        label=""
        hint=""
        error=""
        icon=<InputIcon src="/icons/search.svg" />
      />
    </div>
  );
}
