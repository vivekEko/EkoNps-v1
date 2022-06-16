import Header from "./components/Global/Header";
import Sidebar from "./components/Global/Sidebar";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/Dashboards/Main Dashboard/Dashboard";
import NPSDashboard from "./components/Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import NPSAnalysisPage from "./components/Dashboards/NPS/NPS Analysis/NPSAnalysisPage";
import NSSPage from "./components/Dashboards/NPS/NSS/NSSPage";
import { useRecoilState } from "recoil";
import DateFilterStatus from "./recoil/atoms/DateFilterStatusAtom";
import CommentsPage from "./components/Dashboards/NPS/Comments/CommentsPage";
import EngagementModel from "./components/Dashboards/EngagementModel/EngagementModel";
import SDOH from "./components/Dashboards/SDOH/SDOH";
import hamburgerStatusRecoil from "./recoil/atoms/HamburgerAtom";
import Filter from "./components/Dashboards/NPS/Misc/Filter";
import Auth from "./components/Global/Auth";
import { useEffect, useState } from "react";
import UserAuthAtom from "./recoil/atoms/UserAuthAtom";
import Home from "./components/Global/Home";
import UserValidity from "./recoil/atoms/UserValidity";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function App() {
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  const [showToast, setShowToast] = useState(true);

  return (
    <div>
      {/* <div
        className={`p-2 bg-green-200 transition-all md:hidden h-[40px] z-[999] ${
          showToast
            ? "translate-y-0 ease-in h-[40px]"
            : "translate-y-[-100%] ease-out hidden"
        } `}
      >
        <div
          className={`   flex transition-all items-center opacity-70 text-sm `}
        >
          <div className="flex items-center gap-2">
            <ErrorOutlineIcon fontSize="small" className="opacity-50" />
            <div className="text-xs">
              For better experience visit this website in PC/Laptop
            </div>
          </div>
          <CloseRoundedIcon
            className="opacity-50 ml-auto cursor-pointer"
            onClick={() => setShowToast(false)}
          />
        </div>
      </div> */}

      <div className={` cursor-default relative  `}>
        {/*Calendar Overlay */}
        <div
          onClick={() => setDatePickerStatus(!datePickerStatus)}
          className={`h-screen w-full fixed bg-transparent z-[10] ${
            datePickerStatus ? "block" : "hidden"
          }`}
        ></div>

        {/*Sidebar Overlay */}
        <div
          onClick={() => setHamburgerStatus(!hamburgerStatus)}
          className={`h-screen w-full fixed bg-[#00000025] z-[20] ${
            hamburgerStatus ? "block lg:hidden" : "hidden"
          } xl:hidden`}
        ></div>
        <Header />
        <main className="bg-white ">
          <Router>
            <Sidebar />
            <div className="lg:pl-[170px] p-[8px]  ">
              {/* <Filter /> */}
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                {/* <Route exact path="/" element={<Dashboard />}></Route> */}
                {/* <Route exact path="/" element={<Auth />}></Route> */}
                <Route exact path="/" element={<Home />}></Route>

                {/* <Route
                  exact
                  path="/npsDashboard"
                  element={<NPSDashboard />}
                ></Route> */}
                <Route
                  path="/npsDashboard/npsAnalysis"
                  element={<NPSAnalysisPage />}
                ></Route>
                <Route path="/npsDashboard/nss" element={<NSSPage />}></Route>
                <Route
                  path="/npsDashboard/comments"
                  element={<CommentsPage />}
                ></Route>
                <Route
                  path="/engagementModel"
                  element={<EngagementModel />}
                ></Route>
                <Route path="/SDOH" element={<SDOH />}></Route>
              </Routes>
            </div>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
