import { atom } from "recoil";

const GlobalUsername = atom({
  key: "GlobalUsername", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default GlobalUsername;
