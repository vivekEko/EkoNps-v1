import { atom } from "recoil";

const startDateValue = atom({
  key: "startDateValue", // unique ID (with respect to other atoms/selectors)
  default: new Date().getFullYear(),
});

export default startDateValue;
