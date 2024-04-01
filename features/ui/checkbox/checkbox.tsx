import classNames from "classnames";
import styles from "./checkbox.module.scss";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  children,
  className,
  style,
  ...otherProps
}: CheckboxProps) {
  return (
    <label className={classNames(styles.container, className)} style={style}>
      <input {...otherProps} type="checkbox" />{" "}
      {/* <- this is the hidden checkbox*/}
      <span className={classNames(styles.checkbox)} />{" "}
      {/* <- this is the custom shown checkbox*/}
      {children}
    </label>
  );
}
