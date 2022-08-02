import "./index.css";
import search from "../../media/search.png";
import { useContext, useEffect, useState, useCallback } from "react";
import { GlobalContext } from "../../context/Provider";
import { debounce } from "lodash";

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const globalStore: any = useContext(GlobalContext);

  // const debounceFn = (handleFunc: Function) =>
  //   useCallback(debounce(handleFunc(searchValue), 1000), []);

  function handleChange(event: any) {
    event.preventDefault();
    globalStore.setSearch(event.target.value);
    // debounceFn(globalStore.setSearch);
  }
  console.log("valyue", globalStore.search);

  return (
    <div className="search-div">
      <div className="search-bar">
        <input
          placeholder="Search for products here..."
          onChange={(event: any) => handleChange(event)}
        />
        <img src={search} style={{ width: 18 }} />
      </div>
    </div>
  );
};

export default Index;
