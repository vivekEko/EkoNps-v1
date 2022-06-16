import React, { useEffect, useState } from "react";
import RespondantsIcon from "../../../../assets/img/global-img/respondants.svg";
// import mockdata from "../../../../mock_API/NPS/NPS Main Dashboard/NSSCard.json";

import CountUp from "react-countup";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import PuffLoader from "react-spinners/PuffLoader";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import { useRecoilState } from "recoil";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import PositiveIcon from "../../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";

const NPSDetailCard = () => {
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();

  const [showInfoNss, setShowInfoNss] = useState(false);

  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [extreme, setExtreme] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPositive(apiData?.nss?.positive);
      setNegative(apiData?.nss?.negative);
      setExtreme(apiData?.nss?.extreme);
    }, 100);
  }, [apiData?.nss?.positive]);

  useEffect(() => {
    setApiData(nssApiData);
    // console.log("nss data from api:");
    // console.log(nssApiData);
  }, [nssApiData]);

  return (
    <div className="p-2 md:p-5 w-full border   rounded-lg bg-white flex justify-center md:justify-center items-start relative ">
      {!apiData && (
        <div className="min-h-[240px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full ">
          <div className=" font-bold  flex justify-between gap-2 items-center">
            <div className="font-bold opacity-80 text-[18px] mb-7">
              Sentiments
            </div>
            <div
              className="relative z-[200] "
              onMouseEnter={() => setShowInfoNss(!showInfoNss)}
              onMouseLeave={() => setShowInfoNss(!showInfoNss)}
            >
              <InfoRoundedIcon className="text-gray-300 opacity-80 hover:opacity-100" />

              {/* NPS explanation */}
              <div
                className={` ${
                  showInfoNss ? "block" : "hidden"
                } absolute top-[100%] right-0  bg-gray-50 opacity-100 text-[10px] text-gray-500 p-4 rounded-lg shadow-lg`}
              >
                <h1 className="mb-2">How is Sentiments calculated ?</h1>
                <div className="flex justify-center items-center  mx-auto  gap-2 h-full">
                  <div className="flex justify-between items-center w-full gap-2">
                    <div className="flex justify-center items-center flex-col ">
                      <img
                        src={PositiveIcon}
                        alt="Positive"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Positive%</div>
                    </div>
                    <div className="text-xl">-</div>
                    <div className="text-2xl">(</div>
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src={NegativeIcon}
                        alt="Negative"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Negative%</div>
                    </div>
                    <div className="text-xl">+</div>
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src={ExtremeIcon}
                        alt="Extreme"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px] ">Extreme%</div>
                    </div>
                    <div className="text-2xl">)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-col-reverse sm:flex-row">
            <div className="w-[90%] md:w-[60%]   ">
              <div className=" w-[100%] md:w-[80%] ml-auto">
                {/* Promoters */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Positive
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={apiData?.nss?.total_positive}
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={` ml-auto rounded-full bg-[#00AC69] transition-all ease-in duration-500`}
                        style={{
                          width: positive + "%",
                          minWidth: "5%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {apiData?.nss?.positive < 1 ? (
                            apiData?.nss?.positive + "%"
                          ) : (
                            <CountUp
                              start={0}
                              duration={1}
                              end={apiData?.nss?.positive}
                              separator=","
                              suffix="%"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passives */}
                <div className="my-4">
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Negative
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={apiData?.nss?.total_negative}
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={`  ml-auto rounded-full bg-[#EE6123] transition-all ease-in duration-500`}
                        style={{
                          width: negative + "%",
                          minWidth: "5%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {apiData?.nss?.negative < 1 ? (
                            apiData?.nss?.negative + "%"
                          ) : (
                            <CountUp
                              start={0}
                              duration={1}
                              end={apiData?.nss?.negative}
                              separator=","
                              suffix="%"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detractors */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Extreme
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      <CountUp
                        start={0}
                        duration={1}
                        end={apiData?.nss?.total_extreme}
                        separator=","
                      />
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={` ml-auto rounded-full bg-[#DB2B39] transition-all ease-in duration-500`}
                        style={{
                          width: extreme + "%",
                          minWidth: "5%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {apiData?.nss?.extreme < 1 ? (
                            apiData?.nss?.extreme + "%"
                          ) : (
                            <CountUp
                              start={0}
                              duration={1}
                              end={apiData?.nss?.extreme}
                              separator=","
                              suffix="%"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-[100%] sm:w-[40%]  ">
              {/* Pie graph */}
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[15px] opacity-40">Sentiments</h1>
                  <p className="opacity-80 text-[24px] font-semibold  ">
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nss?.nss_score}
                      separator=","
                      suffix="%"
                    />
                  </p>
                </div>
              </div>
              <div className=" w-[100%] md:min-w-[110px] ">
                <ResponsiveContainer height={180} width="100%">
                  <PieChart>
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      data={apiData?.nss_pie}
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
                      {apiData?.nss_pie?.map((entry, index) => (
                        <Cell key={Math.random()} fill={entry?.color} />
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

export default NPSDetailCard;

function CustomTooltip({ active, payload, label }) {
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    setApiData(nssApiData);
  }, [nssApiData]);

  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-between items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  {data?.name}s
                </h1>

                <div
                  style={{ background: data?.payload?.color }}
                  className={`h-[8px] w-[8px] rounded-full  `}
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
                  {data?.name === "Positive"
                    ? apiData?.nss?.total_positive
                    : ""}
                  {data?.name === "Negative"
                    ? apiData?.nss?.total_negative
                    : ""}
                  {data?.name === "Extreme" ? apiData?.nss?.total_extreme : ""}
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
