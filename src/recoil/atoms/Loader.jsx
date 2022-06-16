import { atom } from "recoil";

const LoaderStatus = atom({
  key: "LoaderStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default LoaderStatus;
