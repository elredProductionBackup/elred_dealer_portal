"use client";
import React, { useState } from "react";
import Image from "next/image";
import filterIcon from "../assets/images/filter-icon.svg";
import arrowDown from "../assets/images/arrow-down-sidebar.svg";

export default function SupportSidebar({ categories, onSelect, selected }) {
  const [openSections, setOpenSections] = useState(categories.map(() => true));

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };
  return (
    <div className="w-[320px] bg-white border border-[#0000001A] rounded-[20px] py-[20px] px-[24px]">
      <div className="flex flex-row justify-between items-center border-b border-[#0000001A] pb-6 mb-6">
        <h2 className="font-[600] text-[20px]">Help & Support</h2>
        <Image src={filterIcon} alt="Order Placed" priority />
      </div>

      {categories.map((section, i) => (
        <div key={i} className="mb-2">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(i)}
            className="flex w-full justify-between items-center text-left font-[500] text-[20px] pb-[30px] cursor-pointer"
          >
            {section.title}
            <span
              className={`text-gray-600 transition-transform duration-300 ${
                openSections[i] ? "rotate-180" : "rotate-0"
              }`}
            >
              <Image src={arrowDown} alt="Toggle section" priority />
            </span>
          </button>

          {/* Section Links */}
          {openSections[i] && (
            <ul className="border-b border-[#0000001A] pb-6 mb-6">
              {section.links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onSelect(link)}
                    className={`w-full text-[16px] font-[400] text-left pb-[24px] cursor-pointer ${
                      selected === link ? "text-[#000000]" : "text-[#00000099]"
                    }`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
