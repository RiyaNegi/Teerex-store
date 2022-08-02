import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
import "./index.css";
import _ from "lodash";
import ItemQuantity from "./ItemQuantity";

const Index = () => {
  const globalStore: any = useContext(GlobalContext);
  const productList =
    globalStore.filterSearch.length > 0
      ? globalStore.filterSearch
      : globalStore.productList;
  const cartList = globalStore.cartList;

  const productCard = (i: any) => {
    const index = _.findIndex(cartList, function (val: { id: string }) {
      return val.id == i.id;
    });

    return (
      <div className="prod-card" key={i.id}>
        <div className="prod-img">
          <img src={i.imageURL} alt={i.name} />
          <span className="prod-name">{i.name}</span>
        </div>
        <div className="prod-details">
          <span>Rs{i.price}</span>
          {index != -1 ? (
            <ItemQuantity value={i} />
          ) : (
            <button
              className="cart-btn"
              onClick={() => globalStore.updateItems(i, true)}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="product-div">
      {productList.map((i: any) => productCard(i))}
    </div>
  );
};

export default Index;
