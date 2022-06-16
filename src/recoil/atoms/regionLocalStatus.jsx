import { atom } from "recoil";

const regionLocalStatus = atom({
  key: "regionLocalStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default regionLocalStatus;
