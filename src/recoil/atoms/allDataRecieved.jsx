import { atom } from "recoil";

const allDataRecieved = atom({
  key: "allDataRecieved", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default allDataRecieved;
