"use client";

import { useState } from "react";

export default function SelectableGroup({
  title,
  options,
  defaultValue,
  onChange,
}) {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="mb-6">
      <h3 className="text-2xl font-medium mb-7">{title}</h3>
      <div className="flex flex-wrap gap-5 mb-12">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className={`px-10 py-4 rounded-lg border text-2xl font-normal transition cursor-pointer
              ${
                selected === option
                  ? "bg-[#FDEAEB] border-[#BE212A] text-[#BE212A]"
                  : "bg-white border-[#C8C8C8]"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
