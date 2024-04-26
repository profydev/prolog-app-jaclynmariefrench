import styles from "./input.module.scss";

type InputIconProps = {
  src: string;
};

export function InputIcon({ src }: InputIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.inputIcon}
      src={src}
      alt="input-icon"
      data-testid="input-icon"
    />
  );
}
