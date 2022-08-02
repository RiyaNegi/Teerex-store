import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";
import updateListFunc from "../utils/updateItems";
import deleteItemFunc from "../utils/deleteItem";
import updateFilterListFunc from "../utils/updateFilterList";
import clearFiltersFunc from "../utils/clearFiltersFunc";
import { BASE_URL, MAX_PRICE } from "../constants";

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

type FilterList = {
  type: string;
  choice: string[];
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
  const [filterList, setfilterList] = useState<FilterList>([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

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
    let filteredSearch: ProductList = [...productdata];

    filteredSearch = performFilter(productdata, filterList);
    const filterTypes = ["name", "color", "type"];

    const filterSearch = (item: object) => {
      let flag = false;
      filterTypes.forEach((val: string) => {
        //@ts-ignore
        item[val].toLowerCase().includes(search) === true && (flag = true);
      });
      return flag;
    };

    if (search === "") {
      setProductList(filteredSearch);
    } else {
      filteredSearch = filteredSearch.filter((item) => filterSearch(item));
      setProductList(filteredSearch);
    }
  }, [search, filterList]);

  useEffect(() => {
    const filteredList = performFilter(productdata, filterList);
    setProductList(filteredList);
  }, [filterList]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/coding-problems/shopping-cart/catalogue.json `)
      .then(function (response) {
        setProductData(response.data);
        setProductList(response.data);
      })
      .catch(function (error) {
        setError(true);
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
        clearFilters,
        width: windowDimensions.width,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function performFilter(productdata: ProductList, filterList: FilterList) {
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

  const filterPrice = (
    arrList: ProductList,
    item: { type: string; choice: string[] }
  ) => {
    return arrList.filter((product) => {
      return (
        item.choice.filter((val) => {
          let min = JSON.parse(val.split("- ")[0].substring(2));
          let max = val.split("- ")[1]
            ? JSON.parse(val.split("- ")[1].substring(2))
            : MAX_PRICE;
          return product.price >= min && product.price <= max;
        }).length > 0
      );
    });
  };

  const shouldFilter = filterList.filter((i: any) => i.choice.length > 0);
  shouldFilter.length > 0
    ? filterList.forEach((val: any) => {
        val.type === "price"
          ? (filteredList = filterPrice(filteredList, val))
          : (filteredList = filtering(filteredList, val));
      })
    : (filteredList = [...productdata]);

  return filteredList;
}
