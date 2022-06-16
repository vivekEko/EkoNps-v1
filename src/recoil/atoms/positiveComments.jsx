import { atom } from "recoil";

const positiveComments = atom({
  key: "positiveComments", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default positiveComments;
