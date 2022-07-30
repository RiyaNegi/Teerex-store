import "./index.css";
import search from "../../media/search.png";

const Index = () => {
  return (
    <div className="search-div">
      <div className="search-bar">
        <input placeholder="Search for products here..." />
        <img src={search} style={{ width: 18 }} />
      </div>
    </div>
  );
};

export default Index;
