import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import RespondantsIcon from "../../../assets/img/global-img/respondants.svg";
import CountUp from "react-countup";

const GenderClassification = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  const [Males, setMales] = useState(0);
  const [Females, setFemales] = useState(0);
  const [Others, setOthers] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setMales(apiData?.gender?.male);

      setFemales(apiData?.gender?.female);
      setOthers(apiData?.gender?.other);
    }, 100);
  }, [apiData?.gender?.male]);

  const loaderAnimation = {
    width: Males + "%",
    minWidth: "5%",
  };

  return (
    <div className=" border rounded-md p-5 lg:h-[317px] w-full">
      <div className=" font-bold   flex justify-between gap-2 items-center">
        <div className="font-bold opacity-80 text-[18px] mb-7  w-full">
          Gender Classification
        </div>
        <div className="text-center text-[10px] opacity-80 flex w-full justify-end gap-5 ">
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-[#39a0ed] h-[10px] w-[10px] rounded-full"></div>
            <p>Male</p>
          </div>
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-[#13c4a3] h-[10px] w-[10px] rounded-full"></div>
            <p>Female</p>
          </div>
          <div className="flex justify-end items-center gap-[4px] ">
            <div className="bg-[#d77a69] h-[10px] w-[10px] rounded-full"></div>
            <p>Other</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-center flex-col-reverse sm:flex-row  ">
        <div className="w-[90%] md:w-[60%]   ">
          <div className=" w-[100%] md:w-[80%] ml-auto">
            <div>
              <div className="flex items-center px-3">
                <div className="w-[100%] text-[14px] opacity-80 font-medium">
                  Male
                </div>

                <div className="mx-2 opacity-80 font-bold">
                  <CountUp
                    start={0}
                    duration={1}
                    end={apiData?.gender?.total_male}
                    separator=","
                  />
                </div>
                <img src={RespondantsIcon} alt="number of males" />
              </div>
              <div>
                <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center ">
                  {apiData?.gender?.male && (
                    <div
                      className={` ml-auto rounded-full bg-[#39a0ed] transition-all ease-in duration-1000 `}
                      style={loaderAnimation}
                    >
                      <div className="font-semibold  text-white ml-2">
                        {apiData?.gender?.male < 1 ? (
                          apiData?.gender?.male + "%"
                        ) : (
                          <CountUp
                            start={0}
                            duration={1}
                            end={apiData?.gender?.male}
                            separator=","
                            suffix="%"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-center px-3">
                <div className="w-full text-[14px] opacity-80 font-medium">
                  Female
                </div>

                <div className="mx-2 opacity-80 font-bold">
                  <CountUp
                    start={0}
                    duration={1}
                    end={apiData?.gender?.total_female}
                    separator=","
                  />
                </div>
                <img src={RespondantsIcon} alt="number of promoters" />
              </div>
              <div>
                <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                  <div
                    className={` ml-auto rounded-full bg-[#13c4a3] transition-all ease-in duration-500`}
                    style={{
                      width: Females + "%",
                      minWidth: "5%",
                    }}
                  >
                    <div className="font-semibold  text-white ml-2">
                      {apiData?.gender?.females < 1 ? (
                        apiData?.gender?.females + "%"
                      ) : (
                        <CountUp
                          start={0}
                          duration={1}
                          end={apiData?.gender?.female}
                          separator=","
                          suffix="%"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center px-3">
                <div className="w-full text-[14px] opacity-80 font-medium">
                  Others
                </div>

                <div className="mx-2 opacity-80 font-bold">
                  <CountUp
                    start={0}
                    duration={1}
                    end={apiData?.gender?.total_other}
                    separator=","
                  />
                </div>
                <img src={RespondantsIcon} alt="number of promoters" />
              </div>
              <div>
                <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                  <div
                    className={`  ml-auto rounded-full bg-[#d77a61] transition-all ease-in duration-1000`}
                    style={{
                      width: Others + "%",
                      minWidth: "5%",
                    }}
                  >
                    <div className="font-semibold  text-white ml-2">
                      {apiData?.gender?.others < 1 ? (
                        apiData?.gender?.others + "%"
                      ) : (
                        <CountUp
                          start={0}
                          duration={1}
                          end={apiData?.gender?.others}
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

        <div className="relative w-[100%] sm:w-[40%]   ">
          <div className=" w-[100%] md:min-w-[110px]">
            <ResponsiveContainer height={180} width="100%">
              <PieChart key={apiData?.gender_pie}>
                <Tooltip cursor={false} content={<CustomTooltip3 />} />
                <Pie
                  data={apiData?.gender_pie}
                  dataKey="percentage"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  strokeWidth={5}
                  innerRadius="0%"
                  outerRadius="100%"
                  cornerRadius={6}
                  paddingAngle={-1}
                  startAngle={-270}
                  endAngle={-630}
                  minAngle={15}
                >
                  {apiData?.gender_pie?.map((entry, index) => (
                    <Cell key={Math.random()} fill={entry?.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderClassification;

function CustomTooltip3({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="justify-between items-center flex mb-2">
              <h1 className="capitalize mr-2 text-[15px]  font-bold ">
                Gender Stats
              </h1>

              <div
                style={{ background: data?.payload?.color }}
                className={`h-[8px] w-[8px] rounded-full  `}
              ></div>
            </div>
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Gender:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.label}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Percentage:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentage}%
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
