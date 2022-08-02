import _ from "lodash";

const deleteItemFunc = (value: any, cartList: any, setUpdateCart: Function) => {
  let updateCartCopy = [...cartList];

  const index = _.findIndex(updateCartCopy, function (val: { id: string }) {
    return val.id == value.id;
  });
  updateCartCopy.splice(index, 1);
  setUpdateCart(updateCartCopy);
};

export default deleteItemFunc;
