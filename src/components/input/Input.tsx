import React from "react";
import "./Input.scss";

interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  maxLength?: number;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "Enter text",
  className = "",
  id,
  maxLength,
  required = false,
}) => {
  return (
    <input
      id={id}
      type={type}
      className={`input ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      maxLength={maxLength}
      required={required}
      data-testid={id || "input"} // For testing purposes
    />
  );
};

export default Input;
