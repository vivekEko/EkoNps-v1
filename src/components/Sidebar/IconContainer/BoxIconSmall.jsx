import React from "react";

const BoxIconSmall = (props) => {
  return (
    <svg
      viewBox="0 0 16 18"
      fill={props.iconName === props.pageName ? "#00AC69" : "transparent"}
      className="w-[16px] opacity-70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6666 4.83333L8.89435 1.94721C8.33129 1.66569 7.66855 1.66569 7.10549 1.94721L1.33325 4.83333M14.6666 4.83333L7.99992 8.16667M14.6666 4.83333V11.9306C14.6666 12.6881 14.2386 13.3807 13.561 13.7195L7.99992 16.5M1.33325 4.83333L7.99992 8.16667M1.33325 4.83333V11.9306C1.33325 12.6881 1.76126 13.3807 2.43882 13.7195L7.99992 16.5M7.99992 8.16667V16.5"
        stroke={props.iconName === props.pageName ? "#00AC69" : "#000C08"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoxIconSmall;
