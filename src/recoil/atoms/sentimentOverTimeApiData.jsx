import { atom } from "recoil";

const sentimentOverTimeApiData = atom({
  key: "sentimentOverTimeApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default sentimentOverTimeApiData;
