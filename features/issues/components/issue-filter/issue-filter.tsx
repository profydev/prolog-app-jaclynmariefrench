import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonVariant,
  ButtonIcon,
  SelectBox,
  InputBox,
  InputIcon, // Import useGetIssues from the root @features folder
} from "@features/ui";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import capitalize from "lodash/capitalize";
import styles from "./issue-filter.module.scss";
import { useRouter } from "next/router";
import { useGetIssues } from "@features/issues";
import { useRef, useEffect } from "react";

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
  const { status, level } = router.query;

  useGetIssues(1, status as string, level as string);

  const statusRef = useRef<{ setValue: (value: string) => void } | null>(null);
  const levelRef = useRef<{ setValue: (value: string) => void } | null>(null);

  useEffect(() => {
    statusRef.current?.setValue(status as string);
    levelRef.current?.setValue(level as string);
  }, [status, level]);

  const handleStatusChange = (selectedStatus: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, status: selectedStatus },
    });
  };

  const handleLevelChange = (selectedLevel: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, level: selectedLevel },
    });
  };

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
        ref={statusRef}
        options={issueStatus}
        onChange={handleStatusChange}
        placeholder="Status"
      />

      <SelectBox
        ref={levelRef}
        options={issueLevels}
        onChange={handleLevelChange}
        placeholder="Level"
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
