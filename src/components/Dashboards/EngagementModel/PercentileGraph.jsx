import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import mockData from "../../../mock_API/Engagement Model/percentileMemberLabel.json";

const PercentileGraph = () => {
  return (
    <div className="bg-white rounded-lg p-5 my-5">
      <h1 className="text-xl opacity-80 mb-8">Percentile Graph</h1>
      <div className="relative ">
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart
            data={mockData}
            margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} opacity={0.5} />
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
            <Tooltip cursor={false} />
            <Line
              type="monotone"
              name="member_score"
              dataKey="member_score"
              stroke="#0094E0 "
              dot={false}
              strokeWidth={4}
              fill="url(#npsGradient)"
            />
            <ReferenceArea x1={250} x2={300} stroke="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PercentileGraph;
