import React from "react";
import Compass from "../../assets/img/Under Construction/Compass.svg";

const UnderConstruction = () => {
  return (
    <div className="text-center min-h-[85vh]  flex justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <img
          src={Compass}
          alt="Under Construction"
          className="w-[50px] sm:w-[70px]"
        />

        <div className="h-[5px] w-[25px] sm:w-[40px] md:w-[50px] rounded-md bg-[#00AC69]"></div>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-[#999E9C]">
          Under
        </h3>
        <h3 className="text-4xl sm:text-6xl md:text-7xl text-[#999E9C] font-bold">
          Construction
        </h3>
      </div>
    </div>
  );
};

export default UnderConstruction;
