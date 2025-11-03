"use client";
import { useState } from "react";

export default function ColorSelector({ colors }) {
  const [selected, setSelected] = useState(colors[0]);

  // Handle color selection and log to console
  const handleChange = (color) => {
    setSelected(color);
    console.log("Selected color:", color.name, color.hex);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-medium mb-7">Please Select Color</h2>

      <div className="flex items-center gap-[55px] flex-wrap">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => handleChange(color)}
            className="flex flex-col items-center focus:outline-none"
          >
            <div
              className={`w-14 h-14 rounded-full mb-[16px] transition-all duration-200 ${
                selected.name === color.name
                  ? "ring-3 ring-[#BE212A] ring-offset-[5px]"
                  : "ring-0"
              }`}
              style={{ backgroundColor: color.hex }}
            ></div>
            <span
              className={`text-[16px] ${
                selected.name === color.name
                  ? "font-semibold text-black"
                  : "text-black"
              }`}
            >
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
