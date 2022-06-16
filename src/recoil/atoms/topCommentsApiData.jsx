import { atom } from "recoil";

const topCommentsApiData = atom({
  key: "topCommentsApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default topCommentsApiData;
