import { atom } from "recoil";

const neutralComments = atom({
  key: "neutralComments", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default neutralComments;
