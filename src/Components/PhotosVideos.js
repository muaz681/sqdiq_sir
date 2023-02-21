import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import serverURL from "../URL/serverURL";
import ImageViewer from "./Extra/ImageViewer";
// Fixed Images
import banner1 from "../Assets/images/Banner/Banner_1.jpg";
import banner2 from "../Assets/images/Banner/Banner_2.jpg";
import banner3 from "../Assets/images/Banner/Banner_3.jpg";

const fixedImages = [banner1, banner2, banner3];

export default function PhotosVideos({ allData }) {
  const [btn, setBtn] = useState("photos");
  const [allVideos, setAllVideos] = useState([]);
  const [dbsImages, setDbsImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [embededVideo, setEmbededVideo] = React.useState([]);
  // Image Viwer Modal
  const [viewer, setViewer] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  async function fetchData(path, setData) {
    const res = await axios.get(serverURL + path);
    setData(res.data.data);
  }

  React.useEffect(() => {
    fetchData("api/gallery", setDbsImages);
    fetchData("api/video", setAllVideos);
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
      {/* **** SECTION HEADING **** */}
      <div className="section_heading_container">
        <h2 className="section_title">
          {allData?.gallery_heading ? allData.gallery_heading : "ছবি এবং ভিডিও"}
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
      <div className="section_content" data-aos="fade-up">
        {btn === "photos" ? (
          <div className="photo_grid">
            {/* **** PHOTO GALLERY **** */}
            {allImages?.slice(0, 12).map((image, index, array) => (
              <img
                key={index}
                src={image}
                alt="Photos"
                // loading="lazy"
                className={`photo${index} `}
                onClick={() => viewImg(image, index, array)}
                data-aos={window.screen.width < 800 ? "fade-up" : "flip-left"}
              />
            ))}
          </div>
        ) : (
          <div className="video_grid" data-aos="fade-up">
            {/* **** VIDEO GALLERY **** */}
            {embededVideo?.slice(0, 6).map((video, index) => (
              <div className="video_wrapper" key={index} data-aos="fade-up">
                <iframe
                  src={video}
                  title="YouTube video player"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <span className="loader_text">Please wait few second...</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ********** OTHERS BUTTONS  ********** */}
      <div className="more_btn">
        <Link to={`/gallery`}>
          <button className="btn">আরো দেখুন</button>
        </Link>
      </div>

      {/* ******** IMAGE VIEWER ******** */}
      <ImageViewer
        title="Image Viwer"
        show={viewer}
        setClose={setViewer}
        currIndex={currIndex}
        setCurrIndex={setCurrIndex}
        maxLegth={allImages.length}
      >
        <img src={`${allImages[currIndex]}`} alt="img" />
      </ImageViewer>
    </section>
  );
}
