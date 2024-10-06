import React from "react";
import "./ToggleButton.scss";

interface ToggleButtonProps {
  value: boolean;
  onToggle: (newValue: boolean) => void;
  text?: string;
  trueLabel?: string;
  falseLabel?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  onToggle,
  text,
  trueLabel = "On",
  falseLabel = "Off",
  className = "",
  disabled = false,
  id,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onToggle(!value);
    }
  };

  return (
    <button
      id={id}
      className={`toggle-button ${value ? "active" : "inactive"} ${className}`}
      type="button"
      onClick={handleClick}
      disabled={disabled}
      data-testid={id || "toggle-button"}
    >
      {text
        ? `${text}: ${value ? trueLabel : falseLabel}`
        : value
        ? trueLabel
        : falseLabel}
    </button>
  );
};

export default ToggleButton;
