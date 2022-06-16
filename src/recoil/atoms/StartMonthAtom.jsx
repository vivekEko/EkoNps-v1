import { atom } from "recoil";

const startMonthValue = atom({
  key: "startMonthValue", // unique ID (with respect to other atoms/selectors)
  default: "1", // default value (aka initial value)
});

export default startMonthValue;
