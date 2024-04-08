import classNames from "classnames";
import styles from "./checkbox.module.scss";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  children,
  className,
  style,
  checked,
  ...otherProps
}: CheckboxProps) {
  return (
    <label className={classNames(styles.container, className)} style={style}>
      <input {...otherProps} type="checkbox" checked={checked} />
      {/* ^^ this is the hidden checkbox*/}
      <span className={classNames(styles.checkbox)}>
        {/* ^^ this is the custom shown checkbox*/}
        <svg
          className={styles.check}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.6666"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </label>
  );
}
