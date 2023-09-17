import React from "react";

export default function TextArea({
  label,
  name,
  rows, 
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-[500] text-xl text-blue-600 dark:text-white font-lato"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className="bg-transparent resize-none text-lg font-inter px-3 py-2 border border-gray-300 text-gray-600 dark:text-slate-50  focus:border-[#3b38dd]  dark:focus:border-[#fffc5d]"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
