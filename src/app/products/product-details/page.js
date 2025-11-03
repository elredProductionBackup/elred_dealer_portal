"use client";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";
import ProductImage from "../../../../components/ProductImage";
import SelectableGroup from "../../../../components/SelectableGroup";
import QuantityInput from "../../../../components/QuantityInput";
import ColorSelector from "../../../../components/ColorSelector";
import ProductCard from "../../../../components/ProductCard";
import product1 from "../../../../assets/images/product-1.png";
import product2 from "../../../../assets/images/product-2.png";
import product3 from "../../../../assets/images/product-3.png";
import { useState } from "react";

export default function ProductDetails() {
  const productImages = [product1, product2, product3];
  const [clicked, setClicked] = useState(false);


  const colors = [
    { name: "Lite Magenta", hex: "#f9a8d4" },
    { name: "Magenta", hex: "#d000a2" },
    { name: "Lite Cyan", hex: "#00e5ff" },
    { name: "Cyan", hex: "#0097a7" },
    { name: "Black", hex: "#000000" },
  ];

  const handleSizeChange = (val) => {
    console.log("Selected size:", val);
  };

  const handlePackagingChange = (val) => {
    console.log("Selected packaging:", val);
  };

  const product = {
    id: "000789",
    name: "Konica Chrome",
    price: 300,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ent, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  const handleAddClick = () => {
    setClicked(true);
    console.log("Add button clicked!");
    // You can trigger any action here — API call, toast, etc.
  };

  return (
    <div className="flex flex-col my-[30px] w-full max-w-[1600px] mx-auto px-[30px] lg:px-[80px]">
  {/* <ConfirmationPopup
    message="Your order has been placed successfully !!!"
    subheading="You will be informed by your partner once the order is dispatched."
  /> */}

  {/* --- GRID START --- */}
  <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
    {/* LEFT COLUMN (Sticky) */}
    <div className="flex flex-col lg:w-1/2 sticky top-[100px] self-start">
      <h1 className="text-[28px] lg:text-[32px] font-[600] mb-[27px]">Konica Chrome</h1>

      <ProductImage images={productImages} />

      <div className="w-full max-w-xl">
        <ProductCard
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      </div>
    </div>

    {/* RIGHT COLUMN (Scrollable Content) */}
    <div className="flex flex-col gap-10 lg:w-1/2">
      <div className="w-full">
        <ColorSelector colors={colors} />
      </div>

      <div className="w-full">
        <SelectableGroup
          title="Please Select Size"
          options={["1 Liter", "5 Liter"]}
          defaultValue="1 Liter"
          onChange={handleSizeChange}
        />

        <SelectableGroup
          title="Select Packaging"
          options={["RNB", "Round XT 46", "NM", "AC RCT(467) A"]}
          defaultValue="RNB"
          onChange={handlePackagingChange}
        />
      </div>

      <div className="w-full max-w-lg">
        <QuantityInput />
      </div>

      <div className="w-full text-center">
        <button
          onClick={handleAddClick}
          className="border-2 border-[#BE212A] text-[#BE212A] rounded-[12px] w-[100%] sm:w-[407px] h-[66px] text-[24px] font-[600] cursor-pointer mx-auto"
        >
          {clicked ? "Added" : "Add"}
        </button>
      </div>
    </div>
  </div>
  {/* --- GRID END --- */}
</div>


  );
}
