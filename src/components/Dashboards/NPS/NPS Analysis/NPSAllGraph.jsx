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
// import mockData from "../../../../mock_API/NPS/NPS Main Dashboard/NPSOverTime.json";
import chevron from "../../../../assets/img/global-img/DownChevron.svg";
import { useRecoilState } from "recoil";
import { PuffLoader } from "react-spinners";
import npsOverTimeApiData from "../../../../recoil/atoms/npsOverTimeApiData";
import { useDetectClickOutside } from "react-detect-click-outside";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const NPSAllGraph = () => {
  const [filterStatus, setFilterStatus] = useState(false);
  const [graphName, setGraphName] = useState("NPS Score");
  const [spinAnimation, setSpinAnimation] = useState(false);

  // const [sentimentArray, setSentimentArray] = useState(["All"]);

  const [promoters, setPromoters] = useState(false);
  const [passives, setPassives] = useState(false);
  const [detractors, setDetractors] = useState(false);
  const [npsScore, setNpsScore] = useState(true);

  const npsGraphNames = [
    {
      id: 1,
      name: "NPS Score",
    },
    {
      id: 2,
      name: "Promoters",
    },
    {
      id: 3,
      name: "Passives",
    },
    {
      id: 4,
      name: "Detractors",
    },
  ];

  const [apiData, setApiData] = useState();

  const [npsOverTimeAPIData, setNpsOverTimeAPIData] =
    useRecoilState(npsOverTimeApiData);

  useEffect(() => {
    setApiData(npsOverTimeAPIData);
    // console.log("atom data nps all component");
    // console.log(npsOverTimeAPIData);
  }, [npsOverTimeAPIData]);

  const closeToggle = () => {
    setFilterStatus(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  function handleReset() {
    setFilterStatus(false);
    setPromoters(false);
    setPassives(false);
    setDetractors(false);
    setNpsScore(true);
    setSpinAnimation(true);
    setTimeout(() => setSpinAnimation(false), 1000);
  }

  return (
    <div className="p-2 md:p-5 w-full border  rounded-lg bg-white  relative ">
      {!apiData && (
        <div className="h-[400px] w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full ">
          <div className="flex justify-between items-center mb-7">
            <h1 className=" font-bold opacity-80 text-[18px] ">NPS Plot</h1>
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
                className="bg-gray-100  bg-opacity-[100%] p-2 w-[120px] rounded-lg flex justify-between items-center cursor-pointer"
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
                }   w-[120px] rounded-lg absolute top-[120%] left-[0%]`}
              >
                {npsGraphNames?.map((data) => (
                  <div
                    key={data?.id}
                    className={` flex justify-end flex-row-reverse items-center gap-5 p-2 border-b-2 border-b-transparent hover:bg-gray-100 text-[12px] opacity-70 cursor-pointer `}
                    onClick={() => {
                      // new logic
                      if (promoters || passives || detractors || npsScore) {
                        if (data.id === 1) {
                          if (
                            (promoters || passives || detractors) &&
                            npsScore === true
                          ) {
                            setNpsScore(false);
                          } else {
                            setNpsScore(true);
                          }
                        } else if (data.id === 2) {
                          if (
                            (passives || detractors || npsScore) &&
                            promoters === true
                          ) {
                            setPromoters(false);
                          } else {
                            setPromoters(true);
                          }
                        } else if (data.id === 3) {
                          if (
                            (promoters || detractors || npsScore) &&
                            passives === true
                          ) {
                            setPassives(false);
                          } else {
                            setPassives(true);
                          }
                        } else if (data.id === 4) {
                          if (
                            (promoters || passives || npsScore) &&
                            detractors === true
                          ) {
                            setDetractors(false);
                          } else {
                            setDetractors(true);
                          }
                        }
                      }

                      setGraphName(data?.name);
                      // console.log("data?.name: ");
                    }}
                  >
                    <div>{data?.name}</div>
                    <div
                      className={`w-[11px] h-[11px] border border-black rounded-sm
                      ${
                        npsScore && data?.id === 1 ? "bg-[#0094E0]" : "bg-white"
                      }
                       ${
                         promoters && data?.id === 2
                           ? "bg-[#00AC69]"
                           : "bg-white"
                       }
                      ${
                        passives && data?.id === 3 ? "bg-[#939799]" : "bg-white"
                      }
                      ${
                        detractors && data?.id === 4
                          ? "bg-[#DB2B39]"
                          : "bg-white"
                      }
                     
                      `}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-end mb-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#00AC69] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Promoters</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#939799] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Passives</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#DB2B39] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Detractors</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#0094E0] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">NPS Score</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                key={graphName}
                data={apiData?.nps_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="promoterGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00AC69" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00AC69" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="passiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#939799" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#939799" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="detractorGradient"
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
                {npsScore && (
                  <Area
                    type="monotone"
                    name="NPS"
                    dataKey="NPS"
                    stroke="#0094E0 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#npsGradient)"
                  />
                )}

                {promoters && (
                  <Area
                    type="monotone"
                    name="promoter"
                    dataKey="promoter"
                    stroke="#00AC69 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#promoterGradient)"
                  />
                )}

                {passives && (
                  <Area
                    type="monotone"
                    name="passive"
                    dataKey="passive"
                    stroke="#939799 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#passiveGradient)"
                  />
                )}

                {detractors && (
                  <Area
                    type="monotone"
                    name="detractor"
                    dataKey="detractor"
                    stroke="#DB2B39 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#detractorGradient)"
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
          <div key={Math.random()} className="">
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
