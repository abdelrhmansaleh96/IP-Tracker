import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import NewMarker from "./NewMarker";
import { MdKeyboardArrowRight } from "react-icons/md";

function App() {
  const [lat, setLat] = useState("30");
  const [lng, setLng] = useState("30");
  const [center, setCenter] = useState([30, 30]);
  const [ip, setIp] = useState("8.8.8.8");
  const [city, setCity] = useState("");
  const [vip, setVip] = useState("");
  const [isp, setIsp] = useState("");
  const [timezone, setTimezone] = useState("");
  const ipRef = useRef();

  const inputHandler = () => {
    setIp(ipRef.current.value);
  };

  const submitHandler = async () => {
    console.log(ipRef);
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_XfV2m7AD17oDhBk9J0n0g5QDJcxIy&ipAddress=${ip}`
      );
      const data = await response.json();
      console.log(data);

      setLat(data.location.lat);
      setLng(data.location.lng);
      setCity(data.location.city);
      setTimezone(data.location.timezone);
      setVip(data.ip);
      setIsp(data.isp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    submitHandler();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="header">IP Address Tracker</h2>
        <div className="flex-container">
          <div className="search">
            <input
              onChange={() => {
                inputHandler();
              }}
              ref={ipRef}
              className="input"
              type="search"
              placeholder="Search for any IP Address"
            />
            <button
              type="submit"
              onClick={() => {
                submitHandler();
              }}
            >
              <MdKeyboardArrowRight id="btn1" />
            </button>
          </div>
          <div className="info">
            <div className="sm">
              <h4>IP ADDRESS</h4>
              <h3>{vip}</h3>
            </div>
            <div className="sm">
              <h4>LOCATION</h4>
              <h3>{city}</h3>
            </div>
            <div className="sm">
              <h4>TIME ZONE</h4>
              <h3>{timezone}</h3>
            </div>
            <div className="sm">
              <h4>ISP</h4>
              <h3>{isp}</h3>
            </div>
          </div>
        </div>
      </div>

      <MapContainer
        className="leaflet"
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NewMarker center={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </NewMarker>
      </MapContainer>
    </>
  );
}

export default App;
