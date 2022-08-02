import "./App.css";
import Products from "./components/Products/Index";
import Filter from "./components/Filter/Index";
import SearchBar from "./components/SearchBar/Index";
import { useContext } from "react";
import { GlobalContext } from "./context/Provider";
import { MOBILE_DIMENSION } from "./constants";

function App() {
  const globalStore: any = useContext(GlobalContext);
  return (
    <div>
      <div className="screen-space">
        <div className="searchBar-div">
          <SearchBar />
        </div>
        <div className="screen-divide ">
          {globalStore.width > MOBILE_DIMENSION && <Filter />}
          {globalStore.error ? (
            <div style={{ width: "100%" }}>
              Sorry, there was an error. Please refresh again later.
            </div>
          ) : globalStore.search != "" &&
            globalStore.filterSearch.length === 0 ? (
            <div style={{ width: "100%" }}>Nothing matching your search</div>
          ) : globalStore.filterList.length > 0 &&
            globalStore.productList.length === 0 ? (
            <div style={{ width: "100%" }}>Nothing matches your filter</div>
          ) : globalStore.productList.length > 0 ? (
            <div className="product-div">
              <Products />
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
