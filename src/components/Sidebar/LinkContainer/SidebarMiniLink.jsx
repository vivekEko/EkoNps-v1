import React from "react";

const SidebarMiniLink = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`  flex justify-start items-center ml-[16px] transition-all mb-[10px] cursor-pointer`}
    >
      {props.icon}
      <div className="text-[#000C08]  text-[13px] ml-[10px] font-medium opacity-70">
        {props.linkName}
      </div>
      <div
        className={`w-[4px] opacity-70  ${
          props.pageName === props.iconName ? "visible " : "invisible"
        } bg-[#0189B9] bg-opacity-50 h-[32px] rounded-sm ml-auto mr-[4px] transition`}
      ></div>
    </div>
  );
};

export default SidebarMiniLink;
