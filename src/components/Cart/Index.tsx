import "./index.css";
import { useContext, useMemo } from "react";
import { GlobalContext } from "../../context/Provider";
import _ from "lodash";
import ItemQuantity from "../Products/ItemQuantity";
import React from "react";

const Index = () => {
  const globalStore: any = useContext(GlobalContext);

  const shoppingList = (value: any) => {
    return (
      <div className="cart-row">
        <div className="cart-item-row">
          <div style={{ display: "flex" }}>
            <img className="cart-img" src={value.imageURL} />
            <div className="cart-details">
              <span>{value.name}</span>
              <span>Rs{value.price}</span>
            </div>
          </div>
          <div className="cart-details quantity-block">
            <span>Quantity</span>
            <ItemQuantity value={value} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="delete-btn"
              onClick={() => globalStore.deleteItem(value)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const memoizedCartList = React.useMemo(
    () => globalStore.cartList.map((i: any) => shoppingList(i)),
    [globalStore.cartList]
  );

  return (
    <div className="cart-page">
      <span className="cart-title">Shopping Cart</span>

      {globalStore.cartList.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        memoizedCartList
      )}
      <div className="total-amt">
        Total amount :{" "}
        {globalStore.cartList.length > 0
          ? globalStore.cartList.reduce(
              (acc: any, amt: any) => (acc += amt.quantity * amt.price),
              0
            )
          : 0}
      </div>
    </div>
  );
};

export default React.memo(Index);
