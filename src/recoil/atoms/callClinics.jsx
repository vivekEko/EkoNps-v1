import { atom } from "recoil";

const callClinics = atom({
  key: "callClinics", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default callClinics;
