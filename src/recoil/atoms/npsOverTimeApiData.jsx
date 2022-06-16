import { atom } from "recoil";

const npsOverTimeApiData = atom({
  key: "npsOverTimeApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default npsOverTimeApiData;
