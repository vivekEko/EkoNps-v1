import { atom } from "recoil";

const npsVsSentimentApiData = atom({
  key: "npsVsSentimentApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default npsVsSentimentApiData;
