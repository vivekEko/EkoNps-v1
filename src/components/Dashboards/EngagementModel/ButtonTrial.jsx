import React from "react";
import { useState } from "react";

const ButtonTrial = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("http://192.168.1.14:8000/egPercentileMember", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        if (result.Message === "FALSE") {
          console.log("Please provide full details!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div style={{ padding: "6px" }}></div>
      <div style={{ textAlign: "center" }}>
        <form>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept={".csv"}
          />
        </form>
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ButtonTrial;
