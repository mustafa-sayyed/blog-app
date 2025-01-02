import react,{useId} from "react";

function Input({ label, type = "text", placeholder = "", className = "", ...props }, ref) {
  const id = useId();
  
  return (
    <div>
    {label && <label htmlFor={id} className="p-1">{label}</label>}
      <input
        id={id}
        className={`px-3 py-1.5 rounded-lg text-black ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
}

// The Input component is need to wrapped in a forwardRef call, which allows the component to accept a ref prop. The ref prop is passed to the input element, which allows the parent component to access the input element's DOM node.

export default react.forwardRef(Input);

// OR

// const referencedInput = react.forwardRef(Input);

// export default referencedInput;
