import { atom } from "recoil";

const activeInnerPage = atom({
  key: "activeInnerPage", // unique ID (with respect to other atoms/selectors)
  default: "NPS_Overall", // default value (aka initial value)
});

export default activeInnerPage;
