import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import serverURL from "../URL/serverURL";
// import Modal from "./Extra/Modal";
import ResearchModal from "./Extra/ResearchModal";

export default function PhotosVideos({ allData }) {
  const [dbsImages, setDbsImages] = useState([]);
  // Image Viwer Modal
  const [showCard, setShowCard] = useState(false);
  const [modalData, setModalData] = useState({});

  async function fetchData(path, setData) {
    const res = await axios.get(serverURL + path);
    setData(res.data.data);
  }

  React.useEffect(() => {
    fetchData("api/research", setDbsImages);
  }, []);

  const handleCard = (cardData) => {
    setShowCard(true);
    setModalData(cardData);
  };
  return (
    <section id="photosVideos" className="researchComponent">
      {/* **** SECTION HEADING **** */}
      <div className="section_heading_container">
        <h2 className="section_title Research_title">Research</h2>
        <p className="section_description">{allData?.gallery_description}</p>
      </div>

      {/* =========== CONTENT =========== */}
      <div className="section_content" data-aos="fade-up">
        <div className="research_grid">
          {dbsImages?.slice(0, 3).map((item, index, array) => (
            <div
              className="research_container"
              key={index}
              onClick={() => handleCard(item)}
            >
              <img
                src={serverURL + item.photo}
                alt="Photos"
                // loading="lazy"
                className={`photo${index} `}
              />

              <div className="overlay mask text-light d-flex flex-column text-center">
                <div className="rscr_icon">
                  <i className="zmdi zmdi-tune"></i>
                </div>
                <h4 className="pt-4">{item?.title}</h4>
                <p className="m-0">{item?.description}</p>
                <div className="rscr_arr_icon">
                  <i className="zmdi zmdi-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ********** OTHERS BUTTONS  ********** */}
      <div className="more_btn">
        <Link to={`/research`}>
          <button className="btn">See More</button>
        </Link>
      </div>

      {/* RESEARCH MODAL */}
      <ResearchModal
        title={modalData?.title}
        show={showCard}
        data={modalData}
        setClose={setShowCard}
      >
        <div className="cardModal">
          <p>{modalData?.description}</p>
        </div>
      </ResearchModal>
    </section>
  );
}
