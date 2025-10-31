"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RightArrow from "../../../assets/icons/rightArrow.svg";
import WhiteArrow from "../../../assets/icons/whiteRightArrow.svg";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "buy-again";
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => setActiveTab(currentTab), [currentTab]);

  const handleTabChange = (tab) => router.push(`?tab=${tab}`);

  const ordersData = {
    "buy-again": [
      {
        id: 1,
        date: "12 Oct 2025",
        orderId: "#000789",
        total: 900,
        products: [
          { id: 1, name: "Konica Chrome", variant: "Magenta | 1L | RNB", qty: 4 },
          { id: 2, name: "Konica Cobalt", variant: "Magenta | 1L | RNB", qty: 4 },
          { id: 3, name: "Konica Chrome", variant: "Magenta | 1L | RNB", qty: 4 },
          { id: 4, name: "Konica Chrome", variant: "Magenta | 1L | RNB", qty: 4 },
          { id: 5, name: "Konica Chrome", variant: "Magenta | 1L | RNB", qty: 4 },
        ],
      },
      {
        id: 2,
        date: "12 Oct 2025",
        orderId: "#000790",
        total: 900,
        products: [
          { id: 1, name: "Konica Pocolor", variant: "Magenta | 1L | RNB", qty: 4 },
          { id: 2, name: "Konica Cobalt", variant: "Magenta | 1L | RNB", qty: 4 },
        ],
      },
    ],
  };

  const orders = ordersData[activeTab];

  return (
    <div className="flex flex-col gap-[30px] my-[30px] p-[30px_36px] w-full max-w-[1070px] border border-[#0000001A] rounded-[12px]">
      {/* Tabs */}
      <div className="w-full flex items-center gap-[50px] border-b-[1.4px] border-[#E4E4E4]">
        {[{ key: "buy-again", label: "Buy it Again" }].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`relative min-h-[44px] px-[21px] text-[18px] font-medium cursor-pointer ${
              activeTab === tab.key ? "after:content-[''] after:absolute after:bottom-[-0.7px] after:left-0 after:w-full after:h-[2px] after:rounded-[35px] after:bg-[#BE212A]" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-[30px]">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border border-[#C8C8C8] rounded-[12px] py-[24px] flex flex-col">
              <p className="pl-[28px] pb-[30px] text-[24px] font-medium text-black leading-[34px] flex flex-col gap-[4px]">
                {order.orderId}
                <span className="text-[#848484] text-[16px] leading-normal">{order.date}</span>
              </p>

              {/* Products */}
              <div
                id="style-2"
                className="flex items-center gap-[16px] px-[28px] pb-[18px] overflow-x-auto overflow-y-hidden"
              >
                {order.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-[24px] border border-[#C8C8C8] rounded-[12px] py-[22px] px-[24px]"
                  >
                    <div className="min-h-[59px] min-w-[59px] rounded-[4px] bg-[#EAEFF5]" />
                    <div className="flex flex-col gap-[6px] whitespace-nowrap">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-[11px] text-[#909090]">{p.variant}</p>
                      <p className="text-[12px] font-medium">Qty: {p.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-[24px] mt-[4px] mx-[28px] flex items-center justify-between border-t border-[#C8C8C8]">
                <p className="flex flex-col font-medium text-[#848484]">
                  Total <span className="text-black text-[20px] font-semibold">${order.total}</span>
                </p>
                <div className="flex items-center gap-[20px]">
                  <button className="flex items-center border border-[#E72D38] text-[#E72D38] font-medium text-[14px] py-[7px] pl-[12.5px] pr-[5.5px] rounded-[8px] cursor-pointer">
                    View Order
                    <Image src={RightArrow} height={20} width={20} alt="RightArrow" />
                  </button>
                  <button className="flex items-center border border-[#E72D38] bg-[#E72D38] text-white font-medium text-[14px] py-[7px] pl-[12.5px] pr-[5.5px] rounded-[8px] cursor-pointer">
                    Order Again
                    <Image src={WhiteArrow} height={20} width={20} alt="WhiteArrow" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found for this tab.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
