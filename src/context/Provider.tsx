import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";
import updateListFunc from "./updateItems";
import deleteItemFunc from "./deleteItem";

export const GlobalContext = createContext({});

const filterType = ["color", "gender", "price", "type"];

export const GlobalProvider = ({ children }: { children: any }) => {
  const [productList, setProductList] = useState<
    {
      id: string;
      name: string;
      price: number;
      imageURL: string;
      quantity: number;
      type: string;
      color: string;
      gender: string;
    }[]
  >([]);
  const [cartList, setUpdateCart] = useState<
    {
      id: string;
      name: string;
      price: number;
      imageURL: string;
      quantity: number;
    }[]
  >([]);
  const [filterList, setfilterList] = useState<
    {
      type: string;
      choice: string | number;
    }[]
  >([]);

  const notify = () => toast.error("No more items available!");

  const updateItems = (value: any, add: boolean) =>
    updateListFunc(cartList, value, add, setUpdateCart);

  const deleteItem = (value: any) =>
    deleteItemFunc(value, cartList, setUpdateCart);

  const updateFilterList = (value: any) => {
    let filterListCopy = [...filterList];
    const index = _.findIndex(
      filterListCopy,
      function (val: { choice: string | number }) {
        return val.choice === value.choice;
      }
    );

    if (index === -1) {
      filterListCopy.push({ type: value.type, choice: value.choice });
    } else {
      filterListCopy.splice(index, 1);
    }
    setfilterList(filterListCopy);
  };

  const filterItems = () => {};

  useEffect(() => {
    let productListCopy = [...productList];
    console.log("checkkkk", filterList);
    // debugger;
    // for (let i in filterList) {
    //   productListCopy = productListCopy.filter(
    //     (x) =>
    //       x.type === filterList[i].choice ||
    //       x.gender === filterList[i].choice ||
    //       x.color === filterList[i].choice ||
    //       x.price === filterList[i].choice
    //   );
    // }
    // console.log(productListCopy);
  }, [filterList]);

  useEffect(() => {
    axios
      .get(
        " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json "
      )
      .then(function (response) {
        setProductList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        productList,
        updateItems,
        cartList,
        notify,
        deleteItem,
        updateFilterList,
        filterList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
