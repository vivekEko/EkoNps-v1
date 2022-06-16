import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";

const AgeGroupGraph = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  return (
    <div className="p-2 md:p-5  w-full  rounded-lg bg-white border flex justify-center md:justify-center items-center ">
      <div className="w-full">
        <h1 className=" font-bold opacity-80 ">Age Group</h1>

        <div className="relative ">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={apiData?.age_graph}
              margin={{ top: 0, right: 10, left: 10, bottom: 8 }}
            >
              <CartesianGrid
                vertical={false}
                horizontal={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="groupName"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickCount={10}
                angle={0}
                textAnchor="middle"
              >
                <Label
                  value="Age Category"
                  offset={-6}
                  position="insideBottom"
                  className="text-xs"
                />
              </XAxis>
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={10}
                tickCount={4}
                tickFormatter={(number) => `${number}`}
              >
                <Label
                  value="No. Of Members"
                  offset={0}
                  angle={90}
                  position="insideLeft"
                  className="text-xs"
                />
              </YAxis>
              <Tooltip cursor={false} content={<CustomTooltip2 />} />

              <Bar
                barSize={60}
                dataKey="groupValue"
                fill="#0094E0"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AgeGroupGraph;

function CustomTooltip2({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[15px] mb-2 font-bold ">
          {/* {payload[0]?.payload?.month}, {payload[0]?.payload?.year} */}
          Age Data
        </h1>
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Age Category:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.groupName}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Count:
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
