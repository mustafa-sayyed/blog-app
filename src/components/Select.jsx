import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { label, className = "", options = [], ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className={`bg-gray-500  ${className}`}
        ref={ref}
        {...props}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
