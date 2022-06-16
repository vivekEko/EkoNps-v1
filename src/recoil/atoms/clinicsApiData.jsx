import { atom } from "recoil";

const clinicsApiData = atom({
  key: "clinicsApiData", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default clinicsApiData;
