import React from "react";
import "./ToggleButton.scss";
interface ToggleButtonProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}
const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  setValue,
  text,
}) => {
  const handleClick = () => {
    setValue(!value);
  };

  return (
    <button
      className={`toggle-button ${value ? "active" : "inactive"}`}
      type="button"
      onClick={handleClick}
      data-testid="toggle-button"
    >
      {text}: {value ? "On" : "Off"}
    </button>
  );
};

export default ToggleButton;
