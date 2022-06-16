import { atom } from "recoil";

const clinicLocalStatus = atom({
  key: "clinicLocalStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default clinicLocalStatus;
