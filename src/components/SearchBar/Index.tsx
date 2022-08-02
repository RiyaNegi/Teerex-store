import "./index.css";
import search from "../../media/search.png";
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { GlobalContext } from "../../context/Provider";
import { debounce } from "lodash";
import Filter from "../Filter/Index";
import filterImg from "../../media/filter.png";
import { MOBILE_DIMENSION } from "../../constants";

function useOutsideAlerter(ref: any, setFilterToggle: Function) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        setFilterToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const globalStore: any = useContext(GlobalContext);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setFilterToggle);

  const debounceFn = useCallback(
    debounce((searchValue) => globalStore.setSearch(searchValue), 500),
    []
  );

  function handleChange(event: any) {
    setSearchValue(event.target.value);
    debounceFn(event.target.value);
  }

  return (
    <div className="search-div">
      <div className="search-bar">
        <input
          placeholder="Search for products here..."
          onChange={handleChange}
        />
        <img src={search} style={{ width: 18 }} />
      </div>
      {globalStore.width < MOBILE_DIMENSION && (
        <img
          src={filterImg}
          style={{ width: 18, marginLeft: 15 }}
          onClick={() => setFilterToggle(!filterToggle)}
          ref={wrapperRef}
        />
      )}
      {globalStore.width < MOBILE_DIMENSION && filterToggle && (
        <div className="filter-toggle">
          <Filter />
        </div>
      )}
    </div>
  );
};

export default Index;
