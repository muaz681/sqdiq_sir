import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Boat from "../Assets/images/Boat.svg";
// import LOGO from "../Assets/images/LOGO.svg";
import serverURL from "../URL/serverURL";

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [appSettings, setAppSettings] = useState({});

  async function fetchAppSettings() {
    try {
      const response = await axios.get(serverURL + "api/application-settings");
      setAppSettings(response.data.data);
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    fetchAppSettings();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, [sticky]);

  const refreshPage = () => {
    window.location.reload(true);
  };

  return (
    <nav id="header" className={sticky ? "sticky" : "header"}>
      <div className="container">
        <div className="logo_container">
          <Link to={"/"}>
            <img
              src={`${serverURL}${appSettings?.app_logo}`}
              alt="Logo"
              onClick={refreshPage}
            />
          </Link>
        </div>
        <div className="boat_area">
          {/* <img src={Boat} alt="Boat" /> */}
        </div>
      </div>
    </nav>
  );
}
