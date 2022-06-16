import { atom } from "recoil";

const providersApiData = atom({
  key: "providersApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default providersApiData;
