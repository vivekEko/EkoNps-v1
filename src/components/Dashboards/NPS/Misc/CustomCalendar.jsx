import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import chevron from "../../../../assets/img/global-img/right-chevron.svg";
import Cross from "../../../../assets/img/global-img/cross.svg";
import { monthnameList } from "../../../../utils/MonthNames";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";

const CustomCalendar = () => {
  const [yearList, setYearList] = useState();
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const today = new Date();
  const currentYear = today.getFullYear();
  const [highlightedYear, setHighlightedYear] = useState(2020);
  const [base_year, setBase_Year] = useState(2020);
  const [yearVisibility, setYearVisibility] = useState(true);
  //   const [monthVisibility, setMonthVisibility] = useState(false);
  const currentMonth = today.getMonth();
  const [highlightedMonth, setHighlightedMonth] = useState(currentMonth);
  const [startOrEnd, setStartOrEnd] = useState(true);
  const [activeSubmit, setActiveSubmit] = useState(false);

  const yearListArray = [];

  //   Global variables
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  useEffect(() => {
    let startYear = base_year - 7;
    let endYear = base_year + 7;

    for (let i = startYear; i <= endYear; i++) {
      yearListArray.push({ year: i });
      // console.log(yearList);
      setYearList(yearListArray);
    }
  }, [base_year]);

  return (
    <div className="bg-white p-5 rounded-lg w-[280px] shadow-2xl mt-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => setDatePickerStatus(!datePickerStatus)}
        />
      </div>

      <div className="flex justify-between mb-5 ">
        <div
          onClick={() => {
            setStartOrEnd(true);
            setYearVisibility(true);
          }}
          className={`${
            startOrEnd ? "border-[#00AC69]" : "border-transparent"
          } border-b-2   p-2 cursor-pointer transition-all`}
        >
          {/* Start date */}
          <h3 className="text-[12px] opacity-60  mb-1 ">Start from</h3>
          <p className="space-x-1 text-[10px] opacity-60">
            {finalStartMonth < 10 ? (
              <span>0{finalStartMonth}</span>
            ) : (
              <span>{finalStartMonth}</span>
            )}

            <span>/</span>
            <span>{finalStartDate}</span>
          </p>
        </div>

        <div
          onClick={() => {
            setStartOrEnd(false);
            setYearVisibility(true);
          }}
          className={` ${
            !startOrEnd ? "border-[#00AC69]" : "border-transparent"
          }  p-2 cursor-pointer border-b-2 transition-all`}
        >
          {/* End date */}
          <h3 className="text-[12px] opacity-60 mb-1">End with</h3>
          <p className="space-x-1 text-[10px] opacity-60">
            {finalEndMonth < 10 ? (
              <span>0{finalEndMonth}</span>
            ) : (
              <span>{finalEndMonth}</span>
            )}
            <span>/</span>
            <span>{finalEndDate}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div
          onClick={() => setBase_Year(base_year - 15)}
          className="cursor-pointer"
        >
          <img
            src={chevron}
            alt=""
            className="rotate-180 opacity-60 transition-all active:scale-90"
          />
        </div>
        <div
          className={`opacity-60  ${yearVisibility ? "" : "cursor-pointer"}`}
          onClick={() => {
            if (yearVisibility == false) {
              setYearVisibility(!yearVisibility);
            }
          }}
        >
          {yearVisibility ? "Select a Year" : highlightedYear}
        </div>
        <div
          onClick={() => setBase_Year(base_year + 15)}
          className="cursor-pointer"
        >
          <img
            src={chevron}
            alt=""
            className="opacity-60 transition-all active:scale-90"
          />
        </div>
      </div>

      {yearVisibility ? (
        <div className="grid grid-cols-5 gap-5 mb-8 ">
          {yearList?.map((yearData) => (
            <div
              key={Math.random()}
              className={`transition-all ${
                yearData.year === highlightedYear
                  ? "text-[#00AC69] opacity-100"
                  : ""
              } ${
                yearData.year < 2014 ? "cursor-not-allowed  text-gray-500" : ""
              } 
              ${yearData.year > 2020 ? "cursor-not-allowed text-gray-500" : ""}
                opacity-70 cursor-pointer`}
              onClick={() => {
                if (yearData.year >= 2014 && yearData.year <= currentYear) {
                  setHighlightedYear(yearData.year);
                  setYearVisibility(!yearVisibility);
                  if (startOrEnd == true) {
                    setFinalStartDate(yearData.year);
                    setActiveSubmit(false);
                  } else if (startOrEnd == false) {
                    setFinalEndDate(yearData.year);
                  }
                }
              }}
            >
              {yearData.year}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5 mb-8">
          {monthnameList?.map((monthName) => (
            <div
              key={monthName.key}
              className={` transition-all ${
                monthName.id === highlightedMonth
                  ? "text-[#00AC69] opacity-100"
                  : ""
              } opacity-70 cursor-pointer`}
              onClick={() => {
                setHighlightedMonth(monthName.id);
                if (startOrEnd == true) {
                  setFinalStartMonth(monthName.id);
                  setStartOrEnd(false);
                  setYearVisibility(!yearVisibility);
                } else if (startOrEnd == false) {
                  setFinalEndMonth(monthName.id);
                  setActiveSubmit(true);
                }
              }}
            >
              {monthName.month}
            </div>
          ))}
        </div>
      )}

      <div
        className={` ${
          activeSubmit
            ? "opacity-100 cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }  text-center bg-[#00AC69] text-white py-2 rounded-full`}
        onClick={() => {
          console.log("Final Start Year " + finalStartDate);
          console.log("Final End Year " + finalEndDate);
          console.log("Final Start Month " + finalStartMonth);
          console.log("Final End Month " + finalEndMonth);
          setDatePickerStatus(!datePickerStatus);
        }}
      >
        Submit
      </div>
    </div>
  );
};

export default CustomCalendar;
