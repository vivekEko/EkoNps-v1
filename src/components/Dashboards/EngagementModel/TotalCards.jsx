import React, { useEffect } from "react";

const TotalCards = () => {
  useEffect(() => {}, []);

  return (
    <div>
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
    </div>
  );
};

export default TotalCards;
