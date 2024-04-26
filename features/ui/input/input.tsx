import React, {
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./input.module.scss";

type InputBoxProps = {
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  label: string;
  icon?: ReactElement;
  hint: string;
  error: string;
};

export const InputBox = forwardRef<
  { setValue: (value: string) => void },
  InputBoxProps
>(({ onChange, placeholder, disabled, label, icon, hint, error }, ref) => {
  const [value, setValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  // This allows the parent component to control the value of the input box
  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setValue(value);
    },
  }));
  return (
    <div className={styles.inputBoxContainer}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.inputIcon}>{icon}</div>}
        <input
          placeholder={placeholder}
          className={`${styles.inputBox} ${icon ? styles.inputBoxWithIcon : ""} ${error ? styles.errorContainer : ""}`}
          onChange={handleInputChange}
          value={value}
          disabled={disabled}
        />
        {error && (
          <div className={styles.errorIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 17"
              fill="none"
            >
              <g clipPath="url(#clip0_47_612)">
                <path
                  d="M8.00016 5.45966V8.12632M8.00016 10.793H8.00683M14.6668 8.12632C14.6668 11.8082 11.6821 14.793 8.00016 14.793C4.31826 14.793 1.3335 11.8082 1.3335 8.12632C1.3335 4.44442 4.31826 1.45966 8.00016 1.45966C11.6821 1.45966 14.6668 4.44442 14.6668 8.12632Z"
                  stroke="#F04438"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_47_612">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.126343)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
      {error ? (
        <div data-testid="input-error" className={styles.error}>
          {error}
        </div>
      ) : (
        <div data-testid="input-hint" className={styles.hint}>
          {hint}
        </div>
      )}
    </div>
  );
});

InputBox.displayName = "InputBox";
