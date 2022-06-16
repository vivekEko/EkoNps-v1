import { atom } from "recoil";

const npsAPIdata = atom({
  key: "npsAPIdata", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default npsAPIdata;
