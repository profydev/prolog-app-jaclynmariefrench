import classNames from "classnames";
import styles from "./checkbox.module.scss";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export enum CheckboxSize {
  Small = "small",
  Medium = "medium",
}

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  indeterminate?: boolean;
  size?: CheckboxSize;
};
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      children,
      className,
      size = CheckboxSize.Medium,
      style,
      checked,
      indeterminate,
      disabled,
      ...otherProps
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => inputRef.current,
      [],
    );

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    return (
      <label
        className={classNames(styles.container, styles[size], className)}
        style={style}
      >
        <input
          {...otherProps}
          type="checkbox"
          checked={checked}
          ref={inputRef}
          disabled={disabled}
        />
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
            data-testId="indeterminate-check"
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
            data-testId="check"
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
        <span>{children}</span>
      </label>
    );
  },
);
