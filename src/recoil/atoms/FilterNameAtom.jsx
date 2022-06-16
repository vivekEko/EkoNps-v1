import { atom } from "recoil";

const filterName = atom({
  key: "filterName", // unique ID (with respect to other atoms/selectors)
  default: "2021", // default value (aka initial value)
});

export default filterName;
