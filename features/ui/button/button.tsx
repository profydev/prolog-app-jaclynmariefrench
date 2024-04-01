import classNames from "classnames";
import { UnstyledButton } from "./unstyled-button";
import styles from "./button.module.scss";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge",
}

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Gray = "gray",
  Error = "error",
}

export enum ButtonVariant {
  Default = "default",
  Empty = "empty",
  IconOnly = "iconOnly",
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
};

export function Button({
  className,
  size = ButtonSize.Medium,
  color = ButtonColor.Primary,
  variant = ButtonVariant.Default,
  ...props
}: ButtonProps) {
  return (
    <UnstyledButton
      className={classNames(
        styles.button,
        styles[size],
        styles[color],
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
