import React, { useEffect, useState } from "react";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import Cross from "../../../../assets/img/global-img/cross.svg";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import callClinics from "../../../../recoil/atoms/callClinics";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";

const ClinicFilter = () => {
  const [clinicStatusLocal, setClinicStatusoLocal] = useState(false);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(clinicsApiData);

  const [clinicLocal, setClinicLocal] = useState([]);

  const clinicArray = [];

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  useEffect(() => {
    // console.log("clinicLocal");
    // console.log(clinicLocal);

    const text = clinicLocal.join("-");

    setSelectedClinicValue(text);

    // console.log("selectedClinicValue ....................................");
    // console.log(selectedClinicValue);
  }, [clinicLocal, selectedClinicValue]);

  // console.log(clinicArray);

  return (
    <div className="relative z-50 ">
      <div
        className={` cursor-pointer opacity-100 p-1 bg-white px-2 rounded-lg flex justify-center items-center  border`}
        onClick={() => {
          setClinicStatusoLocal(!clinicStatusLocal);
          // setFilterButtonStatus(false);
          // clinicArray.splice(0, clinicArray.length);
        }}
      >
        <MedicationOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Health Centers
        </span>
      </div>

      <div
        className={` ${
          clinicStatusLocal ? "block" : "hidden"
        }  bg-white shadow-xl max-h-[200px] w-[200px] absolute top-[120%] rounded-lg overflow-y-scroll scrollbar-hide`}
      >
        {!clinicsAPIdataValue?.clinic && (
          <div className="h-full w-full flex justify-center items-center text-gray-400 text-xs animate-pulse">
            Loading ...
          </div>
        )}

        {clinicsAPIdataValue?.clinic && (
          <div className=" w-[80%] mx-auto   text-sm py-2  ">
            {clinicsAPIdataValue?.clinic?.map((data, index) => (
              <div
                key={index}
                className="text-xs text-gray-500 p-2 pl-5  my-1 hover:text-[#00ac69] transition cursor-pointer flex items-center gap-5"
                onClick={() => {
                  setClinicStatusoLocal(!clinicStatusLocal);
                  setClinicLocal((clinicLocal) => [...clinicLocal, data]);
                  setFilterButtonStatus(true);
                }}
              >
                {/* <span className="text-gray-500">{index + 1}</span>{" "} */}
                <span className="font-semibold">{data}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicFilter;
