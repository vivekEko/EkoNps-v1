import React from "react";

const BoxIconLarge = (props) => {
  return (
    <svg
      viewBox="0 0 18 20"
      fill={props.iconName === props.pageName ? "#0189B9" : "transparent"}
      className="w-[17px] opacity-70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 5L9.89443 1.44721C9.33137 1.16569 8.66863 1.16569 8.10557 1.44721L1 5M17 5L9 9M17 5V13.7639C17 14.5215 16.572 15.214 15.8944 15.5528L9 19M1 5L9 9M1 5V13.7639C1 14.5215 1.428 15.214 2.10557 15.5528L9 19M9 9V19"
        stroke={props.iconName === props.pageName ? "#0189B9" : "#000C08"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoxIconLarge;
