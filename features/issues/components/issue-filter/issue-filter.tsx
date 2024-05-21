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

export function IssueFilter() {
  const issueLevels = Object.values(IssueLevel).map((level) => ({
    value: level,
    label: capitalize(level),
  }));

  const issueStatus = Object.values(IssueStatus).map((status) => ({
    value: status,
    label: capitalize(status),
  }));

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();

  const rawStatus = router.query.status;
  const rawLevel = router.query.level;

  const status =
    typeof rawStatus === "string" ? (rawStatus as IssueStatus) : undefined;
  const level =
    typeof rawLevel === "string" ? (rawLevel as IssueLevel) : undefined;

  useGetIssues(1, status, level, debouncedSearch);

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
        router.push({
          pathname: router.pathname,
          query: { ...router.query, project: value },
        });
        setDebouncedSearch(value);
      }, 500),
    );
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
        classNames={{ button: styles.selectFilter }}
        ref={statusRef}
        options={issueStatus}
        onChange={handleStatusChange}
        placeholder="Status"
      />

      <SelectBox
        classNames={{ button: styles.selectFilter }}
        ref={levelRef}
        options={issueLevels}
        onChange={handleLevelChange}
        placeholder="Level"
      />
      <InputBox
        onChange={handleSearchChange}
        value={search}
        placeholder="Project Name"
        disabled={false}
        classNames={{ input: styles.inputFilter }}
        icon=<InputIcon src="/icons/search.svg" />
      />
    </div>
  );
}
