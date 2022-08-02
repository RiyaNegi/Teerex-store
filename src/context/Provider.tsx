import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";
import updateListFunc from "./updateItems";
import deleteItemFunc from "./deleteItem";
import updateFilterListFunc from "./updateFilterList";
import clearFiltersFunc from "./clearFiltersFunc";

export const GlobalContext = createContext({});

type ProductList = {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  quantity: number;
  type: string;
  color: string;
  gender: string;
}[];

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const GlobalProvider = ({ children }: { children: any }) => {
  const [productList, setProductList] = useState<ProductList>([]);
  const [productdata, setProductData] = useState<ProductList>([]);
  const [cartList, setUpdateCart] = useState<ProductList>([]);
  const [filterList, setfilterList] = useState<
    {
      type: string;
      choice: string[];
    }[]
  >([]);
  const [filterSearch, setFilterSearch] = useState<ProductList>([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [search, setSearch] = useState("");

  const notify = () => toast.error("No more items available!");

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateItems = (value: any, add: boolean) =>
    updateListFunc(cartList, value, add, setUpdateCart);

  const deleteItem = (value: any) =>
    deleteItemFunc(value, cartList, setUpdateCart);

  const updateFilterList = (value: { type: string; choice: string }) => {
    updateFilterListFunc(value, filterList, setfilterList);
  };

  const clearFilters = () => clearFiltersFunc(setfilterList);

  useEffect(() => {
    let filteredSearch: ProductList =
      filterList.length > 0 ? [...productList] : [...productdata];
    const filterTypes = ["name", "color", "type"];

    const filterSearch = (item: object) => {
      let flag = false;
      filterTypes.forEach((val: string) => {
        //@ts-ignore
        item[val].toLowerCase().includes(search) === true && (flag = true);
      });
      return flag;
    };
    /*eslint-disable */
    search === ""
      ? setFilterSearch([])
      : ((filteredSearch = filteredSearch.filter((item) => filterSearch(item))),
        setFilterSearch(filteredSearch));
    /*eslint-enable */
  }, [search, filterList]);

  useEffect(() => {
    let filteredList: ProductList = [...productdata];

    const filtering = (
      arrList: ProductList,
      filters: {
        type: string;
        choice: string[];
      }
    ) => {
      return arrList.filter((item) =>
        //@ts-ignore
        filters.choice.includes(item[filters.type])
      );
    };

    const customLogic = (
      arrList: ProductList,
      item: { type: string; choice: string[] }
    ) => {
      return arrList.filter((product) => {
        return (
          item.choice.filter((val) => {
            let min = JSON.parse(val.split("- ")[0].substring(2));
            let max = val.split("- ")[1]
              ? JSON.parse(val.split("- ")[1].substring(2))
              : 10000000;
            return product.price >= min && product.price <= max;
          }).length > 0
        );
      });
    };

    const shouldFilter = filterList.filter((i) => i.choice.length > 0);
    shouldFilter.length > 0
      ? filterList.forEach((val) => {
          val.type === "price"
            ? (filteredList = customLogic(filteredList, val))
            : (filteredList = filtering(filteredList, val));
        })
      : (filteredList = [...productdata]);

    setProductList(filteredList);
  }, [filterList]);

  useEffect(() => {
    axios
      .get(
        " https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json "
      )
      .then(function (response) {
        setProductData(response.data);
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
        setSearch,
        search,
        filterSearch,
        clearFilters,
        width: windowDimensions.width,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};