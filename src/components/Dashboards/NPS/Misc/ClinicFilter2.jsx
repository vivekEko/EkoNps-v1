import React, { useEffect, useState } from "react";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import { useRecoilState } from "recoil";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import ClinicFilterAPiData from "../../../../recoil/atoms/ClinicFilterAPiData";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import flushClinic from "../../../../recoil/atoms/flushClinic";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useDetectClickOutside } from "react-detect-click-outside";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import clinicLocalStatus from "../../../../recoil/atoms/clinicLocalStatus";

const ClinicFilter2 = () => {
  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(ClinicFilterAPiData);
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);
  const [clinicStatusLocal, setClinicStatusoLocal] = useState(false);
  const [inputData, setInputData] = useState("");

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  const [clinicLocal, setClinicLocal] = useState([]);

  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [flushClinicStatus, setFlushClinicStatus] = useRecoilState(flushClinic);
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);

  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  useEffect(() => {
    if (flushClinicStatus === true) {
      setClinicLocal([]);
    }

    // console.log("ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // console.log(flushClinicStatus);
  }, [flushClinicStatus]);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    // console.log("clinicLocal");
    // console.log(clinicLocal);

    const text = clinicLocal.join("-");

    setSelectedClinicValue(text);

    // console.log("selectedClinicValue ....................................");
    // console.log(selectedClinicValue);
  }, [clinicLocal, selectedClinicValue]);

  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  const closeToggle = () => {
    setClinicStatusoLocal(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  const [clinicLocalStatusAtom, setClinicLocalStatusAtom] =
    useRecoilState(clinicLocalStatus);

  // useEffect(() => {
  //   console.log("clinicLocalStatusAtom:");
  //   console.log(clinicLocalStatusAtom);
  // }, [clinicLocalStatusAtom]);

  useEffect(() => {
    if (clinicLocal.length) {
      // console.log("clinicLocal length:");

      // console.log(clinicLocal.length);
      setClinicLocalStatusAtom(true);
    } else {
      setClinicLocalStatusAtom(false);
    }
  }, [clinicLocal]);

  return (
    <div
      className="relative z-[150] "
      ref={ref}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div
        className={` ${
          allDataRecievedStatus
            ? "active:scale-95"
            : " opacity-50 cursor-not-allowed"
        } cursor-pointer  p-1 bg-blue-50 bg-opacity-80 transition-all px-2 rounded-lg flex justify-center items-center  border relative`}
        onClick={() => {
          if (allDataRecievedStatus) {
            setClinicStatusoLocal(!clinicStatusLocal);
            setCallRegion(false);
            setFlushClinicStatus(false);
          }
        }}
      >
        <MedicationOutlinedIcon className="text-[#0189B9]" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Health Centers
        </span>

        <div
          className={`text-xs ml-2 rounded-full bg-[#0189B9] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
            clinicLocal?.length > 0 ? "block" : "hidden"
          } `}
        >
          {clinicLocal?.length}
        </div>
        <div
          className={`absolute right-5 ${
            allDataRecievedStatus ? "hidden" : " block"
          } `}
        >
          <RefreshRoundedIcon className="opacity-50 animate-spin" />
        </div>
      </div>

      {/* list items */}
      <div
        className={` ${
          clinicStatusLocal ? "block ease-in" : "hidden ease-out"
        } absolute top-[110%] bg-white shadow-lg h-[230px] w-full rounded-lg transition-all p-2 `}
      >
        <div className="h-full">
          {/* fetched list */}
          <div className="relative  h-full">
            <div className="h-full  overflow-scroll scrollbar-hide">
              {/* search */}
              <div className=" bg-white h-[30px] sticky top-0 z-[45]">
                <div className="relative">
                  <input
                    type="text"
                    className="outline-none border-0 pl-8 w-full text-xs border-b pb-2"
                    placeholder="Search..."
                    onChange={handleInput}
                    value={inputData}
                  />
                  <div className="absolute top-0 left-0 w-5">
                    <img src={seachIcon} alt="" />
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="pl-2 pt-2 relative  pb-14">
                <div>
                  {clinicsAPIdataValue?.clinic
                    ?.filter((filtered_value) => {
                      if (inputData === "") {
                        return filtered_value;
                      } else if (
                        filtered_value
                          ?.toLowerCase()
                          ?.includes(inputData.toLowerCase())
                      ) {
                        return filtered_value;
                      }
                    })
                    .map((data, index) => (
                      <div
                        key={index + 1}
                        className="flex justify-start items-center gap-2 mb-2"
                      >
                        <input
                          type="checkbox"
                          name={data}
                          value={data}
                          checked={clinicLocal?.includes(data) ? true : false}
                          onChange={() => {
                            if (clinicLocal?.includes(data)) {
                              console.log(data + " already exits");
                              setClinicLocal((clinicLocal) =>
                                arrayRemove(clinicLocal, data)
                              );
                            } else {
                              setClinicLocal((clinicLocal) => [
                                ...clinicLocal,
                                data,
                              ]);
                            }
                          }}
                        />

                        <label
                          htmlFor={data}
                          className="text-sm ml-5 "
                          onClick={() => {
                            {
                              if (clinicLocal?.includes(data)) {
                                console.log(data + " already exits");
                                setClinicLocal((clinicLocal) =>
                                  arrayRemove(clinicLocal, data)
                                );
                              } else {
                                setClinicLocal((clinicLocal) => [
                                  ...clinicLocal,
                                  data,
                                ]);
                              }
                            }
                          }}
                        >
                          <p className="text-ellipsis overflow-hidden ... ">
                            {data}
                          </p>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Submit btn */}
            <div className="bg-white pt-1 absolute bottom-0 right-0 left-0 flex justify-between items-center  pl-2">
              <div className="flex justify-start items-center gap-2  ">
                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#0189B9]"
                  onClick={() => {
                    {
                      setClinicLocal(clinicsAPIdataValue?.clinic);
                    }
                  }}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#0189B9]"
                  onClick={() => {
                    setClinicLocal([]);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#0189B9] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setClinicStatusoLocal(!clinicStatusLocal);
                  setFilterButtonStatus(true);
                  setSendDataStatus(true);
                  setGoStatus(!goStatus);
                  setAllDataRecievedStatus(false);
                }}
              >
                Submit
              </div>
            </div>
          </div>

          {/* selected list */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ClinicFilter2;
