import { atom } from "recoil";

const flushClinic = atom({
  key: "flushClinic", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default flushClinic;
