import { atom } from "recoil";

const calendarIsOpen = atom({
  key: "calendarIsOpen", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default calendarIsOpen;
