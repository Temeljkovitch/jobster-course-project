import React from "react";

const FormRow = ({ name, type, value, text, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {text || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
