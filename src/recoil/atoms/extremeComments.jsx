import { atom } from "recoil";

const extremeComments = atom({
  key: "extremeComments", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default extremeComments;
