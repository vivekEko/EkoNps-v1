import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import mockData from "../../../../mock_API/NPS/NPS Main Dashboard/NSSOverTime.json";
import chevron from "../../../../assets/img/global-img/DownChevron.svg";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";
import { useDetectClickOutside } from "react-detect-click-outside";
import RefreshIcon from "@mui/icons-material/Refresh";

const NPSAllGraph = () => {
  const [filterStatus, setFilterStatus] = useState(false);
  const [graphName, setGraphName] = useState("Sentiment Score");

  const [spinAnimation, setSpinAnimation] = useState(false);

  const [positives, setPositive] = useState(false);
  const [negative, setNegative] = useState(false);
  const [extreme, setExtreme] = useState(false);
  const [nssScore, setNssScore] = useState(true);

  const npsGraphNames = [
    {
      id: 1,
      name: "Sentiment Score",
    },
    {
      id: 2,
      name: "Positive",
    },
    {
      id: 3,
      name: "Negative",
    },
    {
      id: 4,
      name: "Extreme",
    },
  ];

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );

  useEffect(() => {
    setApiData(nssOverTimeAPIData);
    // console.log("atom data nss all graph component");
    // console.log(nssOverTimeAPIData);
  }, [nssOverTimeAPIData]);

  const closeToggle = () => {
    setFilterStatus(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  function handleReset() {
    setFilterStatus(false);
    setPositive(false);
    setNegative(false);
    setExtreme(false);
    setNssScore(true);
    setSpinAnimation(true);
    setTimeout(() => setSpinAnimation(false), 1000);
  }

  return (
    <div className="p-2 md:p-5 w-full border  rounded-lg bg-white  relative min-h-[300px]">
      {!apiData && (
        <div className="min-h-[130px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full ">
          <div className="flex justify-between items-center mb-7">
            <h1 className=" font-bold opacity-80 text-[18px] ">
              Sentiment Plot
            </h1>

            <div
              className="relative flex flex-row-reverse gap-5 items-center"
              ref={ref}
            >
              <div>
                <RefreshIcon
                  fontSize="large"
                  className={` ${
                    spinAnimation ? "animate-spin" : ""
                  } opacity-80 p-2 cursor-pointer active:scale-95   transition duration-75  hover:bg-gray-100 rounded-full`}
                  onClick={handleReset}
                />{" "}
              </div>
              {/* Dropdown */}
              <div
                className="bg-gray-100 bg-opacity-[100%] p-2 w-[120px] rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => setFilterStatus(!filterStatus)}
              >
                <div className="text-[12px] opacity-70">Select Graph</div>
                <img
                  src={chevron}
                  alt="open options arrow"
                  className={` ${
                    filterStatus ? "rotate-180" : "rotate-0"
                  } transition-all`}
                />
              </div>
              <div
                className={`bg-gray-100  z-[50] ${
                  filterStatus ? "h-auto block" : "h-0 hidden"
                }   w-[120px] rounded-lg absolute top-[120%] left-0`}
              >
                {npsGraphNames.map((data) => (
                  <div
                    key={data?.id}
                    className={`flex flex-row-reverse justify-end items-center gap-5  p-2 border-b-2 border-b-transparent hover:bg-gray-100 text-[12px] opacity-70 cursor-pointer `}
                    onClick={() => {
                      if (positives || negative || extreme || nssScore) {
                        if (data.id === 1) {
                          if (
                            (positives || negative || extreme) &&
                            nssScore === true
                          ) {
                            setNssScore(false);
                          } else {
                            setNssScore(true);
                          }
                        } else if (data.id === 2) {
                          if (
                            (negative || extreme || nssScore) &&
                            positives === true
                          ) {
                            setPositive(false);
                          } else {
                            setPositive(true);
                          }
                        } else if (data.id === 3) {
                          if (
                            (positives || extreme || nssScore) &&
                            negative === true
                          ) {
                            setNegative(false);
                          } else {
                            setNegative(true);
                          }
                        } else if (data.id === 4) {
                          if (
                            (positives || negative || nssScore) &&
                            extreme === true
                          ) {
                            setExtreme(false);
                          } else {
                            setExtreme(true);
                          }
                        }
                      }

                      setGraphName(data?.name);
                    }}
                  >
                    <div>{data?.name}</div>
                    <div
                      className={`w-[11px] h-[11px] border border-black rounded-sm
                      ${
                        nssScore && data?.id === 1 ? "bg-[#009DFF]" : "bg-white"
                      }
                        ${
                          positives && data?.id === 2
                            ? "bg-[#00AC69]"
                            : "bg-white"
                        }
                      ${
                        negative && data?.id === 3 ? "bg-[#EE6123]" : "bg-white"
                      }
                      ${extreme && data?.id === 4 ? "bg-[#DB2B39]" : "bg-white"}
                   
                      rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-end mb-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#00AC69] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Positive</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#EE6123] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Negative</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#DB2B39] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Extreme</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#009DFF] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Sentiment Score</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                key={graphName}
                data={apiData?.nss_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="nssGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="positiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00AC69" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00AC69" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="negativeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#EE6123" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EE6123" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="extremeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#DB2B39" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#DB2B39" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickCount={4}
                  tickFormatter={(number) => `${number}`}
                  margin={{ right: 20 }}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                {nssScore && (
                  <Area
                    type="monotone"
                    name="sentiments"
                    dataKey="nss"
                    stroke="#0094E0 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#nssGradient)"
                  />
                )}

                {positives && (
                  <Area
                    type="monotone"
                    name="positive"
                    dataKey="positive"
                    stroke="#00AC69 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#positiveGradient)"
                  />
                )}

                {negative && (
                  <Area
                    type="monotone"
                    name="negative"
                    dataKey="negative"
                    stroke="#EE6123 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#negativeGradient)"
                  />
                )}

                {extreme && (
                  <Area
                    type="monotone"
                    name="extreme"
                    dataKey="extreme"
                    stroke="#DB2B39 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#extremeGradient)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSAllGraph;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.month}, {payload[0]?.payload?.year}
        </h1>
        {payload?.map((data) => (
          <div key={Math?.random()} className="">
            <div className="flex justify-start items-center ">
              <div
                style={{ background: data?.color }}
                className={`h-[5px] w-[5px] rounded-full mr-2 `}
              ></div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  {data?.name}:
                </span>
                <span className="text-[11px] font-semibold">{data?.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
