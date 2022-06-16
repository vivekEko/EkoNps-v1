import React, { useEffect, useState } from "react";
import clinicIcon from "../../../../assets/img/NPS Dashboard/ClinicIcon.svg";
import clinicData from "../../../../mock_API/NPS/NPS Main Dashboard/Clinics.json";
// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import FirstMedal from "../../../../assets/img/global-img/firstMedal.svg";
import SecondMedal from "../../../../assets/img/global-img/SecondMedal.svg";
import ThirdMedal from "../../../../assets/img/global-img/thirdMedal.svg";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";

const Clinics = () => {
  const [apiData, setApiData] = useState();
  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);
  useEffect(() => {
    setApiData(clinicsAPIData);
  }, [clinicsAPIData]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + ". . ." : string;
  }

  return (
    <div className="p-5 border rounded-lg bg-white transition-all  w-[100%] h-[300px] ">
      {!apiData?.data && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center ">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData?.data?.length === 0 && (
        <div className="h-full w-full flex justify-center items-center text-gray-400">
          No Health Centers
        </div>
      )}

      {apiData?.data?.length > 0 && (
        <div className="h-[300px] ">
          <h1 className="  font-bold  opacity-80">Health Centers</h1>
          <div className="text-xs text-gray-400 border-b-2 border-b-gray-100 mt-1 pb-2 flex">
            <div className="w-[70%]  flex justify-start gap-8">
              <div className="invisible">Type</div>
              <div className="">Name</div>
            </div>
            <div className="w-[30%] flex ml-auto">
              <div className="flex-1 text-center">NPS</div>
              <div className="flex-1 text-center hidden">Rating</div>
            </div>
          </div>

          <div className=" h-[85%] overflow-y-scroll scrollbar-hide  max-h-[220px]">
            <div className="">
              {apiData?.data?.map((data, index) => {
                // console.log(index);
                return (
                  <div
                    key={Math.random()}
                    className="flex justify-between items-center my-4"
                  >
                    <div className="flex gap-5 items-center w-[70%]">
                      <img
                        src={clinicIcon}
                        alt={data.clinic}
                        className="w-[40px] rounded-full"
                      />

                      <div>
                        <div className="text-sm">{data?.clinic}</div>
                        <div className="text-gray-500 text-xs">
                          {data?.city}, {data?.state}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500  w-[30%] flex">
                      <div className=" flex-1 text-center">
                        {data?.average_nps}
                      </div>
                      <div className=" flex-1 text-center hidden">
                        {data?.rating}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinics;
