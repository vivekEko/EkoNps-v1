import React, { Suspense } from "react";
import AlertComments from "../NPS Overall Dashboard/AlertComments";
import WordFrequency from "../NPS Overall Dashboard/WordFrequency";
import Comments from "../NPS Overall Dashboard/Comments";
import Filter from "../Misc/Filter";
import CommentsTotalcards from "./CommentsTotalcards";
// import TotalComments from "./TotalComments";
import Allalerts from "./Allalerts";
import { PuffLoader } from "react-spinners";
import TotalComments2 from "./TotalComments2";
import Allalerts2 from "./Allalerts2";
import TotalComments4 from "./TotalComments4";

const TotalComments = React.lazy(() => import("./TotalComments"));

const CommentsPage = () => {
  return (
    <div>
      {/* <Filter /> */}
      {/* Total Cards */}
      {/* <CommentsTotalcards /> */}

      {/* word cloud and alerts */}
      <section className="my-[10px]  flex flex-col-reverse lg:flex-row justify-center gap-[10px]">
        {/* <Suspense fallback={<div>Loading</div>}>
          <TotalComments />
        </Suspense> */}

        <TotalComments4 />

        <div className=" lg:w-[45%]">
          <CommentsTotalcards />
          {/* <Allalerts /> */}
          <Allalerts2 />
        </div>
      </section>
      {/* <section className="my-[30px]  flex flex-col sm:flex-row justify-center gap-[18px]">
        <Comments />
      </section> */}
    </div>
  );
};

export default CommentsPage;
