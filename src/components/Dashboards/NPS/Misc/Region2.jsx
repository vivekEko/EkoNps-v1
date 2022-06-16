import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import axios from "axios";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import ClinicFilterAPiData from "../../../../recoil/atoms/ClinicFilterAPiData";
import flushClinic from "../../../../recoil/atoms/flushClinic";
import flushRegion from "../../../../recoil/atoms/flushRegion";
import allDataRecieved from "../../../../recoil/atoms/allDataRecieved";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useDetectClickOutside } from "react-detect-click-outside";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import regionLocalStatus from "../../../../recoil/atoms/regionLocalStatus";

const Region2 = () => {
  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionShowStatus, setRegionShowStatus] = useState(false);
  const [inputData, setInputData] = useState("");
  const [regionLocal, setRegionLocal] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [flushClinicStatus, setFlushClinicStatus] = useRecoilState(flushClinic);
  const [allDataRecievedStatus, setAllDataRecievedStatus] =
    useRecoilState(allDataRecieved);
  const [regionLocalStatusAtom, setRegionLocalStatusAtom] =
    useRecoilState(regionLocalStatus);
  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const [regionCheckLogic, setRegionCheckLogic] = useState([]);
  const [flushRegionValue, setFlushRegionvalue] = useRecoilState(flushRegion);

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  const [newRegionLocal, setNewRegionLocal] = useState();

  useEffect(() => {
    setNewRegionLocal(regionListValue?.region);
  }, [regionListValue]);

  useEffect(() => {
    if (regionLocal?.length) {
      setRegionLocalStatusAtom(true);
    } else {
      setRegionLocalStatusAtom(false);
    }
  }, [regionLocal]);

  const [runClinicAPI, setRunClinicAPI] = useState(true);
  const [regionStatusLocal, setRegionStatusoLocal] = useState(false);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(ClinicFilterAPiData);
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  useEffect(() => {
    console.log("usernameLocal:");
    console.log(usernameLocal);
  }, [usernameLocal]);

  useEffect(async () => {
    const text = regionLocal.join("-");
    setRegionValue(text);
    setNewRegionGlobal(text);

    // Clinic
    if (runClinicAPI === true && usernameLocal) {
      const formdata = new FormData();
      formdata.append("username", usernameLocal);

      const clinicData = await axios.post(
        baseAPI +
          "filterClinic?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          text,
        formdata,

        {
          headers: {
            authorization: sessionStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );

      console.log("Clinic Data:");
      console.log(clinicData?.data);
      setClinicAPIDataValue(clinicData?.data);
    }
  }, [runClinicAPI, usernameLocal]);

  useEffect(() => {
    if (flushRegionValue === true) {
      setRegionLocal([]);
    }
  }, [flushRegionValue]);

  const closeToggle = () => {
    setRegionShowStatus(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  function handleAllSelect() {
    regionListValue?.region?.map((data) =>
      setRegionLocal((regionLocal) => [
        ...regionLocal,
        data.substr(data.indexOf(",") + 1),
      ])
    );
  }

  return (
    <div
      className="relative w-full z-[150] "
      ref={ref}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div className="flex items-center gap-2">
        <div
          className={` ${
            allDataRecievedStatus
              ? "active:scale-95"
              : " opacity-50 cursor-not-allowed"
          } cursor-pointer  p-1 bg-blue-50  transition-all px-2 rounded-lg flex justify-center items-center  border relative flex-1 `}
          onClick={() => {
            if (allDataRecievedStatus) {
              setRegionShowStatus(!regionShowStatus);
              setCallRegion(false);
              setRunClinicAPI(false);
              setFlushRegionvalue(false);
            }
          }}
        >
          <LocationOnOutlinedIcon className="text-[#0189B9]" fontSize="small" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
            Region
          </span>

          {/* selected count */}
          <div
            className={`text-xs ml-2 rounded-full bg-[#0189B9] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
              regionLocal?.length > 0 ? "block" : "hidden"
            } `}
          >
            {regionLocal?.length}
          </div>

          <div
            className={`absolute right-5 ${
              allDataRecievedStatus ? "hidden" : " block"
            } `}
          >
            <RefreshRoundedIcon className="opacity-50 animate-spin" />
          </div>
        </div>
      </div>

      {/* list items */}
      <div
        className={` ${
          regionShowStatus ? "block ease-in" : "hidden ease-out"
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
                  {regionListValue?.region
                    ?.filter((filtered_value) => {
                      if (inputData === "") {
                        return filtered_value;
                      } else if (
                        filtered_value
                          ?.toLowerCase()
                          ?.includes(inputData?.toLowerCase())
                      ) {
                        return filtered_value;
                      }
                    })
                    .map((data, index) => {
                      return (
                        <div key={index + 1}>
                          <input
                            type="checkbox"
                            name={data?.split(",")[0]}
                            value={data?.split(",")[0]}
                            checked={
                              regionLocal?.includes(
                                data.substr(data.indexOf(",") + 1)
                              )
                                ? true
                                : false
                            }
                            onChange={() => {
                              if (
                                regionLocal?.includes(
                                  data.substr(data.indexOf(",") + 1)
                                )
                              ) {
                                console.log(
                                  data.substr(data.indexOf(",") + 1) +
                                    " already exits"
                                );
                                setRegionLocal((regionLocal) =>
                                  arrayRemove(
                                    regionLocal,
                                    data.substr(data.indexOf(",") + 1)
                                  )
                                );
                              } else {
                                setRegionLocal((regionLocal) => [
                                  ...regionLocal,
                                  data.substr(data.indexOf(",") + 1),
                                ]);
                              }
                            }}
                          />

                          <label
                            htmlFor={data?.split(",")[0]}
                            className="text-sm ml-5"
                            onClick={() => {
                              {
                                if (
                                  regionLocal?.includes(
                                    data.substr(data.indexOf(",") + 1)
                                  )
                                ) {
                                  console.log(
                                    data.substr(data.indexOf(",") + 1) +
                                      " already exits"
                                  );
                                  setRegionLocal((regionLocal) =>
                                    arrayRemove(
                                      regionLocal,
                                      data.substr(data.indexOf(",") + 1)
                                    )
                                  );
                                } else {
                                  setRegionLocal((regionLocal) => [
                                    ...regionLocal,
                                    data.substr(data.indexOf(",") + 1),
                                  ]);
                                }
                              }
                            }}
                          >
                            {data?.split(",")[0]}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Submit btn */}
            <div className="bg-white pt-1 absolute bottom-0 right-0 left-0 flex justify-between items-center  pl-2">
              <div className="flex justify-start items-center gap-2  ">
                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#0189B9]"
                  onClick={handleAllSelect}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#0189B9]"
                  onClick={() => {
                    setRegionLocal([]);
                    setNewRegionGlobal([]);
                    setAllChecked(false);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#0189B9] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setRegionShowStatus(!regionShowStatus);
                  setSendDataStatus(true);
                  setNewRegionGlobal(regionLocal);
                  setFlushClinicStatus(true);
                  setAllDataRecievedStatus(false);
                  setRunClinicAPI(true);

                  setGoStatus(!goStatus);
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

export default Region2;
