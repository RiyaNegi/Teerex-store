import "./App.css";
import Products from "./components/Products/Index";
import Filter from "./components/Filter/Index";
import SearchBar from "./components/SearchBar/Index";
import { useContext } from "react";
import { GlobalContext } from "./context/Provider";

function App() {
  const globalStore: any = useContext(GlobalContext);
  return (
    <div>
      <div className="screen-space">
        <SearchBar />
        <div className="screen-divide ">
          <Filter />
          {globalStore.filterList.length > 0 &&
          globalStore.productList.length === 0 ? (
            <div>Nothing matches your filter</div>
          ) : globalStore.productList.length > 0 ? (
            <Products />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
