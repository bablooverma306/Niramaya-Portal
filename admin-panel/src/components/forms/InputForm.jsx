import React from "react";

const InputForm = ({ label, value, setValue, disabled = false }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>

      <input
        type={label === "DOB" ? "date" : "text"}
        className="form-control"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export default InputForm;