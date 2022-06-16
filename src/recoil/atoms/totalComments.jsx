import { atom } from "recoil";

const totalComments = atom({
  key: "totalComments", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default totalComments;
