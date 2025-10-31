"use client";
import { useState } from "react";
import Image from "next/image";
import orderSuccess from "../assets/images/order-placed.svg";
import spacer from "../assets/images/dot.svg";

export default function ConfirmationPopup({ message, subheading }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000001A]">
      <div className="bg-white rounded-2xl p-8 w-[500px] h-[500px] text-center py-[70px] px-[40px]">
        <div className="flex justify-center mb-[20px]">
          <Image
            src={orderSuccess}
            alt="Order Placed"
            width={218}
            height={173}
            priority
          />
        </div>
        <h2 className="text-xl font-semibold mb-[12px]">{message}</h2>
        <p className="text-[#909090] text-[14px] mb-[10] px-[40px]">{subheading}</p>
        <p className="text-[#666666] text-[16px] font-[500] mb-[30] flex flex-row justify-center items-center gap-[10px]">
          <span>30 Oct 2025</span>
          <span>
            <Image
              src={spacer}
              alt="Order Placed"
              priority
            />
          </span>
          <span>Order ID: #000789</span>
        </p>
        <a
          onClick={() => {
            setIsOpen(false);
          }}
          className="inline-block cursor-pointer bg-[#BE212A] text-white text-[18px] font-medium px-[40px] py-[10px] rounded-[12px]"
        >
          View Order
        </a>
      </div>
    </div>
  );
}
