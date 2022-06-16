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
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import largeDateAtom from "../../../../recoil/atoms/largeDateAtom";
import Region from "./Region";
import ClinicFilter from "./ClinicFilter";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import callClinics from "../../../../recoil/atoms/callClinics";
import flushRegion from "../../../../recoil/atoms/flushRegion";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";

const CustomCalendar3 = () => {
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [yearList, setYearList] = useState();
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const today = new Date();
  const currentYear = today.getFullYear();

  const [base_year, setBase_Year] = useState(2020);
  const [yearVisibility, setYearVisibility] = useState(true);
  const [yearVisibility2, setYearVisibility2] = useState(true);
  //   const [monthVisibility, setMonthVisibility] = useState(false);
  const currentMonth = today.getMonth();

  const [startOrEnd, setStartOrEnd] = useState(true);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);

  const yearListArray = [];

  //   Global variables
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [largeDate, setLargeDate] = useRecoilState(largeDateAtom);

  const [calendarYearText, setCalendarYearText] = useState();

  const [activeDateType, setActiveDateType] = useState(true);

  const [highlightedYear, setHighlightedYear] = useState(2014);
  const [highlightedYear2, setHighlightedYear2] = useState(2022);
  const [highlightedMonth, setHighlightedMonth] = useState(1);
  const [highlightedMonth2, setHighlightedMonth2] = useState(12);

  // useEffect(() => {
  //   if (startOrEnd === true) {
  //     setCalendarYearText("Start Date");
  //   } else if (startOrEnd === false) {
  //     setCalendarYearText("End Date");
  //   }
  // }, [startOrEnd]);

  useEffect(() => {
    let startYear = 2014;
    let endYear = 2022;

    for (let i = startYear; i <= endYear; i++) {
      yearListArray.push({ year: i });
      // console.log(yearList);
      setYearList(yearListArray);
    }
  }, [base_year]);

  const [arrCalendarStatus, setArrCalendarStatus] = useState([]);

  const [largeDateCopy, setLargeDateCopy] = useState();
  const [toggleDate, setToggleDate] = useState(null);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);

  const [flushRegionValue, setFlushRegionvalue] = useRecoilState(flushRegion);
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);

  useEffect(() => {
    setLargeDateCopy(largeDate);
    setArrCalendarStatus(...arrCalendarStatus, "heloo");

    // setHighlightedYear(finalStartDate);
    // setHighlightedYear2(finalEndDate);
    // setHighlightedMonth(finalStartMonth);
    // setHighlightedMonth2(finalEndMonth);
  }, []);

  // useEffect(() => {
  //   if (datePickerStatus === false) {
  //     if (arrCalendarStatus.length === 0) {
  //       // arrCalendarStatus.push("heloo");""
  //     } else {
  //       if (largeDate !== largeDateCopy) {
  //         setLargeDateCopy(largeDate);
  //       }
  //     }
  //   }
  // }, [datePickerStatus]);

  function handleToggle() {
    if (datePickerStatus === false) {
      if (arrCalendarStatus.length === 0) {
        // arrCalendarStatus.push("heloo");""
      } else {
        if (largeDate !== largeDateCopy) {
          setLargeDateCopy(largeDate);
        }
      }
    }
  }

  useEffect(() => {
    handleToggle();
  }, [datePickerStatus]);

  // useEffect(() => {
  //   // console.log("largeDate:" + largeDate);
  //   // console.log("largeDateCopy:" + largeDateCopy);
  //   // console.log("arrCalendarStatus:");
  //   // console.log(arrCalendarStatus);
  // }, [largeDateCopy]);

  // useEffect(() => {
  //   console.log("send data status : 0000000000000000000000000000000");
  //   console.log(sendDataStatus);
  // }, [sendDataStatus]);

  return (
    <div className="bg-white p-5 rounded-lg  shadow-2xl mt-4 ">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => {
            setDatePickerStatus(!datePickerStatus);

            // setStartOrEnd(true);
          }}
        />
      </div>
      <div className="flex justify-start items-center gap-5 h-full">
        {/* Start Date */}
        <div className="">
          <div className="flex justify-between mb-5  px-3">
            <div
              className={`   overflow-hidden    transition-all ${
                activeDateType ? "font-extrabold" : ""
              } `}
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

              <div
                className={`${
                  startOrEnd ? " translate-x-[0%]" : " translate-x-[100%]"
                }   w-full bg-[#00ac69] h-[5px] rounded-full mt-2  transition-all`}
              ></div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center  px-3">
            <div
              className={`opacity-60 mb-5 ${
                yearVisibility ? "" : "cursor-pointer"
              }`}
              onClick={() => {
                if (yearVisibility == false) {
                  setYearVisibility(!yearVisibility);
                }
              }}
            >
              {yearVisibility ? "Start Date" : highlightedYear}
            </div>

            {yearVisibility ? (
              <div className="grid grid-cols-3 gap-5 gap-x-10   place-items-center ">
                {yearList?.map((yearData) => (
                  <div
                    key={Math.random()}
                    className={`transition-all ${
                      yearData.year === highlightedYear
                        ? "text-[#00AC69] opacity-100"
                        : ""
                    } ${
                      yearData.year < 2014
                        ? "cursor-not-allowed  text-gray-500"
                        : ""
                    } 
              ${yearData.year > 2022 ? "cursor-not-allowed text-gray-500" : ""}
             

                opacity-70 cursor-pointer`}
                    onClick={() => {
                      if (
                        yearData.year >= 2014 &&
                        yearData.year <= currentYear
                      ) {
                        setFinalStartDate(yearData.year);
                        // setActiveSubmit(false);
                        setStartOrEnd(true);
                        setSendDataStatus(false);
                        setCallRegion(false);
                        setRegionListValue(null);
                        setYearVisibility(!yearVisibility);
                        setHighlightedYear(yearData.year);
                      }
                    }}
                  >
                    {yearData.year}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5 ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName.id}
                    className={` transition-all ${
                      monthName.id === highlightedMonth
                        ? "text-[#00AC69] opacity-100"
                        : ""
                    } opacity-70 cursor-pointer`}
                    onClick={() => {
                      setHighlightedMonth(monthName.id);
                      setYearVisibility(!yearVisibility);

                      setFinalStartMonth(monthName.id);

                      // setYearVisibility(!yearVisibility);
                    }}
                  >
                    {monthName.month}
                  </div>
                ))}
              </div>
            )}

            {/* <div
              className={` ${
                activeSubmit
                  ? "opacity-100 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }  text-center bg-[#00AC69] text-white py-2 rounded-full`}
              onClick={() => {
                // console.log("Final Start Year " + finalStartDate);
                // console.log("Final End Year " + finalEndDate);
                // console.log("Final Start Month " + finalStartMonth);
                // console.log("Final End Month " + finalEndMonth);
                setDatePickerStatus(!datePickerStatus);
                setCallRegion(true);
              }}
            >
              Submit
            </div> */}
          </div>
        </div>

        <div className=" self-end h-[120px] w-[2px] bg-[#00ac69] ">
          <span className="invisible">.</span>
        </div>

        {/* End Date */}
        <div className="  ">
          <div className="flex justify-end px-3 ">
            <div
              className={`overflow-hidden      transition-all ${
                startOrEnd ? "" : "font-extrabold"
              }`}
            >
              {/* End date */}
              <h3 className="text-[12px] opacity-60 mb-1">End with</h3>
              <p className="space-x-1 text-[10px] opacity-60 ">
                {finalEndMonth < 10 ? (
                  <span>0{finalEndMonth}</span>
                ) : (
                  <span>{finalEndMonth}</span>
                )}
                <span>/</span>
                <span>{finalEndDate}</span>
              </p>
              <div
                className={`${
                  startOrEnd ? "translate-x-[-100%]" : "translate-x-[0%]"
                } transition-all  w-full bg-[#00ac69] h-[5px] rounded-full mt-2 mb-5`}
              ></div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center  px-3">
            <div
              className={`opacity-60 mb-5  ${
                yearVisibility2 ? "" : "cursor-pointer"
              }`}
              onClick={() => {
                if (yearVisibility2 == false) {
                  setYearVisibility2(!yearVisibility2);
                }
              }}
            >
              {yearVisibility2 ? "End Date" : highlightedYear2}
            </div>

            {yearVisibility2 ? (
              <div className="grid grid-cols-3 gap-5 gap-x-10  place-items-center ">
                {yearList?.map((yearData) => (
                  <div
                    key={Math.random()}
                    className={`transition-all ${
                      yearData.year === highlightedYear2
                        ? "text-[#00AC69] opacity-100"
                        : ""
                    }  ${
                      yearData.year < 2014
                        ? "cursor-not-allowed  text-gray-500"
                        : ""
                    } 
              ${yearData.year > 2022 ? "cursor-not-allowed text-gray-500" : ""}
            

              ${
                yearData.year < finalStartDate
                  ? "cursor-not-allowed text-gray-500"
                  : ""
              }

                opacity-70 cursor-pointer`}
                    onClick={() => {
                      if (
                        yearData.year >= 2014 &&
                        yearData.year <= currentYear
                      ) {
                        if (yearData.year >= finalStartDate) {
                          setStartOrEnd(false);
                          setFinalEndDate(yearData.year);
                          setYearVisibility2(!yearVisibility2);
                          setHighlightedYear2(yearData.year);
                        }
                      }
                    }}
                  >
                    {yearData.year}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5 ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName.id}
                    className={` transition-all  ${
                      monthName.id === highlightedMonth2
                        ? "text-[#00AC69] opacity-100"
                        : ""
                    }   ${
                      finalStartDate === finalEndDate &&
                      monthName.id <= finalStartMonth
                        ? "cursor-not-allowed text-gray-500"
                        : ""
                    } opacity-70 cursor-pointer`}
                    onClick={() => {
                      if (finalStartDate === finalEndDate) {
                        if (monthName.id > finalStartMonth) {
                          setHighlightedMonth2(monthName.id);

                          setFinalEndMonth(monthName.id);
                          setActiveSubmit(true);
                          setYearVisibility2(!yearVisibility2);

                          setLargeDate(
                            finalStartDate.toString() +
                              finalStartMonth.toString() +
                              finalEndDate.toString() +
                              finalEndMonth.toString()
                          );
                        } else {
                          setLargeDate(
                            finalStartDate.toString() +
                              finalStartMonth.toString() +
                              finalEndDate.toString() +
                              finalEndMonth.toString()
                          );
                        }
                      } else {
                        setHighlightedMonth2(monthName.id);

                        setFinalEndMonth(monthName.id);
                        setActiveSubmit(true);
                        setYearVisibility2(!yearVisibility2);
                        setCallRegion(true);

                        setLargeDate(
                          finalStartDate.toString() +
                            finalStartMonth.toString() +
                            finalEndDate.toString() +
                            finalEndMonth.toString()
                        );
                      }
                    }}
                  >
                    {monthName.month}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* <div className="flex justify-around items-center mt-5">
          <Region />
          <ClinicFilter />
        </div> */}

        {/* <button
          onClick={() => {
            setGoStatus(!goStatus);
            setSendDataStatus(true);
            setCallClinicValue(false);
            setCallRegion(false);
            // setFilterButtonStatus(false);
            console.log("new region data:");
            // console.log(newRegionGlobal);
            console.log("selected clinic:");
          }}
          className={`  active:scale-95
           
          } transition ease-in-out  bg-[#00ac69] text-white text-xs font-semibold  rounded-lg p-2 mt-5`}
        >
          Apply Filters
        </button> */}

        <div
          className={` opacity-100 cursor-pointer
           
           text-center bg-[#00AC69] text-white py-1 rounded-md w-[100px] ml-auto mt-5 text-sm`}
          onClick={() => {
            // console.log("Final Start Year " + finalStartDate);
            // console.log("Final End Year " + finalEndDate);
            // console.log("Final Start Month " + finalStartMonth);
            // console.log("Final End Month " + finalEndMonth);
            setDatePickerStatus(!datePickerStatus);
            setCallRegion(true);
            setSendDataStatus(true);
            setGoStatus(!goStatus);
            setCallClinicValue(true);
            setFlushRegionvalue(true);
            setAllDataRecievedStatus(false);
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar3;
