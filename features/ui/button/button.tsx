import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large" | "xlarge";
  color?:
    | "primary"
    | "secondary"
    | "gray"
    | "empty"
    | "empty-gray"
    | "error"
    | "empty-error";
  // icon?: "none" | "leading" | "trailing" | "only";
}

export function Button({ size, color, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        size && styles[size],
        color && styles[color],
        // icon !== 'none' ? styles[icon] : undefined,
        props.className,
      )}
    />
  );
}
