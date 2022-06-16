import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import Cross from "../../../../assets/img/global-img/cross.svg";
import callClinics from "../../../../recoil/atoms/callClinics";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import axios from "axios";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";

const Region = () => {
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [regionStatusLocal, setRegionStatusoLocal] = useState(false);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [regionLocal, setRegionLocal] = useState([]);

  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(clinicsApiData);

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);
  const [runClinicAPI, setRunClinicAPI] = useState(false);

  const [inputData, setInputData] = useState("");

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const regionArray = [];

  // useEffect(() => {
  //   console.log("regionLocal: ");
  //   console.log(regionLocal);

  //   // console.log("variable region :");
  //   // console.log(regionValue);
  // }, [regionLocal]);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  useEffect(async () => {
    const text = regionLocal.join("-");

    // console.log("regionLocal");
    // console.log(regionLocal);

    // console.log("text region =================");
    // console.log(text);
    setRegionValue(text);
    // console.log("new region glabal value..................:");
    // console.log(regionValue);

    setNewRegionGlobal(text);

    // console.log("new variable value ;;;;;;;;;;;;;;;;;;");
    // console.log(newRegionGlobal);

    // Clinic
    if (runClinicAPI === true) {
      const clinicData = await axios.get(
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
          text
      );

      setClinicAPIDataValue(clinicData?.data);
    }
  }, [runClinicAPI]);

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  useEffect(() => {
    console.log("regionLocal:");
    console.log(regionLocal);
  }, [regionLocal]);

  const [activeRegions, setActiveRegions] = useState();

  return (
    <div className="relative z-50 ">
      <div
        className={` 
            cursor-pointer opacity-100 p-1 bg-white px-2 rounded-lg flex justify-center items-center  border`}
        onClick={() => {
          if (callRegion === true) {
            setRegionStatusoLocal(!regionStatusLocal);
            setSelectedClinicValue(null);
            setRegionLocal([]);
            setRunClinicAPI(false);
          }
        }}
      >
        <LocationOnOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Region
        </span>
      </div>

      <div
        className={` ${
          regionStatusLocal ? "block" : "hidden"
        }  bg-white shadow-xl h-[200px] w-[200px] absolute top-[120%] rounded-lg overflow-y-scroll scrollbar-hide`}
      >
        {!regionListValue?.region && (
          <div className="h-full w-full flex justify-center items-center text-gray-400 text-xs animate-pulse">
            Loading ...
          </div>
        )}

        {regionListValue?.region && (
          <div className=" w-[80%] mx-auto   text-sm py-2  ">
            <div className="flex justify-between items-center gap-2 sticky top-0 bg-white">
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
              <div className="">
                <div
                  className="bg-[#00ac69] p-2 text-xs rounded-md text-white text-center cursor-pointer"
                  onClick={() => {
                    setRegionStatusoLocal(!regionStatusLocal);
                    setRunClinicAPI(true);
                  }}
                >
                  Submit
                </div>
              </div>
            </div>

            {regionListValue?.region
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
                  key={index}
                  className="text-xs text-gray-500 p-2   my-1 hover:text-[#00ac69] group transition cursor-pointer flex items-center gap-5"
                  onClick={() => {
                    regionArray.push(data);
                    if (regionLocal.includes(data)) {
                      console.log(data + " already exits");
                      // arrayRemove(regionLocal, JSON.stringify(data));
                      // delete regionLocal[index];
                      setRegionLocal((regionLocal) =>
                        arrayRemove(regionLocal, data)
                      );
                    } else {
                      setRegionLocal((regionLocal) => [...regionLocal, data]);
                    }

                    // setRegionStatusoLocal(!regionStatusLocal);
                    // setRunClinicAPI(true);
                    // setCallClinicValue(true);
                  }}
                >
                  {/* {regionLocal.includes(data) && (
                    <span className="text-gray-500 border rounded-full border-[#00ac69] transition">
                      <DoneRoundedIcon
                        fontSize="small"
                        className={` opacity-100 text-[#00ac69]    transition `}
                      />
                    </span>
                  )}
                  {!regionLocal.includes(data) && (
                    <span className="text-gray-500 border rounded-full group-hover:border-[#00ac69] transition">
                      <DoneRoundedIcon
                        fontSize="small"
                        className={` opacity-0 group-hover:text-[#00ac69]   group-hover:opacity-100 transition `}
                      />
                    </span>
                  )} */}

                  {/* <span className="text-gray-500">{index + 1}</span> */}
                  <span className="font-semibold">{data}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Region;
