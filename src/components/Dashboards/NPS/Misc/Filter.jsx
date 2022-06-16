import React, { useEffect, useState } from "react";
import CalendarIcon from "../../../../assets/img/NPS Dashboard/calendar.svg";
import LocationIcon from "../../../../assets/img/NPS Dashboard/Location.svg";
import ExportIcon from "../../../../assets/img/NPS Dashboard/Export.svg";
import DatePicker from "./DatePicker";
import { useRecoilState } from "recoil";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import CustomCalendar from "./CustomCalendar";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import CustomCalendar2 from "./CustomCalendar2";
import CustomCalendar3 from "./CustomCalendar3";
import Region from "./Region";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import ClinicFilter from "./ClinicFilter";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import callClinics from "../../../../recoil/atoms/callClinics";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import Region2 from "./Region2";
import ClinicFilter2 from "./ClinicFilter2";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useDetectClickOutside } from "react-detect-click-outside";
import FormatColorResetOutlinedIcon from "@mui/icons-material/FormatColorResetOutlined";
import flushRegion from "../../../../recoil/atoms/flushRegion";
import regionList from "../../../../recoil/atoms/regionList";
import regionLocalStatus from "../../../../recoil/atoms/regionLocalStatus";
import clinicLocalStatus from "../../../../recoil/atoms/clinicLocalStatus";
import flushClinic from "../../../../recoil/atoms/flushClinic";
import CustomCalendar4 from "./CustomCalendar4";

const Filter = () => {
  const [flushClinicStatus, setFlushClinicStatus] = useRecoilState(flushClinic);

  const [regionLocalStatusAtom, setRegionLocalStatusAtom] =
    useRecoilState(regionLocalStatus);
  const [clinicLocalStatusAtom, setClinicLocalStatusAtom] =
    useRecoilState(clinicLocalStatus);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [flushRegionValue, setFlushRegionvalue] = useRecoilState(flushRegion);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);

  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);

  //   Global variables
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  const closeToggle = () => {
    setDatePickerStatus(false);
  };

  // useEffect(() => {
  //   console.log("clinicsAPIData");
  //   console.log(clinicsAPIData);
  // }, [clinicsAPIData]);

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  const [clearFilterVar, setClearFilterVar] = useState(false);

  useEffect(() => {
    setAllDataRecievedStatus(false);
    setFlushRegionvalue(true);
    setFlushClinicStatus(true);
    setSendDataStatus(-1);
    setTimeout(setGoStatus(!goStatus), 5000);
  }, [clearFilterVar]);

  return (
    <div className="flex justify-between items-center  relative   ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  w-full ">
        {/* Calendar */}

        <div className="relative">
          <div className="flex items-center gap-5 w-full relative ">
            <div
              onClick={() => {
                if (allDataRecievedStatus) {
                  setDatePickerStatus(!datePickerStatus);
                  setCallRegion(false);
                }
              }}
              className={` ${
                allDataRecievedStatus ? "" : " opacity-50 cursor-not-allowed"
              }  p-1 bg-blue-50 active:scale-95 transition-all px-2 rounded-lg flex justify-center items-center cursor-pointer w-full border`}
            >
              <img src={CalendarIcon} alt="date selector" />
              <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1">
                {monthList[finalStartMonth - 1] +
                  "  " +
                  finalStartDate +
                  " - " +
                  monthList[finalEndMonth - 1] +
                  "  " +
                  finalEndDate}
              </span>
            </div>

            <div
              className={`absolute  top-[100%] left-0 right-0 z-[150] cursor-default ${
                datePickerStatus ? "block" : "hidden"
              }`}
            >
              {/* <CustomCalendar3 /> */}

              <CustomCalendar4 />
            </div>

            <div
              className={`absolute right-5 ${
                allDataRecievedStatus ? "hidden" : " block"
              } `}
            >
              <RefreshRoundedIcon className="opacity-30 animate-spin" />
            </div>
          </div>
        </div>

        {/* <Region /> */}
        <Region2 />
        {/* <ClinicFilter /> */}
        <ClinicFilter2 />

        <div
          className={`
          ${
            allDataRecievedStatus === true
              ? "  cursor-pointer active:scale-95"
              : "opacity-50 cursor-not-allowed "
          }
          
          ${
            regionLocalStatusAtom > 0 || clinicLocalStatusAtom > 0
              ? "  cursor-pointer active:scale-95"
              : "opacity-50 cursor-not-allowed "
          }  bg-blue-50 p-2 rounded-lg text-[10px] sm:text-[12px] text-[#000C08] border text-opacity-70  transition-all flex justify-center items-center gap-2`}
          onClick={() => {
            if (allDataRecievedStatus === true) {
              if (regionLocalStatusAtom > 0 || clinicLocalStatusAtom > 0) {
                setClearFilterVar(!clearFilterVar);
              }
            }
          }}
        >
          <FormatColorResetOutlinedIcon
            fontSize="small"
            className="text-[#0189B9]"
          />
          Clear Filters
        </div>
      </div>

      <div className="hidden">
        <div className=" p-2 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer">
          <img src={ExportIcon} alt="date selector" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70">
            Export
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
