import axios from "axios";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ContactMe from "../Components/ContactMe";
import Loader from "../Components/Extra/Loader";
import ResearchModal from "../Components/Extra/ResearchModal";
import ScrollTop from "../Components/Extra/ScrollTop";
import serverURL from "../URL/serverURL";

export default function ProgramPage() {
  // const [btn, setBtn] = useState("photos");
  const [loader, setLoader] = React.useState(true);
  const [researchData, setResearchData] = React.useState([]);
  // Image Viwer Modal
  const [showCard, setShowCard] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  async function fetchData(path, setData) {
    const res = await axios.get(serverURL + path);
    setData(res.data.data);
  }

  React.useEffect(() => {
    fetchData("api/research", setResearchData);
    setLoader(false);
  }, []);

  const handleCard = (cardData) => {
    setShowCard(true);
    setModalData(cardData);
  };
  return (
    <section id="researchPage" className="researchPage">
      <div className="container" style={{ display: "block" }}>
        <div
          className="button-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link to="/">
            <button className="btn_arrow">
              <BiArrowBack />
              হোমপেজে ফিরে যান
            </button>
          </Link>
        </div>

        {/* **** SECTION HEADING **** */}
        <div className="section_heading_container" style={{ marginBottom: 30 }}>
          <h2 className="section_title">আমার আসন্ন প্রোগ্রামসমুহ</h2>
        </div>

        {/* =========== CONTENT =========== */}
        <div className="section_content">
          <div className="research_grid">
            {researchData?.map((item, index, array) => (
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
                  // onClick={() => viewImg(serverURL + item.photo, index, array)}
                  // data-aos={window.screen.width < 800 ? "fade-up" : "flip-left"}
                />

                <div className="overlay mask text-light d-flex flex-column text-center">
                  <div className="rscr_icon">
                    <i className="zmdi zmdi-tune"></i>
                  </div>
                  <h4 className="pt-4">{item.title}</h4>
                  <p className="m-0">{item.description}</p>
                  <div className="rscr_arr_icon">
                    <i className="zmdi zmdi-arrow-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==== CONTACT ME ==== */}
      </div>
      <div style={{ width: "100%", background: "#fff" }}>
        <div className="container" style={{ padding: "40px 0" }}>
          <ContactMe />
        </div>
      </div>

      {/* ===== SCROLL TOP BUTTON ===== */}
      <ScrollTop />

      {/* ===== LOADER =====*/}
      {loader && <Loader />}

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
