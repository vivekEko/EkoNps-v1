import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DoneIcon from "@mui/icons-material/Done";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const EngagementHeader = () => {
  const [clickedUpload, setClickedUpload] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [clickedDownload, setClickedDownload] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);

  // Upload functionality
  const hiddenFileInput = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  useEffect(() => {
    if (isFilePicked == true) {
      handleSubmission();
    }
  }, [isFilePicked]);

  const handleSubmission = () => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("http://192.168.1.14:8000/egPercentileMember", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setClickedUpload(false);
        setUploading(false);
        setDownloadStatus(true);
        setClickedUpload(false);

        console.log("Success:", result);
        console.log("result.message =" + result.Message);
        if (result.Message === "FALSE") {
          console.log("Please provide full details!");
          setUploadFailed(true);
        } else if (result.Message === "TRUE") {
          setUploadCompleted(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("completed:" + uploadCompleted);
  console.log("error:" + uploadFailed);

  return (
    <div>
      <div className="flex items-center justify-between">
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept={".csv"}
          className="hidden"
          ref={hiddenFileInput}
        />

        {/* Upload Button */}
        <div
          className={` rounded-full   bg-[#02b973] ${
            uploadCompleted && "bg-[#02b973]"
          }  ${
            uploadFailed && "bg-red-400"
          } flex justify-between items-center  w-[180px] cursor-pointer transition active:scale-95 h-[50px]`}
          onClick={() => {
            setClickedUpload(true);
            hiddenFileInput.current.click();
            // setTimeout(() => {
            //   setClickedUpload(false);
            //   setUploading(false);
            //   setDownloadStatus(true);
            //   setUploadCompleted(true);
            // }, 5000);

            //   setTimeout(() => {
            //     setUploadCompleted(false);
            //   }, 8000);
          }}
        >
          <div>
            {!uploadFailed ? (
              <span
                className={`text-white  p-3 px-5 font-semibold ${
                  uploading ? "hidden" : "block"
                }`}
              >
                {uploadCompleted ? "Uploaded" : "Upload"}
              </span>
            ) : (
              <span
                className={`text-white  p-3 px-5 font-semibold ${
                  uploading ? "hidden" : "block"
                }`}
              >
                Error
              </span>
            )}

            <span
              className={`text-white  p-3 px-5 ${
                uploading ? "block" : "hidden"
              }`}
            >
              Uploading
            </span>
          </div>
          <div
            className={` bg-[#06ca7f] ${uploadCompleted && "bg-[#06ca7f]"}  ${
              uploadFailed && "bg-red-500"
            } rounded-full p-3  h-[50px] overflow-hidden`}
          >
            {/* {!uploadCompleted && (
              <div className={` ${clickedUpload ? "animate-ping" : " "} `}>
                <ArrowUpwardIcon className="text-white " />
              </div>
            )} */}

            {uploadCompleted === false && uploadFailed === false ? (
              <div className={` ${clickedUpload ? "animate-ping" : " "} `}>
                <ArrowUpwardIcon className="text-white " />
              </div>
            ) : (
              ""
            )}

            {uploadCompleted && (
              <div className="">
                <DoneIcon className=" transition-all text-white" />
              </div>
            )}
            {uploadFailed && (
              <div className="">
                <ErrorOutlineOutlinedIcon className="transition-all text-white" />
              </div>
            )}
          </div>
        </div>

        {/* 
        total Cards */}
        <div className="flex justify-center items-center gap-10">
          <div className="p-2 text-center bg-white rounded-lg w-[150px]">
            <h3 className="opacity-60 mb-2 text-xs">Rows</h3>
            <h1 className="opacity-80 text-3xl">333</h1>
          </div>

          <div className="p-2 text-center bg-white rounded-lg w-[150px]">
            <h3 className="opacity-60 mb-2 text-xs">Columns</h3>
            <h1 className="opacity-80 text-3xl">19</h1>
          </div>
        </div>

        {/* Download Button */}

        <div
          className={` ${
            downloadStatus
              ? "cursor-pointer opacity-100 active:scale-95"
              : "cursor-not-allowed opacity-50"
          } rounded-full bg-[#02b973]  flex justify-between items-center  w-[180px]  transition  h-[50px]`}
          onClick={() => {
            if (downloadStatus === true) {
              setClickedDownload(true);
              setDownloading(true);
              setTimeout(() => {
                setClickedDownload(false);
                setDownloading(false);

                setDownloadCompleted(true);
              }, 5000);

              //   setTimeout(() => {
              //     setDownloadCompleted(false);
              //   }, 8000);
            }
          }}
        >
          <div>
            <span
              className={`text-white  p-3 px-5 font-semibold ${
                downloading ? "hidden" : "block"
              }`}
            >
              {downloadCompleted ? "Downloaded" : "Download"}
            </span>
            <span
              className={`text-white  p-3 px-5 ${
                downloading ? "block" : "hidden"
              }`}
            >
              Downloading
            </span>
          </div>
          <div className="bg-[#06ca7f]  rounded-full p-3  h-[50px] overflow-hidden">
            {!downloadCompleted ? (
              <div className={` ${clickedDownload ? "animate-ping" : " "} `}>
                <ArrowDownwardIcon className="text-white " />
              </div>
            ) : (
              <div className="">
                <DoneIcon className="text-white transition-all" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementHeader;
