import { atom } from "recoil";

const alertCommentsApiData = atom({
  key: "alertCommentsApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default alertCommentsApiData;
