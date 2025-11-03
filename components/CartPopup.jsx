"use client";
import Image from "next/image";

const CartPopup = ({ show, onClose, order, onRemoveItem }) => {
  const safeOrder = order || { products: [], total: 0 };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`cart-overlay ${show ? "show" : "hide"}`}
      />

      {/* Popup */}
      <div className={`cart-popup ${show ? "open" : "closed"}`}>
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            My cart ({safeOrder.products.length})
          </h2>
          {/* <button onClick={onClose} className="cart-close-btn">✕</button> */}
        </div>

        {/* Product list */}
        <div className="cart-products">
            <div className="cart-item-header"></div>
          {safeOrder.products.length > 0 ? (
            safeOrder.products.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-img" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-variant">{item.variant}</p>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">₹ {item.price}</span>
                  <button
                    onClick={() => onRemoveItem?.(index)}
                    className="cart-item-remove"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">Your cart is empty.</div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <p className="cart-address">
            <span className="address-label">Delivery Address:</span><br />
            <span className="address-note">
              Note: please contact your partner for address change
            </span><br />
            28, Rajasthani Udyhog Nagar, G.T. Karnal, Haryana, India
          </p>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Items total</span>
              <span>₹ {safeOrder.total}</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>₹ 100</span>
            </div>
            <div className="summary-row total">
              <span>Order total</span>
              <span>₹ {safeOrder.total + 100}</span>
            </div>
          </div>

          <div className="cart-actions">
            <button onClick={onClose} className="btn-clear">Clear Cart</button>
            <button className="btn-place">Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPopup;
