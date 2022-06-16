import { atom } from "recoil";

const hamburgerStatusRecoil = atom({
  key: "hamburgerStatusRecoil", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default hamburgerStatusRecoil;
