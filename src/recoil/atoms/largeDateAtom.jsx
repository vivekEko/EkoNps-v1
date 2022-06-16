import { atom } from "recoil";

const largeDateAtom = atom({
  key: "largeDateAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default largeDateAtom;
