import React, { useEffect, useRef, useState } from "react";
import serverURL from "../URL/serverURL";
import Modal from "./Extra/Modal";

export default function Introduction({ allData }) {
  const [readMore, setReadMore] = useState(false);
  const [article, setArticle] = useState(allData?.about_description);
  const refArticle = useRef(null);

  const showFullArticle = () => setReadMore(true);

  useEffect(() => {
    setTimeout(() => {
      setArticle(refArticle?.current.children[0]?.children[0]?.innerHTML);
    }, 100);
  });

  return (
    <section id="introduction">
      <img
        src={`${serverURL + allData?.about_img}`}
        alt="Introduction_Image"
        data-aos={window.screen.width < 800 ? "" : "flip-right"}
      />
      <div
        className="introduction_text"
        data-aos={window.screen.width < 800 ? "fade-up" : "fade-right"}
      >
        <h2>{allData?.title}</h2>
        <div className="article_wrapper">
          {/* HIDDEN*/}
          <article
            ref={refArticle}
            className=""
            dangerouslySetInnerHTML={{
              __html: allData?.about_description,
            }}
          ></article>

          {/* SHOW */}
          <article
            className="bn"
            dangerouslySetInnerHTML={{
              __html: article,
            }}
          >
            {/* TEXT ARE HERE */}
          </article>
          <div className="buttonContainer">
            <button className="btn btn_readmore" onClick={showFullArticle}>
              See More
            </button>
          </div>
        </div>

        <div className="author">
          <b>
            {allData?.about_name ? allData.about_name : "Professor Sadiq Iqbal"}
          </b>
          <div className="title_wrapper">
            <span>Chairman, Department of Computer Science & Engineering</span>
            {/* <span>Faculty of Science, Engineering Technology</span> */}
            <span>Bangladesh University</span>
          </div>
        </div>
      </div>

      {/* ****** ABOUT MODAL ****** */}
      <Modal title="About Me" show={readMore} setClose={setReadMore}>
        <div className="aboutModal">
          <article
            className="bn"
            dangerouslySetInnerHTML={{
              __html: allData?.about_description,
            }}
          ></article>

          <div className="author">
            <b>
              {allData.about_name
                ? allData.about_name
                : "Professor Sadiq Iqbal"}
            </b>
            <div className="title_wrapper">
            <span>Chairman, Department of Computer Science & Engineering</span>
            {/* <span>Faculty of Science, Engineering Technology</span> */}
            <span>Bangladesh University</span>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
