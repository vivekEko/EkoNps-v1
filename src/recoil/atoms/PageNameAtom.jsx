import { atom } from "recoil";

const componentName = atom({
  key: "componentName", // unique ID (with respect to other atoms/selectors)
  default: "/", // default value (aka initial value)
});

export default componentName;
