import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import serverURL from "../URL/serverURL";
// import Modal from "./Extra/Modal";

export default function PhotosVideos({ allData }) {
  const [btn, setBtn] = useState("photos");
  const [allVideos, setAllVideos] = useState([]);
  const [dbsImages, setDbsImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [allTitle, setallTitle] = useState([]);
  const [embededVideo, setEmbededVideo] = React.useState([]);
  // Image Viwer Modal
  const [viewer, setViewer] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
//   const refArticle = useRef(null);

//   const showFullArticle = () => setReadMore(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setArticle(refArticle?.current.children[0]?.children[0]?.innerHTML);
//     }, 0);
//   });

  async function fetchData(path, setData) {
    const res = await axios.get(serverURL + path);
    setData(res.data.data);
  }

  React.useEffect(() => {
    fetchData("api/research", setDbsImages);
    console.log(dbsImages);
  }, []);

  React.useEffect(() => {
    const olnyImageLink = [];
    dbsImages.forEach((item) => {
      olnyImageLink.push(`${serverURL + item?.photo}`);
    });

    setAllImages([ ...olnyImageLink]);
  }, [dbsImages]);

  function viewImg(photo, index, array) {
    setCurrIndex(index);
    setViewer(true);
  }

  return (
    <section id="photosVideos">
      {/* **** SECTION HEADING **** */}
      <div className="section_heading_container">
        <h2 className="section_title">
            Research
        </h2>
        <p className="section_description">{allData?.gallery_description}</p>
      </div>

      
      {/* =========== CONTENT =========== */}
      <div className="section_content" data-aos="fade-up">
          <div className="photo_grid">
            {allImages?.slice(0, 3).map((image, index, array) => (
              <div> 
                <img
                key={index}
                src={image}
                alt="Photos"
                // loading="lazy"
                className={`photo${index} `}
                onClick={() => viewImg(image, index, array)}
                data-aos={window.screen.width < 800 ? "fade-up" : "flip-left"}
              />

            <div class="mask text-light d-flex flex-column text-center">
              <div class="rscr_icon">
              <i class="zmdi zmdi-tune"></i>
              </div>
              <h4 class="pt-4">{"Heead"}</h4>
              <p class="m-0">Hshashd</p>
              <div class="rscr_arr_icon">
              <i class="zmdi zmdi-arrow-right"></i>
              </div>
            </div>
        </div>
            ))}

          </div>
          
      </div>

      {/* ********** OTHERS BUTTONS  ********** */}
      <div className="more_btn">
        <Link to={`/gallery`}>
          <button className="btn">আরো দেখুন</button>
        </Link>
      </div>

      
    </section>
  );
}
