import { atom } from "recoil";

const newRegionGlobalValue = atom({
  key: "newRegionGlobalValue", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default newRegionGlobalValue;
