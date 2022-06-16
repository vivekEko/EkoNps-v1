import { atom } from "recoil";

const ClinicFilterAPiData = atom({
  key: "ClinicFilterAPiData", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export default ClinicFilterAPiData;
