import { atom } from "recoil";

const engagementModelAPI = atom({
  key: "engagementModelAPI", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default engagementModelAPI;
