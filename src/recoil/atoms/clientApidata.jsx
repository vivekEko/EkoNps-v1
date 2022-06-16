import { atom } from "recoil";

const clientApidata = atom({
  key: "clientApidata", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default clientApidata;
