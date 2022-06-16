import { atom } from "recoil";

const nssAPIdata = atom({
  key: "nssAPIdata", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default nssAPIdata;
