"use client";
import ConfirmationPopup from "../../../components/ConfirmationPopup";
import ProductImage from "../../../components/ProductImage";
import SelectableGroup from "../../../components/SelectableGroup";
import QuantityInput from "../../../components/QuantityInput";
import product1 from "../../../assets/images/product-1.png";
import product2 from "../../../assets/images/product-2.png";
import product3 from "../../../assets/images/product-3.png";


export default function TestPage() {
  const productImages = [product1, product2, product3];

  const handleSizeChange = (val) => {
    console.log("Selected size:", val);
  };

  const handlePackagingChange = (val) => {
    console.log("Selected packaging:", val);
  };

  return (
    <main>
      <ConfirmationPopup
        message="Your order has been placed successfully !!!"
        subheading="You will be informed by your partner once the order is dispatched."
      />

      <ProductImage images={productImages} />
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
    </main>
  );
}
