import styles from "./select.module.scss";

type SelectIconProps = {
  src: string;
};

export function SelectIcon({ src }: SelectIconProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.selectIcon} src={src} alt="select-icon" />;
}
