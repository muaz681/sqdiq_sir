import axios from "axios";
import React, { useRef } from "react";
import Banner from "../Components/Banner";
import Cards from "../Components/Cards";
import ContactMe from "../Components/ContactMe";
import Loader from "../Components/Extra/Loader";
import ScrollTop from "../Components/Extra/ScrollTop";
import Introduction from "../Components/Introduction";
import PhotosVideos from "../Components/PhotosVideos";
import PoliticalTour from "../Components/PoliticalTour";
import Programs from "../Components/Programs";
import SocialWorks from "../Components/SocialWorks";
import Research from "../Components/Research";
import serverURL from "../URL/serverURL";

export default function Home() {
  const targetContctME = useRef(null);
  const [loader, setLoader] = React.useState(true);
  const [allData, setAlldata] = React.useState({});

  function fetchAboutData() {
    axios.get(serverURL + "api/home/page-data").then(({ data }) => {
      setAlldata(data.data);
      setLoader(false);
    });
  }

  React.useEffect(() => {
    fetchAboutData();
    window.history.scrollRestoration = "manual";
  }, []);

  const scrollToContact = () => {
    targetContctME.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Banner scrollToContact={scrollToContact} />
      <div className="container">
        {/* <Cards allData={allData} /> */}
        <Introduction allData={allData} />
        <Research allData={allData} />
      </div>
      <Programs allData={allData} scrollToContact={scrollToContact} />
      <div className="container">
      <PhotosVideos allData={allData} />
        <PoliticalTour allData={allData} />
        <SocialWorks allData={allData} />
        
        <ContactMe targetContctME={targetContctME} />
      </div>

      {/* ===== SCROLL TOP BUTTON ===== */}
      <ScrollTop />

      {/* ===== LOADER =====*/}
      {loader && <Loader />}
    </>
  );
}
