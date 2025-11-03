"use client";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import ProductImage from "../../../components/ProductImage";
import SelectableGroup from "../../../components/SelectableGroup";
import QuantityInput from "../../../components/QuantityInput";
import ColorSelector from "../../../components/ColorSelector";
import product1 from "../../../assets/images/product-1.png";
import product2 from "../../../assets/images/product-2.png";
import product3 from "../../../assets/images/product-3.png";


export default function TestPage() {
  const productImages = [product1, product2, product3];

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

  return (
    <div className="flex flex-col gap-[30px] my-[30px] w-full max-w-[1600px] mx-auto px-[80px]">
      <ConfirmationPopup
        message="Your order has been placed successfully !!!"
        subheading="You will be informed by your partner once the order is dispatched."
      />

      <ProductImage images={productImages} />

      <div className="w-full pt-12">
        <ColorSelector colors={colors} />
      </div>

      <div className="pt-12">
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
    </div>
  );
}
