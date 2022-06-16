import { atom } from "recoil";

const negativeComments = atom({
  key: "negativeComments", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default negativeComments;
