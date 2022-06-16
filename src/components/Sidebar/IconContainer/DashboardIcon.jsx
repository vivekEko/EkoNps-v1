import React from "react";

const DashboardIcon = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={props.iconName === props.pageName ? "#00AC69" : "transparent"}
      className="w-[18px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.7"
        x="13.75"
        y="3.75"
        width="6.5"
        height="6.5"
        rx="1.75"
        stroke={props.iconName === props.pageName ? "#00AC69" : "#000C08"}
        strokeWidth="1.5"
      />
      <rect
        opacity="0.7"
        x="3.75"
        y="13.75"
        width="6.5"
        height="6.5"
        rx="1.75"
        stroke={props.iconName === props.pageName ? "#00AC69" : "#000C08"}
        strokeWidth="1.5"
      />
      <rect
        opacity="0.7"
        x="3.75"
        y="3.75"
        width="6.5"
        height="6.5"
        rx="1.75"
        stroke={props.iconName === props.pageName ? "#00AC69" : "#000C08"}
        strokeWidth="1.5"
      />
      <rect
        opacity="0.7"
        x="13.75"
        y="13.75"
        width="6.5"
        height="6.5"
        rx="1.75"
        stroke={props.iconName === props.pageName ? "#00AC69" : "#000C08"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default DashboardIcon;
