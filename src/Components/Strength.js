import React from "react";
import serverURL from "../URL/serverURL";

export default function Strength({ allData }) {
  const strengthInfo = [
    {
      title: allData?.amar_title_one,
      desc: allData?.amar_title_one_des,
      number: "০১",
    },
    {
      title: allData?.amar_title_two,
      desc: allData?.amar_title_two_des,
      number: "০২",
    },
    {
      title: allData?.amar_title_three,
      desc: allData?.amar_title_three_des,
      number: "০৩",
    },
    {
      title: allData?.amar_title_four,
      desc: allData?.amar_title_four_des,
      number: "০৪",
    },
    {
      title: allData?.amar_title_five,
      desc: allData?.amar_title_five_des,
      number: "০৫",
    },
    {
      title: allData?.amar_title_six,
      desc: allData?.amar_title_six_des,
      number: "০৬",
    },
  ];

  return (
    <section id="strength">
      <div className="section_heading_container">
        <h2 className="section_title">আমার শক্তি</h2>
        <p className="section_description">{allData?.amar_description}</p>
      </div>

      <div className="section_content">
        <div className="img_area">
          <img
            src={`${serverURL + allData?.amar_img}`}
            alt="strengthImg"
            data-aos={window.screen.width < 800 ? "flip-right" : ""}
          />
        </div>

        <div className="strength_Info_container">
          {strengthInfo.map((strg, index) => (
            <div
              className="strength_Info"
              key={index + 1}
              data-aos={
                window.screen.width < 800
                  ? "fade-up"
                  : index % 2 === 1
                  ? "fade-right"
                  : "fade-left"
              }
            >
              <b className="numbering bn">{strg.number}</b>
              <div className="strength_text">
                <h5 className="bn">{strg?.title}</h5>
                <p>{strg?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
