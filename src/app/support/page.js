"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/SupportSidebar";
import Accordion from "../../../components/Accordion";
import { sidebarData, accordionData } from "../data/helpData";

export default function HelpSupportPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // If no category selected → show all accordions merged
  const allItems = accordionData.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.category,
    }))
  );

  const filteredItems = selectedCategory
    ? accordionData.find((a) => a.category === selectedCategory)?.items || []
    : allItems;

  return (
    <div className="flex flex-row my-[30px] w-full max-w-[1600px] mx-auto px-[30px] lg:px-[80px] gap-[50px]">
      <Sidebar
        categories={sidebarData}
        onSelect={setSelectedCategory}
        selected={selectedCategory}
      />
      <Accordion items={filteredItems} />
    </div>
  );
}
