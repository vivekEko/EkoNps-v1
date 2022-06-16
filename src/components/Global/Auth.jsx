import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import CompanyLogo from "../../assets/img/global-img/ekoLogo.png";
import UserAuthAtom from "../../recoil/atoms/UserAuthAtom";
import { useNavigate } from "react-router-dom";
import { BASE_API_LINK } from "../../utils/BaseAPILink";
import UserValidity from "../../recoil/atoms/UserValidity";
import goButtonStatus from "../../recoil/atoms/goButtonStatus";

const Auth = () => {
  const signInEmailRef = useRef(null);
  const signInPasswordRef = useRef(null);
  const [user, setUser] = useRecoilState(UserAuthAtom);
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  let history = useNavigate();

  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);

  useEffect(() => {
    setGoStatus(!goStatus);
  }, []);

  //   States
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const formData = new FormData();

  // useEffect(() => {
  //   if (sessionStorage.getItem("useStatus")) {
  //     history("/");
  //     console.log("it is TRUUUUUUUUUe");
  //   }
  // }, []);

  //   Signin and SignUp handlers
  const signInHandler = (e) => {
    e.preventDefault();
    const userEmail = signInEmailRef.current.value;
    const userPassword = signInPasswordRef.current.value;

    // console.log("userEmail: " + userEmail);
    // console.log("userPassword: " + userPassword);

    formData.append("username", userEmail);
    formData.append("password", userPassword);

    fetch(baseAPI + "userLogin", {
      mode: "cors",
      method: "POST",
      // headers: {
      //   authorization: "jhasgbdhasvbdua234as54ascasjchb",
      //   Accept: "application/json",
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Result:");
        console.log(result);
        if (result.Message === "TRUE") {
          //   setUser(true);
          // console.log("status is trueeeeeeeeeeee");
          // history("/");
          setUserIsValid(true);

          sessionStorage.setItem("useStatus", result.Message);
          sessionStorage.setItem("username", result.username);
          sessionStorage.setItem("token", result.token);
        } else if (result.Message === "FALSE") {
          // history("/");
          setUserIsValid(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="grid place-items-center h-screen bg-[whitesmoke] text-white cursor-default absolute top-0 bottom-0 right-0 left-0 z-[999]">
      <div className="p-[20px]  text-center bg-white rounded-lg drop-shadow-lg w-[90%] max-w-[300px]">
        <div className="flex justify-center  mb-[50px]">
          <img
            className=" w-[150px]  grayscale-[40%]"
            src={CompanyLogo}
            alt="EKO Logo"
          />
        </div>

        <div className="">
          <form className="max-w-[250px] mx-auto">
            <input
              ref={signInEmailRef}
              type="text"
              placeholder="Email address"
              required
              className="h-12 w-full outline-none px-5 mb-5 bg-[#00000025]  text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#0189B9] rounded "
            />
            <input
              ref={signInPasswordRef}
              type="password"
              placeholder="Password"
              required
              className="h-12 w-full outline-none px-5 mb-5 bg-[#00000025] text-black border-b-2 border-opacity-0 focus:border-opacity-100 border-[#0189B9] rounded "
            />
            <p className="my-5 text-sm text-red-500">{loginErrorMessage}</p>
            <button
              className="bg-[#0189B9] text-white hover:bg-opacity-80 w-full p-3 border-0 hover:border-0 outline-none transition-all rounded-md active:scale-95"
              variant="outlined"
              onClick={signInHandler}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
