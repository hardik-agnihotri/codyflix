import React from "react";

interface InputProps {
  onChange: any;
  value: string;
  placeholder: string;
  type?:string
}

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  type
}) => {
  return (
    <div>
      <input
        type={type}
        className="bg-white rounded py-2 w-full bg-zinc-500 text-2xl px-2 text-white mt-10 focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
