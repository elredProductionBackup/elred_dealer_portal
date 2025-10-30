import ConfirmationPopup from "../../../components/ConfirmationPopup";
import ProductImage from "../../../components/ProductImage";
import product1 from "../../../assets/images/product-1.png";
import product2 from "../../../assets/images/product-2.png";
import product3 from "../../../assets/images/product-3.png";

export default function TestPage() {
  const productImages = [product1, product2, product3];
  return (
    <main>
      <ConfirmationPopup
        message="Your order has been placed successfully !!!"
        subheading="You will be informed by your partner once the order is dispatched."
      />

      <ProductImage images={productImages} />
    </main>
  );
}
