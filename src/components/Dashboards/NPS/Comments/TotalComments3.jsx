import React, { useEffect, useRef, useState } from "react";
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

const TotalComments3 = () => {
  const [inputData, setInputData] = useState("");
  const [expandComment, setExpandComment] = useState("");
  const [clickCount, setClickCount] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [totalViewedComments, setTotalViewedComments] = useState(49);
  const [totalNoComments, setTotalNoComments] = useRecoilState(totalComments);

  const [ascSort, setAscSort] = useState(false);
  const [showSentiments, setShowSentiments] = useState(false);
  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [apiData, setApiData] = useState();
  const [totalFilteredComments, setTotalFilteredComments] = useState();

  const [positiveCommentAtom, setPositiveCommentAtom] =
    useRecoilState(positiveComments);
  const [negativeCommentAtom, setNegativeCommentAtom] =
    useRecoilState(negativeComments);
  const [extremeCommentAtom, setExtremeCommentAtom] =
    useRecoilState(extremeComments);
  const [neutralCommentAtom, setNeutralCommentAtom] =
    useRecoilState(neutralComments);

  function handleLoadMore() {
    setTotalViewedComments(totalViewedComments + 50);
  }

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

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  useEffect(() => {
    setTotalFilteredComments(apiData?.length);
  }, [apiData]);

  return (
    <div className="w-[100%] md:w-[50%] border  p-2 h-[400px] rounded-lg bg-white">
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
          <div className=" h-[350px] overflow-y-scroll overflow-x-scroll scrollbar-hide ">
            {apiData?.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-gray-400">
                No Comments
              </div>
            ) : (
              <div>
                <div className="text-[12px] p-3 pb-0 w-full  ">
                  <div className="border-b-gray-100 border-b-2 sticky bg-white top-0 z-[5] ">
                    <div className=" grid grid-cols-[60px_minmax(200px,1fr)_100px_80px] gap-2   min-w-[500px]  text-[12px] text-gray-500 uppercase font-normal bg-white ">
                      <div
                        onClick={() => setAscSort(!ascSort)}
                        className=" text-gray-400  capitalize  font-normal cursor-pointer hover:text-gray-600 transition  "
                      >
                        <span>Date</span>
                        <span>
                          <img
                            src={chevron}
                            alt=" sort date"
                            className={` ${
                              ascSort
                                ? "rotate-180 ease-in"
                                : "rotate-0 ease-in"
                            } transition-all inline w-[6px] ml-1 `}
                          />
                        </span>
                      </div>
                      <div className=" text-gray-400   capitalize  font-normal ">
                        Comments
                      </div>

                      <div className=" text-gray-400   capitalize font-normal  ">
                        Clinic
                      </div>

                      <div
                        className="font-normal     text-gray-400 capitalize relative  "
                        ref={ref}
                      >
                        <div
                          className="text-gray-400  cursor-pointer hover:text-gray-600 transition-all  inline-block w-full h-full   text-center"
                          onClick={() => setShowSentiments(!showSentiments)}
                        >
                          <span>Sentiment</span>

                          <img
                            src={chevron}
                            alt=" select sentiment"
                            className={` ${
                              showSentiments
                                ? "rotate-0 ease-in"
                                : "rotate-180 ease-in"
                            } transition-all inline w-[6px] ml-1 `}
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
                      </div>
                    </div>
                  </div>

                  <div>
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
                          <div key={index} className="w-full ">
                            {index <= totalViewedComments && (
                              <>
                                <div className=" grid grid-cols-[60px_minmax(200px,1fr)_100px_80px] gap-2 items-center  border-b py-2 min-h-[60px] min-w-[500px]">
                                  <div className="  text-gray-400  capitalize  font-normal text-[12px]  ">
                                    {data?.timestamp}
                                  </div>

                                  <div className=" text-gray-400   text-left font-normal  ">
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
                                  </div>

                                  <div className=" text-gray-400    font-normal ">
                                    {data?.clinic}
                                  </div>

                                  {data?.label == "Positive" && (
                                    <div className=" font-normal    text-gray-400 capitalize  ">
                                      <img
                                        src={PositiveIcon}
                                        alt="Positive"
                                        className="mx-auto "
                                      />
                                    </div>
                                  )}
                                  {data?.label == "Negative" && (
                                    <div className="  font-normal    text-gray-400 capitalize  ">
                                      <img
                                        src={NegativeIcon}
                                        alt="Negative"
                                        className="mx-auto "
                                      />
                                    </div>
                                  )}
                                  {data?.label == "Neutral" && (
                                    <div className="  font-normal    text-gray-400 capitalize  ">
                                      <img
                                        src={NeutralIcon}
                                        alt="Neutral"
                                        className=" mx-auto  "
                                      />
                                    </div>
                                  )}
                                  {data?.label == "Extreme" && (
                                    <div className="  font-normal    text-gray-400 capitalize   ">
                                      <img
                                        src={ExtremeIcon}
                                        alt="Extreme"
                                        className="mx-auto "
                                      />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {totalFilteredComments > totalViewedComments && (
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

                {totalViewedComments >= totalFilteredComments &&
                  totalFilteredComments >= 1 &&
                  totalFilteredComments < totalViewedComments && (
                    <div className=" flex  justify-center items-center p-2">
                      <div className="text-xs text-gray-500">--End--</div>
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

export default TotalComments3;
