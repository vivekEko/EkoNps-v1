// import { useState } from "react";
// import { useRecoilState } from "recoil";
// import apiNameVar from "../../../../recoil/atoms/apiNameVar";
// import endDateValue from "../../../../recoil/atoms/EndDateAtom";
// import endMonthValue from "../../../../recoil/atoms/EndMonth";
// import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
// import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
// import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
// import startDateValue from "../../../../recoil/atoms/StartDateAtom";
// import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
// import { BASE_API_LINK } from "../../../../utils/BaseAPILink";

// export function CallAllApiData() {
//   const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
//   const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
//   const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
//   const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
//   const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
//   const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
//   const [apiNameVars, setApiNameVars] = useRecoilState(apiNameVar);
//   const defaultStartYear = 2021;
//   const defaultStartMonth = 1;
//   const defaultEndYear = 2021;
//   const defaultEndMonth = 12;

//   // All api data variables
//   // const [atomName, setAtomName] = useState();
//   const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
//   const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);

//   const allApiNames = [
//     "netPromoterScore",
//     "netSentimentScore",
//     //   "totalCards",
//     //   "npsOverTime",
//     //   "nssOverTime",
//     //   "npsVsSentiments",
//     //   "clinics_data",
//     //   "topComments",
//     //   "alertComments",
//     //   "totalComments",
//     // "wordFrequency",
//     // "cityStateClinics",
//     // "egStatistics",
//     // "egPercentileMember"]
//   ];

//   const ApiURL =
//     baseAPI +
//     apiNameVars +
//     "?" +
//     "start_year=" +
//     finalStartDate +
//     "&" +
//     "start_month=" +
//     finalStartMonth +
//     "&" +
//     "end_year=" +
//     finalEndDate +
//     "&" +
//     "end_month=" +
//     finalEndMonth;

//   const defaultUrl =
//     baseAPI +
//     apiNameVars +
//     "?" +
//     "start_year=" +
//     defaultStartYear +
//     "&" +
//     "start_month=" +
//     defaultStartMonth +
//     "&" +
//     "end_year=" +
//     defaultEndYear +
//     "&" +
//     "end_month=" +
//     defaultEndMonth;

//   if (sendDataStatus === true) {
//     axios.get(requestURL).then((res) => {
//       setNpsApiData(res?.data);
//       console.log("if :" + res?.data);
//     });
//   } else if (sendDataStatus === false) {
//     axios
//       .get(
//         baseAPI +
//           "netPromoterScore?start_month=1&start_year=2020&end_month=12&end_year=2020"
//       )
//       .then((res) => {
//         setNpsApiData(res?.data);
//         console.log("else :" + res?.data);
//       });
//   }
//   while (npsApiData === false) {}

//   if (sendDataStatus === true) {
//     axios.get(requestURL).then((res) => {
//       setNssApiData(res?.data);
//       console.log("if nss :" + res?.data);
//     });
//   } else if (sendDataStatus === false) {
//     axios
//       .get(
//         baseAPI +
//           "netSentimentScore?start_month=1&start_year=2020&end_month=12&end_year=2020"
//       )
//       .then((res) => {
//         setNssApiData(res?.data);
//         console.log("else nss :" + res?.data);
//       });
//   }
// }
