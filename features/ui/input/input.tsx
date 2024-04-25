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
};

export const InputBox = forwardRef<
  { setValue: (value: string) => void },
  InputBoxProps
>(({ onChange, placeholder, disabled, label, icon }, ref) => {
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
          className={`${styles.inputBox} ${icon ? styles.inputBoxWithIcon : ""}`}
          onChange={handleInputChange}
          value={value}
          disabled={disabled}
        />
      </div>
    </div>
  );
});

InputBox.displayName = "InputBox";
