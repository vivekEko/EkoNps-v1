import React from "react";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import CountUp from "react-countup";

const ENgagementTotalCards = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  return (
    <div className="grid grid-cols-3  gap-2   h-[340px] ">
      {apiData?.cards_data?.map((data, index) => (
        <div
          key={index}
          className=" h-full bg-white text-gray-600 rounded-md border text-center flex justify-center items-center flex-col "
        >
          <h3 className="text-[#000C08] capitalize opacity-40 text-[10px] md:text-[14px]">
            {data?.name}
          </h3>
          <h1 className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
            <CountUp start={0} duration={1} end={data?.value} separator="," />
          </h1>
        </div>
      ))}
    </div>
  );
};

export default ENgagementTotalCards;
