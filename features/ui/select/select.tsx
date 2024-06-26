import React, { forwardRef, ReactElement, useState, useEffect } from "react";
import styles from "./select.module.scss";

type Option = {
  value: string;
  label: string;
};

type SelectBoxProps = {
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  icon?: ReactElement;
  label?: string;
  hint?: string;
  errorText?: string;
  classNames?: {
    container?: string;
    label?: string;
    button?: string;
    hint?: string;
  };
  allowReselectPlaceholder?: boolean;
  dataTestId?: string;
};

export const SelectBox = forwardRef<
  { setValue: (value: string) => void },
  SelectBoxProps
>((props) => {
  const {
    options,
    onChange,
    placeholder,
    value: propValue,
    disabled,
    icon,
    label,
    hint,
    errorText,
    classNames = {},
    allowReselectPlaceholder = false,
    dataTestId,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(propValue);

  useEffect(() => {
    setSelectedValue(propValue);
  }, [propValue]);

  const selectedOption =
    options.find((option) => option.value === selectedValue) || null;

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const allOptions = allowReselectPlaceholder
    ? [{ value: "", label: placeholder }, ...options]
    : options;

  return (
    <div
      className={`${styles.selectBoxContainer} ${classNames.container || ""}`}
    >
      <div className={`${styles.label} ${classNames.label || ""}`}>{label}</div>

      <button
        data-testid={dataTestId || "select-box"}
        className={`${styles.selectContainer} ${selectedOption ? "" : styles.placeholder} ${errorText ? styles.errorContainer : ""} ${classNames.button || ""}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled && !errorText}
      >
        <div className={styles.selectedBase} data-testid="select-base">
          {icon}
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        {isOpen && (
          <div className={styles.options} data-testid="select-options">
            {allOptions.map((option, index) => (
              <div
                data-testid={`select-option-${index}`}
                key={option.value}
                className={`${styles.option} ${selectedOption === option ? styles.selected : ""} ${option.value === "" ? styles.placeholderOption : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
                {selectedOption === option && (
                  <svg
                    data-testid="select-check"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={styles.checkIcon}
                  >
                    <path
                      d="M16.6668 5L7.50016 14.1667L3.3335 10"
                      stroke="#7F56D9"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
        {isOpen ? (
          <svg //Open arrow
            data-testid="select-open-arrow"
            className={styles.openIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15 12.5L10 7.5L5 12.5"
              stroke="#667085"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg //Closed arrow
            data-testid="select-closed-arrow"
            className={styles.arrowIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#667085"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {errorText ? (
        <div data-testid="select-error" className={styles.errorText}>
          {errorText}
        </div>
      ) : (
        <div
          data-testid="select-hint"
          className={`${styles.hint} ${classNames.hint || ""}`}
        >
          {hint}
        </div>
      )}
    </div>
  );
});

SelectBox.displayName = "SelectBox";
