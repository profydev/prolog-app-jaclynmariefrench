import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./select.module.scss";

type Option = {
  value: string;
  label: string;
};

type SelectBoxProps = {
  options: Option[];
  onChange: (value: string) => void;
  placeholder: string;
};

export const SelectBox = forwardRef<
  { setValue: (value: string) => void },
  SelectBoxProps
>(({ options, onChange, placeholder }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  // This allows the parent component to control the value of the select box
  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      const option = options.find((option) => option.value === value);
      setSelectedOption(option || null);
    },
  }));

  return (
    <div className={styles.selectContainer} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.selectedBase}>
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${selectedOption === option ? styles.selected : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
              {selectedOption === option && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={styles.checkIcon}
                >
                  <path
                    d="M16.6668 5L7.50016 14.1667L3.3335 10"
                    stroke="#7F56D9"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrowIcon}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="#667085"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
});

SelectBox.displayName = "SelectBox";
