"use client";

import { useState } from "react";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(12);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleBlur = () => {
    const num = Number(quantity);
    if (num < 12) {
      setQuantity(12);
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className="flex flex-col w-full mb-12">
      <label className="text-[24px] font-[500] mb-[17px]">Enter Quantity</label>

      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min={12}
        onBlur={handleBlur}
        className={`bg-gray-50 rounded-lg px-4 py-3 text-[20px] font-medium border transition focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-200 focus:ring-gray-300"
        }`}
      />

      <p className="text-[#E72D38] text-[14px] mt-[4px]">Minimum orders 12*</p>
    </div>
  );
}