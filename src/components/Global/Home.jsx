import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserValidity from "../../recoil/atoms/UserValidity";
import NPSDashboard from "../Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import Auth from "./Auth";
import EKO from "../../assets/img/global-img/ekoLogo.png";

const Home = () => {
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  // useEffect(() => {
  //   console.log("validity of user:");
  //   // console.log(userIsValid);
  // }, [userIsValid]);

  return (
    <div>
      {/* <div>
        <button
          className="p-5 bg-white rounded-md"
          onClick={() => setUserIsValid(!userIsValid)}
        >
          {userIsValid}
        </button>
      </div> */}
      {/* <div className="relative">
        {userIsValid ? <NPSDashboard /> : <Auth />}
      </div> */}
      <div className="">{userIsValid ? <NPSDashboard /> : <Auth />}</div>
      <div className="flex justify-center items py-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 italic text-xs">Powered by</span>
          <a
            href="https://www.ekoinfomatics.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={EKO}
              alt="EKO INFOMATICS"
              className="inline-block w-[50px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
