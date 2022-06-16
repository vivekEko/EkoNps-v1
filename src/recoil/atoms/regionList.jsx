import { atom } from "recoil";

const regionList = atom({
  key: "regionList", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default regionList;
