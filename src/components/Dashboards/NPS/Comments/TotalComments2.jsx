import React, { useEffect, useState } from "react";
// import TopCommentsQ1Data from "../../../../mock_API/NPS/NPS Main Dashboard/Comments.json";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import SearchIcons from "../../../../assets/img/global-img/searchIcon.svg";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";
import PositiveIcon from "../../../../assets/img/NPS Dashboard/Positive.svg";
import NegativeIcon from "../../../../assets/img/NPS Dashboard/Negative.svg";
import ExtremeIcon from "../../../../assets/img/NPS Dashboard/Extreme.svg";
import NeutralIcon from "../../../../assets/img/NPS Dashboard/Neutral.svg";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import totalComments from "../../../../recoil/atoms/totalComments";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import { useDetectClickOutside } from "react-detect-click-outside";
import chevron from "../../../../assets/img/NPS Dashboard/chevron.svg";
import positiveComments from "../../../../recoil/atoms/positiveComments";
import negativeComments from "../../../../recoil/atoms/negativeComments";
import extremeComments from "../../../../recoil/atoms/extremeComments";
import neutralComments from "../../../../recoil/atoms/neutralComments";

const TotalComments2 = () => {
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalViewedComments, setTotalViewedComments] = useState(99);
  const [totalNoComments, setTotalNoComments] = useRecoilState(totalComments);
  const [totalFilteredComments, setTotalFilteredComments] = useState(100);
  const [ascSort, setAscSort] = useState(false);
  const [showSentiments, setShowSentiments] = useState(false);
  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();

  const [positiveCommentAtom, setPositiveCommentAtom] =
    useRecoilState(positiveComments);
  const [negativeCommentAtom, setNegativeCommentAtom] =
    useRecoilState(negativeComments);
  const [extremeCommentAtom, setExtremeCommentAtom] =
    useRecoilState(extremeComments);
  const [neutralCommentAtom, setNeutralCommentAtom] =
    useRecoilState(neutralComments);

  // useEffect(() => {
  //   console.log("selected senti:");
  //   console.log(selectedSentiments);
  //   console.log("legth of selected senti");
  //   console.log(selectedSentiments.length);
  // }, [selectedSentiments]);

  function handleLoadMore() {
    // if (totalViewedComments + 100 <= totalNoComments) {
    //   setTotalViewedComments(totalViewedComments + 100);
    // } else {
    //   setTotalViewedComments(totalViewedComments);
    // }

    setTotalViewedComments(totalViewedComments + 100);
  }

  const handleInput = (e) => {
    setInputData(e.target.value);

    // let filteredComments = apiData?.filter((filtered_value) => {
    //   return filtered_value?.review
    //     ?.toLowerCase()
    //     ?.includes(inputData?.toLowerCase());
    // }).length;

    setTotalFilteredComments(
      apiData?.filter((filtered_value) => {
        return filtered_value?.review
          ?.toLowerCase()
          ?.includes(e.target.value?.toLowerCase());
      }).length
    );
  };

  // useEffect(() => {
  //   console.log("total Filtered Comments:");
  //   console.log(totalFilteredComments);
  // }, [totalFilteredComments]);

  //   truncating description if it contains more then desired no. of characters
  function truncate(string, n) {
    return (
      <span>
        {string?.length > n && (
          <span>
            {string.substr(0, n - 1)}{" "}
            <span className="text-[10px] text-gray-500 cursor-pointer">
              {" "}
              ... Read more
            </span>
          </span>
        )}
        {string?.length < n && <span>{string}</span>}
      </span>
    );
  }

  const [apiDataCopy, setApiDataCopy] = useState();

  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);

  const sentimentList = ["Positive", "Negative", "Neutral", "Extreme"];

  const closeToggle = () => {
    setShowSentiments(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeToggle });

  useEffect(() => {
    if (ascSort === true) {
      setApiData(apiData?.map((data) => data)?.reverse());
    }
    if (ascSort === false) {
      setApiData(apiData?.map((data) => data)?.reverse());
    }
  }, [ascSort]);

  useEffect(() => {
    let arr = [];

    if (ascSort === false) {
      setApiData(allCommentsAPIData?.data);
    }

    if (selectedSentiments?.length === 0) {
      setApiData(allCommentsAPIData?.data);
    } else {
      for (let i in selectedSentiments) {
        if (selectedSentiments[i] === "Positive") {
          if (positiveCommentAtom?.count > 0) {
            arr = [...arr, ...positiveCommentAtom?.data];
          }
        }
        if (selectedSentiments[i] === "Negative") {
          if (negativeCommentAtom?.count > 0) {
            arr = [...arr, ...negativeCommentAtom?.data];
          }
        }
        if (selectedSentiments[i] === "Neutral") {
          if (neutralCommentAtom?.count > 0) {
            arr = [...arr, ...neutralCommentAtom?.data];
          }
        }

        if (selectedSentiments[i] === "Extreme") {
          if (extremeCommentAtom?.count > 0) {
            arr = [...arr, ...extremeCommentAtom?.data];
          }
        }
      }

      arr = arr.sort(function (x, y) {
        return x?.time - y?.time;
      });

      if (arr.length > 0) {
        setApiData(arr.reverse());
      }
    }
  }, [allCommentsAPIData, selectedSentiments]);

  // useEffect(() => {
  //   console.log(
  //     allCommentsAPIData?.data
  //       ?.filter((filteredData) => {
  //         if (filteredData?.label?.includes("Extreme")) {
  //           return filteredData;
  //         }
  //       })
  //       .map((data) => data)
  //   );
  // }, [apiData]);

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  return (
    <div className="w-[100%] border lg:w-[55%] p-2 h-[900px] rounded-lg bg-white">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div>
          <div className=" pt-2  flex justify-between items-end mb-2">
            <h1 className=" text-left font-bold  flex-1 px-2 opacity-80 text-[#000C08]">
              Comments{" "}
              <span
                className={` ${
                  inputData ? " " : " hidden"
                } ml-1 sm:ml-5 text-[#0b271c]  rounded-md bg-green-100 border text-xs sm:text-sm p-1 sm:px-2`}
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
                    : "xl:w-[0%] ease-out "
                }`}
                onChange={handleInput}
                value={inputData}
              />
              {/* <SearchIcon
                fontSize="small"
                className="cursor-pointer text-gray-400"
              /> */}
              <img
                src={SearchIcons}
                alt="searchIcon"
                className="px-2 cursor-pointer"
                onClick={() => setSearchStatus(!searchStatus)}
              />
            </div>
          </div>
          <div className=" h-[850px] overflow-y-scroll overflow-x-scroll scrollbar-hide ">
            {apiData?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Comments
              </div>
            ) : (
              <div>
                <table className="text-[12px] p-3 pb-0 w-full  ">
                  <thead className="border-b-gray-100 border-b-2 sticky bg-white top-0 z-[5] ">
                    <tr className=" flex justify-between items-center gap-3 text-center px-2 text-[12px] text-gray-500 uppercase p-2 font-normal">
                      {/* <th className=" w-[5%]  min-w-[30px] hidden">
                        <div className=" rounded-md  flex justify-start text-gray-400 capitalize font-medium">
                          S.No
                        </div>
                      </th> */}

                      <th
                        onClick={() => setAscSort(!ascSort)}
                        className=" text-gray-400 w-[10%] min-w-[70px] capitalize  text-left font-normal cursor-pointer hover:text-gray-600 transition relative "
                      >
                        <span>Date</span>
                        <span>
                          {/* <ArrowDropUpRoundedIcon
                            className={` transition  ${
                              ascSort
                                ? "rotate-180   ease-in"
                                : "rotate-0  ease-in"
                            } `}
                          /> */}

                          <img
                            src={chevron}
                            alt=" sort date"
                            className={` ${
                              ascSort
                                ? "rotate-180 ease-in"
                                : "rotate-0 ease-in"
                            } transition-all inline w-[6px] ml-1 bottom-[30%] absolute`}
                          />
                        </span>
                      </th>
                      <th className=" text-gray-400 w-[60%] min-w-[200px]  capitalize text-left font-normal ">
                        Comments
                      </th>

                      <th className=" text-gray-400 w-[20%] min-w-[70px]  capitalize font-normal text-left  ">
                        Clinic
                      </th>
                      {/* <th className=" text-gray-400 w-[7%] min-w-[70px]  capitalize font-normal hidden">
                        Visit Type
                      </th> */}

                      <th
                        className="font-normal w-[10%]      text-gray-400 capitalize relative  "
                        // onMouseEnter={() => setShowSentiments(true)}
                        // onMouseLeave={() => setShowSentiments(false)}
                        ref={ref}
                      >
                        <div
                          className=" cursor-pointer hover:text-gray-600 transition-all  inline-block w-full h-full relative "
                          onClick={() => setShowSentiments(!showSentiments)}
                        >
                          <span>Sentiment</span>
                          {/* <ArrowDropUpRoundedIcon
                            fontSize="small"
                            className={` ${
                              showSentiments
                                ? "rotate-0 ease-in"
                                : "rotate-180 ease-in"
                            } transition-all inline`}
                          /> */}
                          <img
                            src={chevron}
                            alt=" select sentiment"
                            className={` ${
                              showSentiments
                                ? "rotate-0 ease-in"
                                : "rotate-180 ease-in"
                            } transition-all inline w-[6px] ml-1 bottom-[30%] absolute right-[-10px]`}
                          />
                        </div>

                        <div
                          className={` ${
                            showSentiments ? "block" : "hidden "
                          } absolute bg-white  top-[100%] w-[130px] right-0 shadow-lg rounded-lg `}
                        >
                          {sentimentList?.map((data, index) => (
                            <div
                              key={index + 1}
                              className="text-left m-2 cursor-pointer "
                            >
                              <input
                                className=" cursor-pointer"
                                type="checkbox"
                                name={data}
                                value={data}
                                checked={
                                  selectedSentiments?.includes(data)
                                    ? true
                                    : false
                                }
                                onChange={() => {
                                  if (selectedSentiments?.includes(data)) {
                                    console.log(data + " already exits");
                                    setSelectedSentiments(
                                      (selectedSentiments) =>
                                        arrayRemove(selectedSentiments, data)
                                    );
                                  } else {
                                    setSelectedSentiments(
                                      (selectedSentiments) => [
                                        ...selectedSentiments,
                                        data,
                                      ]
                                    );
                                  }
                                }}
                              />

                              <label
                                htmlFor={data}
                                className="text-xs pl-2 cursor-pointer"
                                onClick={() => {
                                  if (selectedSentiments?.includes(data)) {
                                    console.log(data + " already exits");
                                    setSelectedSentiments(
                                      (selectedSentiments) =>
                                        arrayRemove(selectedSentiments, data)
                                    );
                                  } else {
                                    setSelectedSentiments(
                                      (selectedSentiments) => [
                                        ...selectedSentiments,
                                        data,
                                      ]
                                    );
                                  }
                                }}
                              >
                                {data}
                              </label>

                              <div className="ml-2 inline-block">
                                (
                                {data === "Positive" &&
                                  positiveCommentAtom?.count}
                                {data === "Negative" &&
                                  negativeCommentAtom?.count}
                                {data === "Extreme" &&
                                  extremeCommentAtom?.count}
                                {data === "Neutral" &&
                                  neutralCommentAtom?.count}
                                )
                              </div>
                            </div>
                          ))}

                          <div
                            className="underline w-fit text-[10px] cursor-pointer m-2"
                            onClick={() => setSelectedSentiments([])}
                          >
                            Clear all
                          </div>
                        </div>
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
                        return {
                          filtered_value,
                        };
                      }
                    })
                    .map((data, index) => {
                      return (
                        <tbody key={index} className="w-full ">
                          {index <= totalViewedComments && (
                            <>
                              <tr className="flex justify-around items-center gap-3 px-2 py-3 border-b">
                                {/* <td className=" text-gray-400 w-[5%]  min-w-[30px] text-[14px] hidden ">
                                  {index + 1}
                                </td> */}
                                <td className=" text-gray-400 w-[10%] min-w-[70px] capitalize  font-normal text-[12px]  ">
                                  {data?.timestamp}
                                </td>

                                <td className=" text-gray-400 w-[60%] min-w-[200px]  text-left font-normal  ">
                                  <div
                                    className="w-full text-[#000c08b3] text-[12px] font-semibold"
                                    onClick={() => {
                                      setExpandComment(data.id);
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

                                {/* <td className=" text-gray-400 w-[7%] min-w-[70px] text-center font-semibold  text-[10px] hidden">
                                  Annual Checkup
                                </td>
                                <td className=" text-gray-400 w-[7%] min-w-[70px]  text-center font-semibold text-[10px] hidden">
                                  Office
                                </td> */}
                                {data?.label == "Positive" && (
                                  // <td className=" bg-[#00AC69] bg-opacity-[16%] text-[#00AC69] font-medium py-2 w-[15%]  rounded-full  min-w-[60px] text-center">
                                  //   {data?.label}
                                  // </td>
                                  <td className=" font-normal w-[10%]   text-gray-400 capitalize ">
                                    {/* <div className="bg-[#00AC69] w-[8px] h-[8px] rounded-lg mx-auto"></div> */}
                                    <img
                                      src={PositiveIcon}
                                      alt="Positive"
                                      className="mx-auto "
                                    />
                                  </td>
                                )}
                                {data?.label == "Negative" && (
                                  <td className="  font-normal w-[10%]   text-gray-400 capitalize ">
                                    <img
                                      src={NegativeIcon}
                                      alt="Negative"
                                      className="mx-auto "
                                    />
                                  </td>
                                )}
                                {data?.label == "Neutral" && (
                                  <td className="  font-normal w-[10%]   text-gray-400 capitalize ">
                                    {/* {data?.label} */}
                                    <img
                                      src={NeutralIcon}
                                      alt="Neutral"
                                      className=" mx-auto  "
                                    />
                                  </td>
                                )}
                                {data?.label == "Extreme" && (
                                  <td className="  font-normal w-[10%]   text-gray-400 capitalize  ">
                                    <img
                                      src={ExtremeIcon}
                                      alt="Extreme"
                                      className="mx-auto "
                                    />
                                  </td>
                                )}
                                {/* <td className=" bg-green-100 p-2 text-green-700 rounded-md">
{data.label}
</td> */}
                              </tr>
                            </>
                          )}
                        </tbody>
                      );
                    })}
                </table>

                {totalFilteredComments > 50 && (
                  <div className=" flex  justify-center items-center p-2">
                    <div
                      className="flex flex-col justify-center items-center cursor-pointer "
                      onClick={handleLoadMore}
                    >
                      <DoubleArrowRoundedIcon className="text-gray-400 rotate-90 " />
                      <div className="text-xs text-gray-500">Load More</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalComments2;
