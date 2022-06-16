import React, { useEffect, useRef } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import cities from "./cities.json";
import engagementModelAPI from "../../../recoil/atoms/engagementModelAPI";
import { useRecoilState } from "recoil";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  // iconRetinaUrl: require("../../../assets/img/global-img/everside_marker_big.png"),
  // iconUrl: require("../../../assets/img/global-img/everside_marker_big.png"),

  iconSize: [30, 30],

  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// const position = [apiData?.long_mid, apiData?.lat_mid];

console.log("lat value:");
console.log(engagementModelAPI);

// const position = [42.53444793650794, -71.50924931746033];

const USMap = () => {
  const [apiData, setApiData] = useRecoilState(engagementModelAPI);

  //   const position = [42.53444793650794, -71.50924931746033];

  const position = [apiData?.long_mid, apiData?.lat_mid];

  //   const position = [];

  useEffect(() => {
    console.log("apiData map:");
    console.log(apiData);
  }, [apiData]);

  return (
    <div>
      <div className="h-full ">
        <MapContainer center={position} zoom={7}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {apiData?.map_data?.map((data, idx) => (
            <Marker position={[data?.long, data?.lat]} key={idx}>
              <Popup>
                <h1 className="text-base font-semibold mb-2">{data?.state}</h1>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">Zip:</span>
                  <span>{data?.zip}</span>
                </div>
                <div className="flex justify-start gap-2">
                  <span className="font-semibold">Count:</span>
                  <span>{data?.zip_count}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* <div>
        <MapContainer center={position} zoom={4}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city, idx) => (
            <Marker position={[city.lat, city.lon]} key={idx}>
              <Popup>
                <b>{city.name}</b>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div> */}
    </div>
  );
};

export default USMap;
