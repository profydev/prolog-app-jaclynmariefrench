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
import { IssueLevel, IssueStatus, IssueFilter } from "@api/issues.types";
import capitalize from "lodash/capitalize";
import styles from "./issue-filter.module.scss";
import { useRouter } from "next/router";
import { useGetIssues } from "@features/issues";
import { useEffect, useState } from "react";

const statusConvertText: { [key in IssueStatus]: string } = {
  [IssueStatus.open]: "Unresolved",
  [IssueStatus.resolved]: "Resolved",
};

const issueLevels = Object.values(IssueLevel).map((level) => ({
  value: level,
  label: capitalize(level),
}));

const issueStatus = Object.values(IssueStatus).map((status) => ({
  value: status,
  label: statusConvertText[status] ? statusConvertText[status] : status,
}));

export function IssueFilterComponent({ showButton = true }) {
  const router = useRouter();

  // IssueFilter is handling state
  const [filter, setFilter] = useState<IssueFilter>({
    projectName: Array.isArray(router.query.project)
      ? router.query.project[0]
      : (router.query.project as string | undefined), // Type Assertion
    status: router.query.status as IssueStatus | undefined,
    level: router.query.level as IssueLevel | undefined,
  });

  // Update filter state based on URL changes
  useEffect(() => {
    if (router.isReady) {
      setFilter({
        projectName: Array.isArray(router.query.project)
          ? router.query.project[0]
          : (router.query.project as string | undefined), // Type Assertion
        status: router.query.status as IssueStatus | undefined,
        level: router.query.level as IssueLevel | undefined,
      });
    }
  }, [router.isReady, router.query]);

  // Update the URL when projectName changes
  useEffect(() => {
    const updatedQuery = {
      ...router.query,
      project: filter.projectName || undefined,
    };
    if (filter.projectName === "") {
      updatedQuery.project = undefined; // Remove the project parameter if the input is cleared
    }
    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    });
  }, [filter.projectName, router]);

  const handleStatusChange = (selectedStatus: string) => {
    setFilter((prev) => ({ ...prev, status: selectedStatus as IssueStatus }));
    router.push({
      pathname: router.pathname,
      query: { ...router.query, status: selectedStatus },
    });
  };

  const handleLevelChange = (selectedLevel: string) => {
    setFilter((prev) => ({ ...prev, level: selectedLevel as IssueLevel }));
    router.push({
      pathname: router.pathname,
      query: { ...router.query, level: selectedLevel },
    });
  };

  const handleSearchChange = (value: string) => {
    setFilter((prev) => ({ ...prev, projectName: value }));
  };

  useGetIssues(1, filter.status, filter.level, filter.projectName);

  return (
    <div className={styles.filterContainer}>
      {showButton && (
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
      )}
      <div className={styles.rightGroup}>
        <SelectBox
          dataTestId="status-select"
          data-test-test="tester"
          classNames={{ button: styles.selectFilter }}
          options={issueStatus}
          onChange={handleStatusChange}
          placeholder="Status"
          allowReselectPlaceholder={true}
        />

        <SelectBox
          dataTestId="level-select"
          classNames={{ button: styles.selectFilter }}
          options={issueLevels}
          onChange={handleLevelChange}
          placeholder="Level"
          allowReselectPlaceholder={true}
        />
        <InputBox
          dataTestId="search-input"
          onChange={handleSearchChange}
          initialValue={filter.projectName}
          placeholder="Project Name"
          disabled={false}
          classNames={{ input: styles.inputFilter }}
          icon={<InputIcon src="/icons/search.svg" />}
        />
      </div>
    </div>
  );
}
