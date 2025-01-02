import react from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-gray-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  console.log(type);
  return (
    <button type={type} className={`rounded-lg p-2 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
