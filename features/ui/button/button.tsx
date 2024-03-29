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

// import { ButtonHTMLAttributes, ReactNode } from "react";
// import classNames from "classnames";
// import styles from "./button.module.scss";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   size?: "small" | "medium" | "large" | "xlarge";
//   color?:
//     | "primary"
//     | "secondary"
//     | "gray"
//     | "empty"
//     | "empty-gray"
//     | "error"
//     | "empty-error";
//   icon?: ReactNode;
//   iconPosition?: "none" | "leading" | "trailing" | "only";
// }

// export function Button({ size, color, icon, iconPosition, children, ...props }: ButtonProps) {
//   return (
//     <button
//       {...props}
//       className={classNames(
//         styles.button,
//         size && styles[size],
//         color && styles[color],
//         props.className,
//       )}
//     >
//       {(iconPosition === "leading" || iconPosition === "only") && icon}
//       {iconPosition !== "only" && children}
//       {iconPosition === "trailing" && icon}
//       </button>
//   );
// }
