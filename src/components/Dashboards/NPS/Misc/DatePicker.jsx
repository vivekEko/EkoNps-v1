import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";

const DatePicker = () => {
  const [yearList, setYearList] = useState();
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [selectedStartYear, setSelectedStartYear] = useState();
  const [selectedEndYear, setSelectedEndYear] = useState();
  const [selectedStartMonth, setSelectedStartMonth] = useState();
  const [selectedEndMonth, setSelectedEndMonth] = useState();

  const [clickedYear, setClickedYear] = useState(false);
  const [clickedMonth, setClickedMonth] = useState(false);
  const [monthVisibility, setMonthVisibility] = useState(false);
  const [yearVisibility, setYearVisibility] = useState(true);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  // const [npsLoaderStatus, setNpsLoaderStatus] = useRecoilState(NPSLoaderStatus);

  // console.log(sendDataStatus);

  const yearListArray = [];

  useEffect(() => {
    let startYear = currentYear - 8;
    let endYear = currentYear - 1;

    for (let i = startYear; i <= endYear; i++) {
      yearListArray.push({ year: i });
      // console.log(yearList);
      setYearList(yearListArray);
    }
  }, []);

  // useEffect(() => {
  //   setSelectedEndYear(selectedStartYear + 1);
  //   setSelectedEndMonth(selectedEndMonth);
  // }, [selectedStartYear, selectedEndMonth]);

  // function FinalValueshandler() {
  //   setFinalStartDate(selectedStartYear);
  //   setFinalStartMonth(selectedStartMonth);
  //   setFinalEndDate(selectedEndYear);
  //   setFinalEndMonth(selectedStartMonth);
  // }

  // useEffect(() => {
  //   setFinalStartDate(selectedStartYear);
  //   setFinalStartMonth(selectedStartMonth);
  //   setFinalEndDate(selectedEndYear);
  //   setFinalEndMonth(selectedEndMonth);
  // }, [
  //   selectedStartYear,
  //   selectedStartMonth,
  //   selectedEndYear,
  //   selectedEndMonth,
  // ]);

  const monthData = [
    {
      id: 1,
      month: "Jan",
    },
    {
      id: 2,
      month: "Feb",
    },
    {
      id: 3,
      month: "Mar",
    },
    {
      id: 4,
      month: "Apr",
    },
    {
      id: 5,
      month: "May",
    },
    {
      id: 6,
      month: "Jun",
    },
    {
      id: 7,
      month: "Jul",
    },
    {
      id: 8,
      month: "Aug",
    },
    {
      id: 9,
      month: "Sep",
    },
    {
      id: 10,
      month: "Oct",
    },
    {
      id: 11,
      month: "Nov",
    },
    {
      id: 12,
      month: "Dec",
    },
  ];
  return (
    <div className="bg-white min-w-[300px] mt-5 rounded-md border-2 border-gray-200  z-[999]">
      {/* Year */}
      {yearVisibility && (
        <div>
          <h1 className="text-left opacity-60 text-sm px-3 py-5"> Year</h1>
          <div className="grid grid-cols-5 justify-between items-center place-items-start">
            {yearList?.map((data) => (
              <div
                key={Math.random()}
                className={`p-2 m-1 opacity-70 hover:bg-green-100 cursor-pointer rounded-md `}
                onClick={() => {
                  setFinalStartDate(data.year);
                  setFinalEndDate(data.year + 1);
                  setSelectedStartYear(data.year);
                  setClickedYear(true);
                  setYearVisibility(!yearVisibility);
                  setMonthVisibility(!monthVisibility);
                  setSendDataStatus(false);
                }}
              >
                {data.year}
              </div>
            ))}
          </div>
        </div>
      )}

      {monthVisibility && (
        <div>
          <h1 className="text-left opacity-60 text-sm px-3 py-5"> Month</h1>
          <div className="grid grid-cols-5 justify-between items-center place-items-start">
            {monthData?.map((data) => (
              <div
                key={Math.random()}
                className={`p-2 m-1 opacity-70 hover:bg-green-100 cursor-pointer rounded-md `}
                onClick={() => {
                  setFinalStartMonth(data.id);
                  setFinalEndMonth(data.id);
                  setSelectedStartMonth(data.id);
                  setClickedMonth(true);
                  setDatePickerStatus(!datePickerStatus);
                  setYearVisibility(!yearVisibility);
                  setMonthVisibility(!monthVisibility);
                  setSendDataStatus(true);
                  // FinalValueshandler();
                }}
              >
                {data.month}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
