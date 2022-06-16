import { atom } from "recoil";

const UserAuthAtom = atom({
  key: "UserAuthAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default UserAuthAtom;
