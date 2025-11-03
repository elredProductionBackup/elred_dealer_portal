"use client";

export default function ProductCard({ id, name, price, description }) {
  return (
    <div className="pt-[40px]">
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-400 text-sm font-medium">#{id}</span>
        <span className="text-[20px] font-semibold text-black">${price}</span>
      </div>

      <h2 className="text-[22px] font-bold text-black mb-2">{name}</h2>

      <p className="text-gray-500 text-[15px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
