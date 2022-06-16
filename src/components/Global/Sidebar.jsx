import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import activeInnerPage from "../../recoil/atoms/activeInnerPage";
import hamburgerStatusRecoil from "../../recoil/atoms/HamburgerAtom";
import componentName from "../../recoil/atoms/PageNameAtom";
import BoxIconLarge from "../Sidebar/IconContainer/BoxIconLarge";
import BoxIconSmall from "../Sidebar/IconContainer/BoxIconSmall";
import DashboardIcon from "../Sidebar/IconContainer/DashboardIcon";
import NPSDashboardIcon from "../Sidebar/IconContainer/NPSDashboardIcon";
import SidebarLink from "../Sidebar/LinkContainer/SidebarLink";
import SidebarMiniLink from "../Sidebar/LinkContainer/SidebarMiniLink";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import EngagementIcon from "../Sidebar/IconContainer/EngagementIcon";
import UserValidity from "../../recoil/atoms/UserValidity";
import DateFilterStatus from "../../recoil/atoms/DateFilterStatusAtom";
import logout from "../../assets/img/global-img/logout.svg";

const Sidebar = () => {
  const [userIsValid, setUserIsValid] = useRecoilState(UserValidity);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  const [componentNameValue, setComponentNameValue] =
    useRecoilState(componentName);

  // const [childNPSLinkStatus, setChildNPSLinkStatus] = useState(false);
  const [bgColorValue, setbgColorValue] = useState("transparent");
  const [strokeColor, setStrokeColor] = useState("#0189B9");

  const [pageName, setPageName] = useState("/");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setPageName("/");
    } else {
      setPageName(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (pageName === componentNameValue) {
      setbgColorValue("#0189B9");
      setStrokeColor("#0189B9");
    } else {
      setbgColorValue("transparent");
      setStrokeColor("#0189B9");
    }
  }, [pageName, componentNameValue]);

  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  let history = useNavigate();

  return (
    <div
      className={`h-[calc(100vh-50px)]  mt-[50px] fixed inset-y-0 left-0 z-30  overflow-y-scroll overflow-x-hidden transition-all duration-[400ms] ease-out transform    scrollbar-hide  bg-white border-r-2 border-b-[#EBECEB] border-[1px] w-[150px]${
        hamburgerStatus
          ? "ease-in   "
          : "ease-out  -translate-x-[100%] lg:translate-x-0 "
      }`}
      onClick={() => setDatePickerStatus(!setDatePickerStatus)}
    >
      <div className="   ">
        <div className="pt-[65px] relative ">
          <div>
            {/* <div className="mb-[30px] hidden">
              <Link to="/">
                <SidebarLink
                  iconName="/"
                  pageName={pageName}
                  linkName="Dashboard"
                  onClick={() => {
                    setPageName("/");
                    setComponentNameValue("/");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue(null);
                  }}
                  icon={
                    <DashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="/"
                      pageName={pageName}
                    />
                  }
                />
              </Link>
            </div> */}

            <div className="mb-[30px]">
              <Link to="/">
                <SidebarLink
                  iconName="/"
                  pageName={pageName}
                  linkName="NPS"
                  onClick={() => {
                    setPageName("/");
                    setComponentNameValue("/");
                    // setChildNPSLinkStatus(!childNPSLinkStatus);
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("NPS_Overall");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="/"
                      pageName={pageName}
                    />
                  }
                />
              </Link>
              <div className={`mt-[10px] w-[90%] ml-auto `}>
                <Link to="/">
                  <SidebarMiniLink
                    iconName="NPS_Analysis"
                    pageName={activePageValue}
                    linkName="NPS Analysis"
                    onClick={() => {
                      setPageName("/");
                      setComponentNameValue("/");
                      setHamburgerStatus(!hamburgerStatus);
                      setActivePageValue("NPS_Analysis");
                    }}
                    icon={
                      <NPSDashboardIcon
                        bgColor={bgColorValue}
                        strokeColor={strokeColor}
                        iconName="NPS_Analysis"
                        pageName={activePageValue}
                      />
                    }
                  />
                </Link>

                <Link to="/">
                  <SidebarMiniLink
                    iconName="NSS_Analysis"
                    pageName={activePageValue}
                    linkName="Sentiments"
                    onClick={() => {
                      setPageName("/");
                      setComponentNameValue("/");
                      setHamburgerStatus(!hamburgerStatus);
                      setActivePageValue("NSS_Analysis");
                    }}
                    icon={
                      <NPSDashboardIcon
                        bgColor={bgColorValue}
                        strokeColor={strokeColor}
                        iconName="NSS_Analysis"
                        pageName={activePageValue}
                      />
                    }
                  />
                </Link>

                <Link to="/">
                  <SidebarMiniLink
                    iconName="Comments"
                    pageName={activePageValue}
                    linkName="Comments"
                    onClick={() => {
                      setPageName("/");
                      setComponentNameValue("/");
                      setHamburgerStatus(!hamburgerStatus);
                      setActivePageValue("Comments");
                    }}
                    icon={
                      <NPSDashboardIcon
                        bgColor={bgColorValue}
                        strokeColor={strokeColor}
                        iconName="Comments"
                        pageName={activePageValue}
                      />
                    }
                  />
                </Link>
              </div>
            </div>

            {/* <EngagementIcon /> */}

            <div className="mb-[30px] ">
              <Link to="/engagementModel">
                <SidebarLink
                  iconName="/engagementModel"
                  pageName={pageName}
                  linkName="Engagement Model"
                  onClick={() => {
                    setPageName("/engagementModel");
                    setComponentNameValue("/engagementModel");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue(null);
                  }}
                  icon={
                    <BoxIconLarge
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="/engagementModel"
                      pageName={pageName}
                    />
                  }
                />
              </Link>
            </div>

            <div className="mb-[30px] invisible">
              <Link to="/SDOH">
                <SidebarLink
                  iconName="/SDOH"
                  pageName={pageName}
                  linkName="SDOH"
                  onClick={() => {
                    setPageName("/SDOH");
                    setComponentNameValue("/SDOH");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue(null);
                  }}
                  icon={
                    <BoxIconLarge
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="/SDOH"
                      pageName={pageName}
                    />
                  }
                />
              </Link>
            </div>
          </div>
        </div>
        <div className=" absolute top-[calc(100vh-100px)] left-0 right-0 h-[50px]  ">
          {/* <div
            className=" bg-[#f1f0f0] rounded-lg  cursor-pointer flex justify-between p-5 mx-auto items-center gap-2 h-full "
            onClick={() => {
              sessionStorage.clear();
              // history("/");
              setUserIsValid(false);
            }}
          >
            <div className="opacity-80 text-base">Logout</div>
            <div>
              <LogoutIcon
                className="opacity-100 text-[#00ac69]"
                fontSize="small"
              />
            </div>
          </div> */}
          <img
            src={logout}
            alt="logout"
            className="w-[25px] cursor-pointer lg:hidden mx-auto"
            onClick={() => {
              sessionStorage.clear();
              // history("/");
              setUserIsValid(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
