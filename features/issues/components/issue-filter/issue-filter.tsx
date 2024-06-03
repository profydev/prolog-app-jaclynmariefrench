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
import { useGetIssues } from "@features/issues";
import { useRef, useEffect, useState } from "react";

export function IssueFilter({ showButton = true }) {
  const issueLevels = Object.values(IssueLevel).map((level) => ({
    value: level,
    label: capitalize(level),
  }));

  const issueStatus = Object.values(IssueStatus).map((status) => ({
    value: status,
    label: capitalize(status),
  }));
  const router = useRouter();

  const projectNameFromUrl = Array.isArray(router.query.project)
    ? router.query.project[0]
    : router.query.project;

  const [search, setSearch] = useState(projectNameFromUrl || "");
  const [debouncedSearch, setDebouncedSearch] = useState(
    projectNameFromUrl || "",
  );

  const rawStatus = router.query.status;
  const rawLevel = router.query.level;

  const status =
    typeof rawStatus === "string" ? (rawStatus as IssueStatus) : undefined;
  const level =
    typeof rawLevel === "string" ? (rawLevel as IssueLevel) : undefined;

  const statusRef = useRef<{ setValue: (value: string) => void } | null>(null);
  const levelRef = useRef<{ setValue: (value: string) => void } | null>(null);

  useEffect(() => {
    statusRef.current?.setValue(status as string);
    levelRef.current?.setValue(level as string);
  }, [status, level]);

  useEffect(() => {
    if (router.isReady && router.query.project) {
      const projectNameFromUrl = Array.isArray(router.query.project)
        ? router.query.project[0]
        : router.query.project;

      setSearch(projectNameFromUrl || "");
      setDebouncedSearch(projectNameFromUrl || "");
    }
  }, [router.isReady, router.query.project]);

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

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        // Update the URL even when the input is empty
        router.push({
          pathname: router.pathname,
          query: { ...router.query, project: value },
        });
        setDebouncedSearch(value);
      }, 500),
    );
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  useGetIssues(1, status, level, debouncedSearch);

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
          ref={statusRef}
          options={issueStatus}
          onChange={handleStatusChange}
          placeholder="Status"
          allowReselectPlaceholder={true}
        />

        <SelectBox
          dataTestId="level-select"
          classNames={{ button: styles.selectFilter }}
          ref={levelRef}
          options={issueLevels}
          onChange={handleLevelChange}
          placeholder="Level"
          allowReselectPlaceholder={true}
        />
        <InputBox
          dataTestId="search-input"
          onChange={handleSearchChange}
          initialValue={search}
          placeholder="Project Name"
          disabled={false}
          classNames={{ input: styles.inputFilter }}
          icon=<InputIcon src="/icons/search.svg" />
        />
      </div>
    </div>
  );
}
