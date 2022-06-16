import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import MockApiData from "../../../../mock_API/NPS/NPS Main Dashboard/TotalCards.json";
import PuffLoader from "react-spinners/PuffLoader";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import totalCardsApiData from "../../../../recoil/atoms/totalCardsApiData";

const TotalCard = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [totalCardsAPIDatas, setTotalCardsAPIDatas] =
    useRecoilState(totalCardsApiData);

  useEffect(() => {
    setApiData(totalCardsAPIDatas);
    // console.log("Total cards");
    // console.log(apiData);
    // console.log("atom data total cards component");
    // console.log(totalCardsAPIDatas);
  }, [totalCardsAPIDatas]);

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "totalCards?" +
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
  //       setApiData(res?.data);
  //     });
  //   } else if (sendDataStatus === false) {
  //     axios
  //       .get(
  //         baseAPI +
  //           "totalCards?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data);
  //         // console.log("This is else if data" + res?.data);
  //       });
  //   }
  // }, [sendDataStatus]);

  return (
    <div className=" w-full xl:w-[33%] xl:ml-3 2xl:ml-0   transition-all  flex  justify-center items-center max-w-[320px] sm:max-w-none  ">
      {!apiData?.card_data && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[0] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.card_data && (
        <div className="grid  grid-cols-3 xs:grid-cols-2 sm:grid-cols-6   xl:grid-cols-3  justify-between  w-full h-full place-items-center items-center gap-5 ">
          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md border    w-full h-full text-center flex justify-center items-center">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Surveyed
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80 ">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.survey}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md w-full h-full text-center flex justify-center items-center border   ">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Comments
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.comments}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md w-full h-full text-center flex justify-center items-center border   ">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Alerts
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.alerts}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md w-full h-full text-center flex justify-center items-center border   ">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[12px]">
                Health Centers
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.clinic}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md w-full h-full text-center flex justify-center items-center border   ">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Providers
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.doctors}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-5 md:p-2 bg-white text-gray-600 rounded-md w-full h-full text-center flex justify-center items-center border   ">
            <div>
              <p className=" text-[#000C08] opacity-40 text-[10px] md:text-[14px]">
                Clients
              </p>
              <p className="text-sm sm:text-base md:text-xl font-semibold mt-2 text-[#000C08] opacity-80">
                <CountUp
                  start={0}
                  duration={1}
                  end={apiData?.card_data?.clients}
                  separator=","
                />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalCard;
