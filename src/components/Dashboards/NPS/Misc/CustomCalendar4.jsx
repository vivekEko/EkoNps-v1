import React, { useEffect, useState } from "react";
import Cross from "../../../../assets/img/global-img/cross.svg";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { monthnameList } from "../../../../utils/MonthNames";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import callClinics from "../../../../recoil/atoms/callClinics";
import flushRegion from "../../../../recoil/atoms/flushRegion";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import { useDetectClickOutside } from "react-detect-click-outside";

const YearSlider = styled(Slider)({
  color: "#0189B9",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const CustomCalendar4 = () => {
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);
  const [flushRegionValue, setFlushRegionvalue] = useRecoilState(flushRegion);
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);

  const [startMonthVal, setStartMonthVal] = useState("Jan");
  const [startMonthNumVal, setStartMonthNumVal] = useState("1");
  const [endMonthVal, setEndMonthVal] = useState("Apr");
  const [endMonthNumVal, setEndMonthNumVal] = useState(4);

  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [val, setVal] = useState([finalStartDate, finalEndDate]);

  const marks = [
    {
      value: 2018,
    },
    {
      value: 2019,
    },
    {
      value: 2020,
    },
    {
      value: 2021,
    },
    {
      value: 2022,
    },
  ];

  useEffect(() => {
    setFinalStartDate(val[0]);
    setFinalEndDate(val[1]);
  }, [val]);

  // useEffect(() => {
  //   setFinalStartMonth(1);
  //   setFinalEndMonth(4);
  // }, []);

  const updateVal = (e, item) => {
    setVal(item);
  };

  return (
    <div className="bg-white p-5 rounded-lg  shadow-2xl mt-4 w-[100%] sm:min-w-[340px]  ">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => {
            setDatePickerStatus(!datePickerStatus);
          }}
        />
      </div>

      {/* main container */}
      <div>
        {/* date slider  */}
        <div>
          {/* displayed date */}
          <div className="relative ">
            <div className="flex justify-center items-center gap-2 text-sm p-3 rounded-lg bg-blue-50 ">
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{startMonthVal}</span> <span>{val[0]}</span>
              </h1>
              <h1 className="text-lg opacity-80 font-semibold">-</h1>
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{endMonthVal}</span> <span>{val[1]}</span>
              </h1>
            </div>
            <div className=" bg-blue-50 w-[20px] h-[20px] rotate-45 mx-auto mt-[-10px] "></div>
          </div>

          {/* slider */}

          <div className="w-[90%] mx-auto">
            <YearSlider
              value={val}
              min={2018}
              max={2022}
              onChange={updateVal}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </div>

          {/* Month  list */}
          <div className="flex justify-between items-center gap-2 ">
            <div className="flex-1">
              <div className="text-center w-full opacity-80 font-semibold">
                Start Month
              </div>

              <div className="grid grid-cols-3   place-items-center ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-blue-100 cursor-pointer 
                  ${
                    startMonthVal === monthName?.month
                      ? "bg-blue-100 opacity-100"
                      : "opacity-80"
                  }

                
                  `}
                    onClick={() => {
                      setStartMonthVal(monthName?.month);
                      setStartMonthNumVal(monthName?.id);
                      setFinalStartMonth(monthName?.id);
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>

            <ArrowForwardIosRoundedIcon
              fontSize="small"
              className="opacity-70 mt-8"
            />

            <div className="flex-1 ">
              <div className="text-center opacity-80 font-semibold">
                End Month
              </div>
              <div className="grid grid-cols-3   place-items-center flex-1 ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-blue-100 cursor-pointer 
                  ${
                    endMonthVal === monthName?.month
                      ? "bg-blue-100 opacity-100"
                      : "opacity-80"
                  }
                  ${
                    finalStartDate === finalEndDate &&
                    monthName.id <= finalStartMonth
                      ? "cursor-not-allowed text-gray-500 "
                      : ""
                  }
                
                  `}
                    onClick={() => {
                      if (finalStartDate === finalEndDate) {
                        if (monthName.id > finalStartMonth) {
                          setEndMonthVal(monthName?.month);
                          setEndMonthNumVal(monthName?.id);
                          setFinalEndMonth(monthName?.id);
                        }
                      } else {
                        setEndMonthVal(monthName?.month);
                        setEndMonthNumVal(monthName?.id);
                        setFinalEndMonth(monthName?.id);
                      }
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div
        className="bg-[#0189B9] mt-5 text-white p-2 rounded-lg text-center cursor-pointer active:scale-95 transition-all"
        onClick={() => {
          setDatePickerStatus(!datePickerStatus);
          setCallClinicValue(true);
          setCallRegion(true);
          setAllDataRecievedStatus(false);
          setSendDataStatus(true);
          setGoStatus(!goStatus);
        }}
      >
        Submit
      </div>
    </div>
  );
};

export default CustomCalendar4;
