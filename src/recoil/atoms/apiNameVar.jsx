import { atom } from "recoil";

const apiNameVar = atom({
  key: "apiNameVar", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default apiNameVar;
