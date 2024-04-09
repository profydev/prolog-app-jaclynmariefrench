import classNames from "classnames";
import styles from "./checkbox.module.scss";
import { useEffect, useRef } from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
};

export function Checkbox({
  children,
  className,
  style,
  checked,
  indeterminate,
  ...otherProps
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <label className={classNames(styles.container, className)} style={style}>
      <input {...otherProps} type="checkbox" checked={checked} ref={inputRef} />
      {/* ^^ input is the hidden checkbox*/}
      <span
        className={classNames(
          styles.checkbox,
          indeterminate && styles.indeterminate,
        )}
      >
        {/* span is is the custom shown checkbox*/}
        <svg
          className={styles.indeterminateCheck}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2.5 6H9.5"
            stroke="currentColor"
            strokeWidth="1.66666"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
