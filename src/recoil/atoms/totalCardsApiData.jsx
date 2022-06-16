import { atom } from "recoil";

const totalCardsApiData = atom({
  key: "totalCardsApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default totalCardsApiData;
