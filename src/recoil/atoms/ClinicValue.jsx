import { atom } from "recoil";

const ClinicValue = atom({
  key: "ClinicValue", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default ClinicValue;
