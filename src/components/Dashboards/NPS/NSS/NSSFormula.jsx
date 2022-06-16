import React from "react";
import PositiveIcon from "../../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";

const NSSFormula = () => {
  return (
    <div className="p-2 md:p-5 w-full lg:min-h-[285px] rounded-lg bg-white   ">
      <div className="w-full h-[100%]">
        <h1 className=" font-bold opacity-80 text-[18px] mb-10 lg:mb-[70px]">
          Sentiments
        </h1>
        <div className="flex justify-center items-center  mx-auto  gap-2 h-full pb-10">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center items-center flex-col">
              <img
                src={PositiveIcon}
                alt="Promoter"
                className="w-[40px] mb-2"
              />
              <div className="opacity-70 text-[10px] sm:text-xs xl:text-sm">
                Positive %
              </div>
            </div>

            <div className="text-5xl">-</div>
            {/* <div className="border-l-black rounded-full h-[70px] w-[20px] border-l-[5px] opacity-70"></div> */}
            <div className="text-5xl">(</div>
            <div className="flex justify-center items-center flex-col">
              <img
                src={NegativeIcon}
                alt="Promoter"
                className="w-[40px] mb-2"
              />
              <div className="opacity-70 text-[10px] sm:text-xs xl:text-sm">
                Negative %
              </div>
            </div>

            <div className="text-3xl">
              +
              {/* <div className="bg-black rounded-lg h-[5px] w-[20px] opacity-70"></div>
              <div className="bg-black rounded-lg h-[5px] w-[20px] opacity-70 absolute rotate-90 -translate-y-1"></div> */}
            </div>

            <div className="flex justify-center items-center flex-col">
              <img src={ExtremeIcon} alt="Promoter" className="w-[40px] mb-2" />
              <div className="opacity-70 text-[10px] sm:text-xs xl:text-sm">
                Extreme %
              </div>
            </div>

            {/* <div className="border-r-black rounded-full h-[70px] w-[20px] border-r-[5px] opacity-70"></div> */}
            <div className="text-5xl">)</div>

            {/* <div className="text-5xl">
            
              =
            </div>

            <div>
              <h1 className="text-xl sm:text-3xl opacity-70 font-semibold">
                NSS %
              </h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSSFormula;
