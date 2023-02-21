import axios from "axios";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ContactMe from "../Components/ContactMe";
import ImageViewer from "../Components/Extra/ImageViewer";
import Loader from "../Components/Extra/Loader";
import serverURL from "../URL/serverURL";
// Import Lazy Load
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// Fixed Images
import banner1 from "../Assets/images/Banner/Banner_1.jpg";
import banner2 from "../Assets/images/Banner/Banner_2.jpg";
import banner3 from "../Assets/images/Banner/Banner_3.jpg";
import ScrollTop from "../Components/Extra/ScrollTop";
const fixedImages = [banner1, banner2, banner3];

export default function GalleryPage({ allData }) {
  const [btn, setBtn] = useState("photos");
  const [allVideos, setAllVideos] = useState([]);
  const [dbsImages, setDbsImage] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loader, setLoader] = React.useState(true);
  const [embededVideo, setEmbededVideo] = React.useState([]);
  // Image Viwer Modal
  const [viewer, setViewer] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  async function fetchData(path, setData) {
    const res = await axios.get(serverURL + path);
    setData(res.data.data);
    setLoader(false);
  }

  React.useEffect(() => {
    fetchData("api/gallery", setDbsImage);
    fetchData("api/video", setAllVideos);

    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    const olnyImageLink = [];
    dbsImages.forEach((item) => {
      olnyImageLink.push(`${serverURL + item?.photo}`);
    });

    setAllImages([...fixedImages, ...olnyImageLink]);
  }, [dbsImages]);

  function viewImg(photo, index, array) {
    setCurrIndex(index);
    setViewer(true);
  }

  React.useEffect(() => {
    const embededLink = [];

    allVideos?.forEach((item) => {
      let [blank, freshLink] = item?.link.split("https://youtu.be/");
      embededLink.push("https://www.youtube.com/embed/" + freshLink);
    });

    setEmbededVideo(embededLink);
  }, [allVideos]);

  return (
    <section id="photosVideos">
      <div className="container">
        <div className="button-container">
          <Link to="/">
            <button className="btn_arrow">
              <BiArrowBack />
              হোমপেজে ফিরে যান
            </button>
          </Link>
        </div>

        {/* **** SECTION HEADING **** */}
        <div className="section_heading_container">
          <h2 className="section_title">
            {allData?.gallery_heading
              ? allData.gallery_heading
              : "ছবি এবং ভিডিও"}
          </h2>
          <p className="section_description">{allData?.gallery_description}</p>
        </div>

        {/* **** BUTTON BLOCK **** */}
        <div className="btn_block">
          <div
            className={`btn_wrapper ${
              btn === "videos" ? "videoActive" : "photosActive"
            }`}
          >
            <span></span>
            <button className="photosBtn" onClick={() => setBtn("photos")}>
              ছবি
            </button>
            <button className="videosBtn" onClick={() => setBtn("videos")}>
              ভিডিও
            </button>
          </div>
        </div>

        {/* =========== CONTENT =========== */}
        <div className="section_content">
          {btn === "photos" ? (
            <div className="photo_grid">
              {/* **** PHOTO GALLERY **** */}
              {allImages?.map((image, index, array) => (
                <LazyLoadImage
                  key={index}
                  src={image}
                  alt="Photos"
                  loading="lazy"
                  className={`photo${index} `}
                  onClick={() => viewImg(image, index, array)}
                />
              ))}
            </div>
          ) : (
            <div className="video_grid">
              {/* **** VIDEO GALLERY **** */}
              {embededVideo?.map((video, index) => (
                <div className="video_wrapper" key={index}>
                  <iframe
                    src={video}
                    title="YouTube video player"
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <span className="loader_text">Please wait few second...</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==== CONTACT ME ==== */}
        <div style={{ marginTop: 50 }}>
          <ContactMe />
        </div>

        {/* ******** IMAGE VIEWER ******** */}
        <ImageViewer
          title="Image Viwer"
          show={viewer}
          setClose={setViewer}
          currIndex={currIndex}
          setCurrIndex={setCurrIndex}
          maxLegth={dbsImages.length}
        >
          <img src={`${allImages[currIndex]}`} alt="img" />
        </ImageViewer>
      </div>

      {/* ===== SCROLL TOP BUTTON ===== */}
      <ScrollTop />

      {/* ===== LOADER =====*/}
      {loader && <Loader />}
    </section>
  );
}
