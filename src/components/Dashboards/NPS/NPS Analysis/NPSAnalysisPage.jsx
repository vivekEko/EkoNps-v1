import React from "react";
import NPSAllGraph from "./NPSAllGraph";
import NPSDetailCard from "./NPSDetailCard";
import NPSFormula from "./NPSFormula";
import NPSVsSentiment from "../NPS Overall Dashboard/NPSVsSentiment";
import Filter from "../Misc/Filter";

const NPSAnalysisPage = () => {
  return (
    <div className="relative">
      {/* <Filter /> */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-5 mt-[20px]">
        {/* <NPSFormula /> */}
        <NPSDetailCard />
      </section>

      <section className="my-[30px]  flex flex-col lg:flex-row justify-center gap-[18px]">
        <NPSAllGraph />
      </section>
    </div>
  );
};

export default NPSAnalysisPage;
