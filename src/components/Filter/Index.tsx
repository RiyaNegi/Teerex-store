import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";

const filterSections = [
  {
    type: "color",
    value: ["Red", "Blue", "Green"],
  },
  {
    type: "gender",
    value: ["Men", "Women"],
  },
  {
    type: "price",
    value: ["Rs0 - Rs 250", "Rs251 - Rs450", "Rs450"],
  },
  {
    type: "type",
    value: ["Polo", "Hoodie", "Basic"],
  },
];

const Index = () => {
  // const [checked, setChecked] = use
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
                  checked={
                    globalStore.filterList.filter(
                      (val: { type: string; choice: string[] }) =>
                        val.choice.filter((value) => value === j).length > 0
                    ).length > 0
                  }
                  onChange={() =>
                    globalStore.updateFilterList({ type: i.type, choice: j })
                  }
                />
                {j}
              </div>
            ))}
          </div>
        ))}
        <div className="clear-btn-div">
          <button
            className="clear-btn"
            onClick={() => globalStore.clearFilters()}
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
