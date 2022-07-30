import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";

const filterSections = [
  {
    type: "Color",
    value: ["red", "blue", "green"],
  },
  {
    type: "Gender",
    value: ["Men", "Women"],
  },
  {
    type: "Price",
    value: ["Rs0 - Rs 250", "Rs251 - Rs450", "Rs450"],
  },
  {
    type: "Type",
    value: ["Polo", "Hoodie", "Basic"],
  },
];

const Index = () => {
  const globalStore: any = useContext(GlobalContext);

  return (
    <div className="filter-div">
      <div className="filter-box">
        {filterSections.map((i, index) => (
          <div key={i.type + index}>
            <div className="filter-title">{i.type}</div>
            {i.value.map((j, index) => (
              <div
                key={j + index}
                style={{ display: "flex", margin: "5px 0px" }}
              >
                <input
                  type="checkbox"
                  id={j}
                  name={j}
                  value={j}
                  onChange={() =>
                    globalStore.updateFilterList({ type: i.type, choice: j })
                  }
                />
                {j}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
