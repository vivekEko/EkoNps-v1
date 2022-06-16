import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  // CartesianGrid,
  // Cell,
  // LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilState } from "recoil";
import data from "../../../../mock_API/NPS/NPS Main Dashboard/NPSvsSentiment.json";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import npsVsSentimentApiData from "../../../../recoil/atoms/npsVsSentimentApiData";

const NPSvsSentiment = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [npsVsSentiAPIData, setNpsVsSentiAPIData] = useRecoilState(
    npsVsSentimentApiData
  );

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "npsVsSentiments?" +
  //     "start_year=" +
  //     finalStartDate +
  //     "&" +
  //     "start_month=" +
  //     finalStartMonth +
  //     "&" +
  //     "end_year=" +
  //     finalEndDate +
  //     "&" +
  //     "end_month=" +
  //     finalEndMonth;

  //   if (sendDataStatus === true) {
  //     // console.log("Requested URL: " + requestURL);
  //     axios.get(requestURL).then((res) => {
  //       // console.log(res);
  //       // console.log(res?.data);
  //       setApiData(res?.data.data);
  //     });
  //   } else if (sendDataStatus === false) {
  //     axios
  //       .get(
  //         baseAPI +
  //           "npsVsSentiments?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data.data);
  //         // console.log("This is else if data" + res?.data);
  //       });
  //   }
  // }, [sendDataStatus]);

  useEffect(() => {
    setApiData(npsVsSentiAPIData);
    // console.log("atom data nps vs senti component");
    // console.log(npsVsSentiAPIData);
  }, [npsVsSentiAPIData]);

  return (
    <div className="p-5 rounded-lg border bg-white transition-all w-[100%] ] h-[300px] ">
      {!apiData && (
        <div className="h-full w-[100%] bg-[#ffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <h1 className=" font-bold mb-5 opacity-80">Nps Vs Sentiment</h1>
          {/* <h1 className="invisible">2020</h1> */}

          <div className="text-xs text-center text-gray-500 font-medium mb-2 flex justify-between items-center">
            <div className="flex justify-between  items-center ">
              <div className="mx-2 text-[10px] flex justify-center items-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#00AC69] mx-1"></div>
                <p>Promoters</p>
              </div>
              <div className="mx-2 text-[10px] flex justify-center items-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#4D5552] mx-1"></div>
                <p>Passives</p>
              </div>
              <div className="mx-2 text-[10px] flex justify-center items-center">
                <div className="h-[10px] w-[10px] rounded-full bg-[#DB2B39] mx-1"></div>
                <p>Detractors</p>
              </div>
            </div>
          </div>

          {/* Graph */}

          <div className="relative mt-5">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={apiData?.data} layout="vertical">
                <XAxis
                  type="number"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  textAnchor="middle"
                  tickFormatter={(number) => `${number}%`}
                />
                <YAxis
                  type="category"
                  dataKey="sentiment_label"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickCount={4}
                  margin={{ right: 20 }}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar
                  dataKey="promoter"
                  fill="#00ac69"
                  stackId="b"
                  barSize={20}
                  radius={7}
                  style={{ stroke: "#fff", strokeWidth: 2, marginLeft: -15 }}
                />
                <Bar
                  dataKey="passive"
                  fill="#4d5552"
                  stackId="b"
                  barSize={20}
                  radius={7}
                  style={{ stroke: "#fff", strokeWidth: 2, marginLeft: -15 }}
                />
                <Bar
                  dataKey="detractor"
                  fill="#db2b39"
                  stackId="b"
                  barSize={20}
                  // radius={[0, 10, 10, 0]}
                  radius={7}
                  style={{ stroke: "#fff", strokeWidth: 2, marginLeft: -15 }}
                />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSvsSentiment;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[13px] mb-2 font-bold ">
          {payload[0]?.payload?.sentiment_label} Sentiment
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
                <span className="text-[11px] font-semibold">
                  {data?.value} %
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
