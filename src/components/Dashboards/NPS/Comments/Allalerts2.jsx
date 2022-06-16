import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";

// import extremeCommentsData from "../../../../mock_API/NPS/NPS Main Dashboard/AlertsComments.json";
import { useRecoilState } from "recoil";

import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
// import ErrorIcon from "../../../../assets/img/global-img/Error.svg";
// import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";
import chevron from "../../../../assets/img/NPS Dashboard/chevron.svg";

const AlertComments = () => {
  const [apiData, setApiData] = useState();
  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);

  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalFilteredComments, setTotalFilteredComments] = useState();
  const [ascSort, setAscSort] = useState(false);

  const handleInput = (e) => {
    setInputData(e.target.value);

    setTotalFilteredComments(
      apiData?.filter((filtered_value) => {
        return filtered_value?.review
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase());
      }).length
    );
  };

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  useEffect(() => {
    setApiData(alertCommentsAPIData?.data);
    console.log("alert atom data");
    console.log(alertCommentsAPIData?.data);
  }, [alertCommentsAPIData]);

  useEffect(() => {
    console.log("ApiDataaaaaaaaaaaaaaaaaaaa");
    console.log(apiData);
  }, [apiData]);

  return (
    <div className=" border w-full p-2 h-[810px] rounded-lg bg-white mt-3 ">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-center pb-2 ">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80">
              Alerts
              <span
                className={` ${
                  inputData ? " " : " hidden"
                }  ml-1 sm:ml-5 text-[#0b271c]  rounded-md bg-red-100  border text-xs sm:text-sm p-1 sm:px-2`}
              >
                {totalFilteredComments}
              </span>
            </h1>
            <div className=" rounded-md  flex justify-end items-center ">
              <input
                type="text"
                placeholder="Search.."
                className={` outline-none  transition-all pl-2 text-xs  pb-1 w-[80px] sm:w-[100px] ${
                  searchStatus
                    ? "xl:w-[100%] ease-in  xl:border-b-[1px]"
                    : "xl:w-[0%] ease-out"
                }`}
                onChange={handleInput}
                value={inputData}
              />

              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>

          <div className="h-[750px] overflow-y-scroll scrollbar-hide ">
            {apiData?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Alerts
              </div>
            ) : (
              <table className=" text-[12px] p-3 pb-0 w-full">
                <thead className="border-b-gray-100 border-b-2 sticky bg-white top-0 z-[5]">
                  <tr className=" flex justify-between items-center gap-3 text-center px-2 text-[12px] text-gray-500 uppercase p-2 font-normal">
                    <th
                      onClick={() => {
                        setAscSort(!ascSort);
                        setApiData(apiData?.map((data) => data)?.reverse());
                      }}
                      className=" text-gray-400 w-[10%] min-w-[70px] capitalize  text-left font-normal cursor-pointer hover:text-gray-600 transition relative "
                    >
                      <span>Date</span>
                      <span>
                        <img
                          src={chevron}
                          alt=" sort date"
                          className={` ${
                            ascSort ? "rotate-180 ease-in" : "rotate-0 ease-in"
                          } transition-all inline w-[6px] ml-1 bottom-[30%] absolute`}
                        />
                      </span>
                    </th>
                    <th className=" text-gray-400 w-[60%] min-w-[200px]  capitalize text-left font-normal">
                      Comments
                    </th>

                    <th className=" text-gray-400 w-[20%] min-w-[70px]  capitalize font-normal text-left ">
                      Clinic
                    </th>

                    <th className="font-normal w-[10%]   text-gray-400 capitalize ">
                      Sentiment
                    </th>
                  </tr>
                </thead>
                {apiData
                  ?.filter((filtered_value) => {
                    if (inputData === "") {
                      return filtered_value;
                    } else if (
                      filtered_value?.review
                        ?.toLowerCase()
                        ?.includes(inputData.toLowerCase())
                    ) {
                      return filtered_value;
                    }
                  })
                  .map((data, index) => {
                    return (
                      <tbody key={index} className="w-full ">
                        <tr className="  flex justify-around items-center gap-3 px-2 py-3 border-b">
                          <td className=" text-gray-400 w-[10%] min-w-[70px] capitalize  font-normal text-[12px] ">
                            {data?.timestamp}
                          </td>
                          <td className="  text-gray-400 w-[60%] min-w-[200px]  text-left font-normal ">
                            <div
                              className="w-full text-[#000c08b3] text-[12px] font-semibold"
                              onClick={() => {
                                setExpandComment(data?.id);
                                setClickCount(!clickCount);
                              }}
                            >
                              {expandComment == data?.id && clickCount
                                ? data?.review
                                : truncate(data?.review, 100)}
                            </div>
                          </td>

                          <td className=" text-gray-400 w-[20%] min-w-[70px]   font-normal ">
                            {data?.clinic}
                          </td>
                          <td className="font-normal w-[10%]   text-gray-400 capitalize">
                            <img
                              src={ExtremeIcon}
                              alt="extreme"
                              className="mx-auto"
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertComments;
