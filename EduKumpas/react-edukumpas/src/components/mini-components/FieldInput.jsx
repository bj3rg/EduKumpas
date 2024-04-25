import React from "react";

function FieldInput({ type, inputDisplay, width, handleChange, value }) {
  return (
    <div className="text-white text-[14px]">
      <h1>{inputDisplay}</h1>
      <input
        type={type}
        className={
          "px-[5px] text-black h-[28px] bg-white rounded-[8px] " + width
        }
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default FieldInput;
