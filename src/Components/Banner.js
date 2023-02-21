import axios from "axios";
import React, { useEffect, useState } from "react";
import serverURL from "../URL/serverURL";
import Loader from "./Extra/Loader";

// Import Swiper React components
import { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner({ scrollToContact }) {
  const [loader, setLoader] = React.useState(true);
  const [bannerData, setbannerData] = useState([]);
  const [currText, setCurrText] = useState(0);

  useEffect(() => {
    axios.get(serverURL + "api/banners").then(({ data }) => {
      setbannerData(data.data);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrText((prev) => {
        if (currText >= bannerData.length - 1) {
          return (prev = 0);
        } else {
          return prev + 1;
        }
      });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section id="banner">
      {/* SLIDER */}
      <div className="slider_container">
        <Swiper
          modules={[Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {bannerData?.map((item, key) => (
            <SwiperSlide key={key}>
              <img
                src={serverURL + item.photo}
                alt="banner-img"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        {/* BANNER HEADING TEXT WITH BUTTON */}
        <div className="banner_heading">

          {bannerData?.map((item, index) => (
            <div
              className={`heading_wrapper ${index}`}
              key={index}
              style={{ opacity: currText === index ? 1 : 0 }}
            >
              <h1>{item?.banner_description}</h1>
              <p>
              Chairman, Department of Computer Science &amp; Engineering
              <br/>
              <span>Faculty</span> of Science, Engineering Technology
              <br/>
              <a href="https://bu.edu.bd/" target="_blank">Bangladesh University</a>

              </p>

              {/* <button className="btn" onClick={scrollToContact}>
                যোগাযোগ করুন
              </button> */}
            </div>
          ))}
        </div>
      </div>

      {/* ===== LOADER =====*/}
      {loader && <Loader />}
    </section>
  );
}
