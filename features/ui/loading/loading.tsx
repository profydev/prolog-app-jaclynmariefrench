import styles from "./loading.module.scss";

export function LoadingScreen() {
  return (
    <svg className={styles.loader} width="120" height="120">
      <circle
        cx="34"
        cy="34"
        r="29"
        fill="none"
        stroke="#f9f5ff"
        strokeWidth="8"
      />
      <circle
        className={styles["loader-path"]}
        cx="34"
        cy="34"
        r="29"
        fill="none"
        stroke="#7f56d9"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="48 134"
        strokeDashoffset="47.1"
      />
    </svg>
  );
}
