import { atom } from "recoil";

const goButtonStatus = atom({
  key: "goButtonStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default goButtonStatus;
