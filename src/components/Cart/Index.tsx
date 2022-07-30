import "./index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import _ from "lodash";
import ItemQuantity from "../Products/ItemQuantity";

const Index = () => {
  const globalStore: any = useContext(GlobalContext);
  console.log("check", globalStore.cartList);

  const shoppingList = (value: any) => {
    return (
      <div className="cart-row">
        <div className="cart-item-row">
          <div style={{ display: "flex" }}>
            <img src={value.imageURL} style={{ width: 100 }} />
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

  return (
    <div className="cart-page">
      <span className="cart-title">Shopping Cart</span>

      {globalStore.cartList.length === 0 ? (
        <div className="empty-cart">Your cart is empty</div>
      ) : (
        globalStore.cartList.map((i: any) => shoppingList(i))
      )}
    </div>
  );
};

export default Index;
