import { atom } from "recoil";

const totalCommentsApiData = atom({
  key: "totalCommentsApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default totalCommentsApiData;
