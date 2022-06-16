import { atom } from "recoil";

const activeFilterButton = atom({
  key: "activeFilterButton", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default activeFilterButton;
