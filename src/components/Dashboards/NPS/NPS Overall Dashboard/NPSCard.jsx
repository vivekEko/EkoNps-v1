import React, { useEffect, useState } from "react";
// import MockApiNPSData from "../../../../mock_API/NPS/NPS Main Dashboard/NPSCard.json";
import CountUp from "react-countup";
import PromoterIcon from "../../../../assets/img/NPS Dashboard/greenMan.svg";
import PassiveIcon from "../../../../assets/img/NPS Dashboard/darkGrayMan.svg";
import DetractorIcon from "../../../../assets/img/NPS Dashboard/redMan.svg";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import LoaderStatus from "../../../../recoil/atoms/Loader";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const NPSCard = () => {
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [apiData, setApiData] = useState();
  const [loaderStatusValue, setLoaderStatusValue] =
    useRecoilState(LoaderStatus);
  const [showInfoNps, setShowInfoNps] = useState(false);

  useEffect(() => {
    setApiData(npsApiData);
  }, [npsApiData]);

  return (
    <div className="p-2 md:p-5 w-full border  rounded-lg bg-white flex justify-center md:justify-center items-center relative ">
      {!apiData?.nps && (
        <div className="min-h-[130px] bg-[#ffffff] z-[00] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.nps && (
        <div className="w-full  relative ">
          <div className=" font-bold  flex justify-between gap-2 items-center">
            <div className="opacity-80">Net Promoter Score</div>
            <div
              className="relative  "
              onMouseEnter={() => setShowInfoNps(!showInfoNps)}
              onMouseLeave={() => setShowInfoNps(!showInfoNps)}
            >
              <InfoRoundedIcon className="text-gray-300 opacity-80 hover:opacity-100" />

              {/* NPS explanation */}
              <div
                className={` ${
                  showInfoNps ? "block" : "hidden"
                } absolute top-[100%] right-0  bg-gray-50 z-[100] opacity-100 text-[10px] text-gray-500 p-4 rounded-lg shadow-lg`}
              >
                <h1 className="mb-2">How is NPS calculated ?</h1>
                <div className="flex justify-center items-center  mx-auto  gap-2 h-full">
                  <div className="flex justify-between items-center w-full gap-2">
                    <div className="flex justify-center items-center flex-col ">
                      <img
                        src={PromoterIcon}
                        alt="Promoter"
                        className="w-[20px] "
                      />
                      <div className="opacity-70 text-[10px]">Promoters%</div>
                    </div>
                    <div className="text-xl">-</div>
                    {/* <div className="text-2xl">(</div> */}
                    {/* <div className="flex justify-center items-center flex-col">
                      <img
                        src={PassiveIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Passives%</div>
                    </div> */}
                    {/* <div className="text-xl">+</div> */}
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src={DetractorIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px] ">Detractors%</div>
                    </div>
                    {/* <div className="text-2xl">)</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start sm:justify-between   gap-3 md:gap-5  ">
            <div className="flex justify-start items-center gap-3 md:gap-5">
              <div className="text-center flex flex-col justify-start items-center gap-2">
                <img src={PromoterIcon} alt="promoters" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nps?.promoters < 1 ? (
                    apiData?.nps?.promoters + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nps?.promoters}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Promoters</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={PassiveIcon} alt="passives" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nps?.passive < 1 ? (
                    apiData?.nps?.passive + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nps?.passive}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Passives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={DetractorIcon} alt="detractors" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  {apiData?.nps?.detractors < 1 ? (
                    apiData?.nps?.detractors + "%"
                  ) : (
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nps?.detractors}
                      separator=","
                      suffix="%"
                    />
                  )}
                </h1>
                <p className=" opacity-60 text-xs font-medium">Detractors</p>
              </div>
            </div>

            {/* Graph */}
            <div className="relative ">
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[12px] opacity-40">NPS</h1>
                  <p className="opacity-80 text-xs md:text-base">
                    <CountUp
                      start={0}
                      duration={1}
                      // end={MockApiNPSData.nps.nps_score}
                      end={apiData?.nps?.nps_score}
                      separator=","
                    />
                  </p>
                </div>
              </div>

              <div className=" w-[80px] md:w-[110px] ">
                <ResponsiveContainer height={110} width="100%">
                  <PieChart className="">
                    <Tooltip
                      cursor={false}
                      content={<CustomTooltip />}
                      position={{ y: -0, x: -150 }}
                    />
                    <Pie
                      // data={MockApiNPSData.nps_pie}
                      data={apiData?.nps_pie}
                      dataKey="percentage"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      strokeWidth={5}
                      innerRadius="60%"
                      outerRadius="100%"
                      cornerRadius={6}
                      paddingAngle={-1}
                      startAngle={-270}
                      endAngle={-630}
                      minAngle={15}
                    >
                      {apiData?.nps_pie?.map((entry, index) => (
                        <Cell key={Math.random()} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSCard;

function CustomTooltip({ active, payload, label }) {
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(npsApiData);
  }, [npsApiData]);

  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-between items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  {data?.name}
                </h1>

                <div
                  style={{ background: data.payload.color }}
                  className={`h-[8px] w-[8px] rounded-full `}
                ></div>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Percentage:</span>
                <span className="text-[11px] font-semibold">
                  {data?.value} %
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Total count:</span>
                <span className="text-[11px] font-semibold">
                  {data?.name === "Promoters"
                    ? apiData?.nps?.total_promoters
                    : ""}
                  {data?.name === "Passives" ? apiData?.nps?.total_passive : ""}
                  {data?.name === "Detractors"
                    ? apiData?.nps?.total_detractors
                    : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
