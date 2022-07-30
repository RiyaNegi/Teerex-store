import _ from "lodash";

const updateItemsFunc = (
  cartList: any,
  value: any,
  add: boolean,
  setUpdateCart: Function
) => {
  let updateCartCopy = [...cartList];

  const index = _.findIndex(updateCartCopy, function (val: { id: string }) {
    return val.id == value.id;
  });

  if (index === -1) {
    updateCartCopy.push({
      id: value.id,
      name: value.name,
      price: value.price,
      imageURL: value.imageURL,
      quantity: 1,
    });
  } else if (add == false) {
    updateCartCopy[index].quantity > 1
      ? (updateCartCopy[index].quantity -= 1)
      : updateCartCopy.splice(index, 1);
  } else {
    updateCartCopy[index].quantity += 1;
  }
  setUpdateCart(updateCartCopy);
};

export default updateItemsFunc;
