import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./select.module.scss";

type Option = {
  value: string;
  label: string;
};

type SelectBoxProps = {
  options: Option[];
  onChange: (value: string) => void;
};

export const SelectBox = forwardRef<
  { setValue: (value: string) => void },
  SelectBoxProps
>(({ options, onChange }, ref) => {
  const [value, setValue] = useState("");

  // This function will be called when an option is selected
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  // This allows the parent component to control the value of the select box
  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setValue(value);
    },
  }));

  return (
    <div className={styles.selectContainer}>
      <select value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
