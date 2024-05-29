import capitalize from "lodash/capitalize";
import {
  Badge,
  BadgeColor,
  BadgeSize,
  Checkbox,
  CheckboxSize,
} from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel, IssueStatus } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
  isChecked: boolean;
  onCheckboxChange: () => void;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({
  projectLanguage,
  issue,
  isChecked,
  onCheckboxChange,
  status,
}: IssueRowProps & { status: IssueStatus }) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  return (
    <tr className={styles.row}>
      <td className={styles.issueCell}>
        {status === IssueStatus.unresolved && (
          <Checkbox
            size={CheckboxSize.Small}
            checked={isChecked}
            onChange={onCheckboxChange}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </td>
      <td className={styles.cell}>
        <Badge
          color={levelColors[level as keyof typeof levelColors]}
          size={BadgeSize.sm}
        >
          {capitalize(level)}
        </Badge>
      </td>
      <td className={styles.cell}>{numEvents}</td>
      <td className={styles.cell}>{numUsers}</td>
    </tr>
  );
}
