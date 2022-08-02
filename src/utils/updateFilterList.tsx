import _ from "lodash";

const updateFilterListFunc = (
  value: { type: string; choice: string },
  filterList: {
    type: string;
    choice: string[];
  }[],
  setfilterList: Function
) => {
  let filterListCopy = [...filterList];

  const indexOfType = _.findIndex(
    filterListCopy,
    function (val: { type: string }) {
      return val.type === value.type;
    }
  );
  const indexOfChoice =
    indexOfType === -1
      ? -1
      : _.findIndex(filterListCopy[indexOfType].choice, function (val) {
          return val === value.choice;
        });

  if (indexOfType != -1) {
    if (indexOfChoice === -1) {
      filterListCopy[indexOfType].choice.push(value.choice);
    } else {
      filterListCopy[indexOfType].choice.splice(indexOfChoice, 1);
    }
  } else if (indexOfChoice === -1) {
    filterListCopy.push({
      type: value.type,
      choice: [value.choice],
    });
  } else {
    filterListCopy.splice(indexOfChoice, 1);
  }

  filterListCopy = filterListCopy.filter((i) => i.choice.length > 0);
  setfilterList(filterListCopy);
};

export default updateFilterListFunc;
