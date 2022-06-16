import React, { useEffect, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import uploadIcon from "../../../assets/img/global-img/uploadIcon.svg";
import { PuffLoader } from "react-spinners";
import CountUp from "react-countup";

import RespondantsIcon from "../../../assets/img/global-img/respondants.svg";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BASE_API_LINK } from "../../../utils/BaseAPILink";
import { useRecoilState } from "recoil";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";

const UploadWrapper = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);
  // const [rows, setRows] = useState();
  // const [columns, setColumns] = useState();
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);
  const [graphData, setGraphData] = useState();
  const [percentageData, setPercentageData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [Males, setMales] = useState(0);
  const [Females, setFemales] = useState(0);
  const [Others, setOthers] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setMales(apiData?.gender?.male);
      setFemales(apiData?.gender?.female);
      setOthers(apiData?.gender?.other);
    }, 100);
  }, [apiData?.gender?.male]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const [usernameLocal, setUsernameLocal] = useState();

  useEffect(() => {
    setUsernameLocal(sessionStorage?.getItem("username"));
  }, [sessionStorage?.getItem("username")]);

  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("username", usernameLocal);
    formData.append("file", selectedFile);

    fetch(baseAPI + "egMemberPercentile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        if (result?.Message === "TRUE") {
          setLoaderStatus(false);
          setGraphData(result?.graph);
          setPercentageData(result?.percentage);
        }
        if (result?.Message === "FALSE") {
          setLoaderStatus(false);
          alert("Invalid file");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(baseAPI + "egMemberPercentile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response?.json())
      .then((result) => {
        console.log("Total Cards Data:", result);
        setApiData(result);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  };

  useEffect(() => {
    // console.log("selected file: ");
    // console.log(selectedFile);
    // console.log(isFilePicked);
    if (selectedFile) {
      handleSubmission();
      setLoaderStatus(true);
    }
  }, [selectedFile]);

  const loaderAnimation = {
    width: Males + "%",
    minWidth: "5%",
  };

  return (
    <div>
      <div>
        <div className="w-[100%] mb-2  rounded-lg bg-white ">
          {/* <h1 className=" text-left font-bold  text-lg mb-5  opacity-80 text-[#000C08]">
            Upload File
          </h1>
          <form>
            <div className="border-[2px] border-dashed border-[#00ac69]  rounded-2xl  w-full flex justify-center items-center h-[250px] relative">
              {loaderStatus ? (
                <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
                  <PuffLoader color="#00ac69" size={50} width={100} />
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    accept={".csv"}
                    className="absolute top-0 bottom-0 left-0 right-0 w-full opacity-0"
                  />
                  <img
                    src={uploadIcon}
                    alt="upload"
                    className="w-[80px] mx-auto text-center"
                  />
                  <p className="opacity-40">Click to upload your files here </p>
                </div>

              
              )}
            </div>
          </form> */}

          <form className="cursor-pointer flex justify-end">
            <label
              htmlFor="file-upload"
              className="p-2 bg-[#0189B9] text-center w-[130px] rounded-md  text-white transition-all active:scale-95 cursor-pointer relative "
            >
              <input
                type="file"
                name="file"
                id="file-upload"
                onChange={changeHandler}
                accept={".csv"}
                placeholder="upload"
                className="absolute top-0 bottom-0 left-0 right-0 w-full opacity-0 z-[-100] cursor-pointer "
              />

              <span className="mr-2 cursor-pointer">Upload</span>
              <CloudUploadOutlinedIcon
                fontSize="medium"
                className="cursor-pointer"
              />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadWrapper;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    // console.log("payload .............................");
    // console.log(payload);

    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-3 shadow-2xl shadow-[#000000] min-w-[150px]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="">
              <div className="flex justify-start items-center mb-2">
                <h1 className="capitalize mr-5 text-[14px] font-semibold">
                  Member Data
                </h1>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Name:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_name}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">
                  Percentile Value:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentile_value}
                </span>
              </div>

              <div className="flex justify-between items-center  w-full">
                <span className="text-[11px] font-semibold">Member Score:</span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.member_score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function CustomTooltip2({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        <h1 className="capitalize mr-2 text-[15px] mb-2 font-bold ">
          {/* {payload[0]?.payload?.month}, {payload[0]?.payload?.year} */}
          Age Data
        </h1>
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Age Category:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.groupName}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Count:
                </span>
                <span className="text-[11px] font-semibold">{data?.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function CustomTooltip3({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
        {payload?.map((data) => (
          <div key={Math.random()} className="">
            <div className="justify-between items-center flex mb-2">
              <h1 className="capitalize mr-2 text-[15px]  font-bold ">
                Gender Stats
              </h1>

              <div
                style={{ background: data?.payload?.color }}
                className={`h-[8px] w-[8px] rounded-full  `}
              ></div>
            </div>
            <div className=" ">
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Gender:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.label}
                </span>
              </div>
              <div className="flex justify-between items-center  w-full">
                <span className="capitalize mr-2 text-[11px] font-semibold">
                  Percentage:
                </span>
                <span className="text-[11px] font-semibold">
                  {data?.payload?.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
