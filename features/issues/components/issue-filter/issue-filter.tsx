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
import { z } from "zod";
import { useDebounce } from "@uidotdev/usehooks";

//Zod schema for validation
const issueFilterSchema = z.object({
  projectName: z.string().optional(),
  status: z.nativeEnum(IssueStatus).optional(),
  level: z.nativeEnum(IssueLevel).optional(),
});

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

  //Initial filter stat with Zod validation
  const initialFilter = issueFilterSchema.parse({
    projectName: Array.isArray(router.query.project)
      ? router.query.project[0]
      : router.query.project,
    status:
      router.query.status === ""
        ? undefined
        : (router.query.status as IssueStatus | undefined),
    level:
      router.query.level === ""
        ? undefined
        : (router.query.level as IssueLevel | undefined),
  });

  const [filter, setFilter] = useState<IssueFilter>(initialFilter);

  //debounce filter state to avoid unnecessary api calls when user is typing in input
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    if (router.isReady) {
      const validatedFilter = issueFilterSchema.safeParse({
        projectName: Array.isArray(router.query.project)
          ? router.query.project[0]
          : router.query.project,
        status: router.query.status as IssueStatus | undefined,
        level: router.query.level as IssueLevel | undefined,
      });
      if (validatedFilter.success) {
        setFilter(validatedFilter.data);
      }
    }
  }, [router.isReady, router.query]);

  const updateQuery = (newFilter: IssueFilter) => {
    const updatedQuery = {
      ...router.query,
      project: newFilter.projectName || undefined,
      status: newFilter.status,
      level: newFilter.level,
    };
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true },
    );
  };

  const handleStatusChange = (selectedStatus: string) => {
    const newFilter = { ...filter, status: selectedStatus as IssueStatus };
    setFilter(newFilter);
    updateQuery(newFilter);
  };

  const handleLevelChange = (selectedLevel: string) => {
    const newFilter = { ...filter, level: selectedLevel as IssueLevel };
    setFilter(newFilter);
    updateQuery(newFilter);
  };

  const handleSearchChange = (value: string) => {
    const newFilter = { ...filter, projectName: value };
    setFilter(newFilter);
    updateQuery(newFilter);
  };

  useGetIssues(
    1,
    debouncedFilter.status,
    debouncedFilter.level,
    debouncedFilter.projectName,
  );

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
