import { atom } from "recoil";

const UserValidity = atom({
  key: "UserValidity", // unique ID (with respect to other atoms/selectors)
  default: sessionStorage.getItem("useStatus"), // default value (aka initial value)
});

export default UserValidity;
