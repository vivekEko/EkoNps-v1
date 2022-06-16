import axios from "axios";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import ReactWordcloud from "react-wordcloud";
import { useRecoilState } from "recoil";
import words from "../../../../mock_API/NPS/NPS Main Dashboard/Wordfrequency.json";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";

const WordFrequency = () => {
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  console.log(apiData);
  useEffect(() => {
    const requestURL =
      baseAPI +
      "wordFrequency?" +
      "start_year=" +
      finalStartDate +
      "&" +
      "start_month=" +
      finalStartMonth +
      "&" +
      "end_year=" +
      finalEndDate +
      "&" +
      "end_month=" +
      finalEndMonth;

    if (sendDataStatus === true) {
      // console.log("Requested URL: " + requestURL);
      axios.get(requestURL).then((res) => {
        // console.log(res);
        // console.log(res?.data);
        setApiData(res?.data);
      });
    } else if (sendDataStatus === false) {
      axios
        .get(
          baseAPI +
            "wordFrequency?start_month=1&start_year=2021&end_month=12&end_year=2021"
        )
        .then((res) => {
          setApiData(res?.data);
          // console.log("This is else if data" + res?.data);
        });
    }
  }, [sendDataStatus]);

  const options = {
    colors: [
      "#246a73",
      "#021d49",
      "#04409f",
      "#24282a",
      "#404276",
      "#00915a",
      "#00ac69",
      "#363872",
      "#05679e",
    ],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [12, 100],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <>
      {!apiData && (
        <div className="min-h-[170px] w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="p-5 rounded-lg bg-white transition-all  w-[100%] h-[300px] col-span-2 ">
          {/* <h1 className="  font-bold  opacity-80">Word Cloud</h1> */}
          <div className="h-[100%] w-[100%] bg-white">
            <ReactWordcloud options={options} words={apiData} />
          </div>
        </div>
      )}
    </>
  );
};

export default WordFrequency;
