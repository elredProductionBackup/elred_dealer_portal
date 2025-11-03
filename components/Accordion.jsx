"use client";
import React, { useState } from "react";
import Image from "next/image";
import arrowDown from "../assets/images/arrow-round-down.svg";

export default function Accordion({ items }) {
  // keep all open by default
  const [openIndexes, setOpenIndexes] = useState(items.map(() => true));

  if (!items || items.length === 0)
    return (
      <p className="flex flex-1 flex-row items-center justify-center h-[73vh]">Select a topic from the sidebar.</p>
    );

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="flex-1">
      <h2 className="font-[600] text-[20px] mb-[40px]">Help & Support</h2>
      <div className="space-y-[30px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-[#F6F7F8] p-[40px] cursor-pointer"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex justify-between w-full text-left font-[700] text-[24px] cursor-pointer"
            >
              {`${index + 1}. ${item.question}`}
              <span
                className={`transition-transform duration-300 ${
                  openIndexes[index] ? "" : "rotate-180"
                }`}
              >
                <Image src={arrowDown} alt="Toggle arrow" priority />
              </span>
            </button>
            {openIndexes[index] && (
              <p className="text-[#333] mt-[30px] font-[400] text-[20px]">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
