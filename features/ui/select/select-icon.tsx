import styles from "./select.module.scss";

type SelectIconProps = {
  src: string;
};

export function SelectIcon({ src }: SelectIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.selectIcon}
      src={src}
      alt="select-icon"
      data-testid="select-icon"
    />
  );
}
