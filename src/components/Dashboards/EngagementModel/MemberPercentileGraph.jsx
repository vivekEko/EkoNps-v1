import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import mockData from "../../../mock_API/Engagement Model/percentileMemberLabel.json";

const MemberPercentileGraph = () => {
  return (
    <div className="p-2 md:p-5 w-full mt-5  rounded-lg bg-white flex justify-center md:justify-center items-center ">
      <div className="w-full">
        <h1 className=" font-bold opacity-80 ">Member Percentile</h1>
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
        <div className="relative ">
          {/* <div className=" absolute h-full w-full z-[999] bg-opacity-10 pl-[3%] pr-[1.5%] grid grid-cols-3">
            <div className="bg-red-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-yellow-500 opacity-10 h-full w-[100%]  mx-auto"></div>
            <div className="bg-green-500 opacity-10 h-full w-[100%]  mx-auto"></div>
          </div> */}

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={mockData.graph}
              margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="npsGradient" gradientTransform="rotate(0)">
                  <stop
                    offset={mockData.percentage.low}
                    stopColor="red"
                    stopOpacity={1}
                  />
                  <stop
                    offset={mockData.percentage.medium}
                    stopColor="yellow"
                    stopOpacity={1}
                  />
                  <stop
                    offset={mockData.percentage.high}
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

export default MemberPercentileGraph;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        {payload?.map((data) => (
          <div
            key={Math.random()}
            className="flex justify-between items-center"
          >
            {/* <div
                  className={`bg-[${data.stroke}] w-2 h-2 rounded-full mr-2`}
                ></div> */}
            <span className="uppercase mr-2 text-[10px]">{data.name}:</span>
            <span className="text-[10px]">{data.value} </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
