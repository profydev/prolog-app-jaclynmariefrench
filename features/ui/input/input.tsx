import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./input.module.scss";

type InputBoxProps = {
  onChange: (value: string) => void;
  placeholder: string;
};

export const InputBox = forwardRef<
  { setValue: (value: string) => void },
  InputBoxProps
>(({ onChange, placeholder }, ref) => {
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
    <div>
      <input
        placeholder={placeholder}
        className={styles.inputBoxContainer}
        onChange={handleInputChange}
        value={value}
      ></input>
    </div>
  );
});

InputBox.displayName = "InputBox";
