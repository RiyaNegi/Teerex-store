import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import _ from "lodash";

const ItemQuantity = ({ value }: { value: any }) => {
  const globalStore: any = useContext(GlobalContext);
  const productList = globalStore.productList;
  const cartList = globalStore.cartList;

  const productIndex = _.findIndex(productList, function (val: { id: string }) {
    return val.id == value.id;
  });

  const cartIndex = _.findIndex(cartList, function (val: { id: string }) {
    return val.id == value.id;
  });

  const itemLimitExceeded = () =>
    cartList[cartIndex].quantity >= productList[productIndex].quantity
      ? true
      : false;

  return (
    <div className="cart-update">
      <button
        className="cart-action"
        onClick={() => globalStore.updateItems(value, false)}
      >
        -
      </button>
      <span>{cartList[cartIndex].quantity}</span>
      <button
        className="cart-action"
        onClick={() =>
          itemLimitExceeded()
            ? globalStore.notify()
            : globalStore.updateItems(value, true)
        }
      >
        +
      </button>
    </div>
  );
};

export default ItemQuantity;
