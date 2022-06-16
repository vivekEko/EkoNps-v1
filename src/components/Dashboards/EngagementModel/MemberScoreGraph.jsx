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
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";

const MemberScoreGraph = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  const [graphData, setGraphData] = useState();
  const [percentageData, setPercentageData] = useState();

  useEffect(() => {
    setGraphData(apiData?.graph);
    setPercentageData(apiData?.percentage);

    console.log(apiData);
  }, [apiData]);

  return (
    <div className="p-2 md:p-5   rounded-lg bg-white border flex justify-center md:justify-center items-center ">
      <div className="w-full">
        <h1 className=" font-bold opacity-80 ">Member Score</h1>
        <div className="text-center text-[10px] opacity-80 flex w-full justify-end gap-5 mt-[30px] mb-[10px]">
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-red-500 h-[10px] w-[10px] rounded-full"></div>
            <p>Low</p>
          </div>
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-yellow-500 h-[10px] w-[10px] rounded-full"></div>
            <p>Medium</p>
          </div>
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-green-500 h-[10px] w-[10px] rounded-full"></div>
            <p>High</p>
          </div>
        </div>

        {/* Graph */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={graphData}
              margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="npsGradient" gradientTransform="rotate(0)">
                  <stop
                    offset={percentageData?.low}
                    stopColor="red"
                    stopOpacity={1}
                  />
                  <stop
                    offset={percentageData?.medium}
                    stopColor="yellow"
                    stopOpacity={1}
                  />
                  <stop
                    offset={percentageData?.high}
                    stopColor="green"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                horizontal={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="percentile_name"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickCount={6}
                angle={0}
                textAnchor="middle"
                xAxisId="1"
              />
              <XAxis
                dataKey="percentile_value"
                xAxisId="0"
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
                //   tickFormatter={(number) => `${number}%`}
                margin={{ right: 20 }}
              />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Area
                type="monotone"
                name="member_score"
                dataKey="member_score"
                stroke="transparent "
                dot={false}
                fill="url(#npsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MemberScoreGraph;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-start items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  Member Data
                </h1>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Name:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_name}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Value:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_value}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Member Score:</span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.member_score}
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
