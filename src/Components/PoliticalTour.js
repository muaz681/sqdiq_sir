import React from "react";
import serverURL from "../URL/serverURL";

export default function PoliticalTour({ allData }) {
  const PoliticalTourInfo = [
    {
      season: allData?.rajniti_date_one,
      title: allData?.rajniti_title_one,
      desc: allData?.rajniti_one_des,
      image: `${serverURL + allData?.rajniti_img_one}`,
    },
    {
      season: allData?.rajniti_date_two,
      title: allData?.rajniti_title_two,
      desc: allData?.rajniti_two_des,
      image: `${serverURL + allData?.rajniti_img_two}`,
    },
    {
      season: allData?.rajniti_date_three,
      title: allData?.rajniti_title_three,
      desc: allData?.rajniti_three_des,
      image: `${serverURL + allData?.rajniti_img_three}`,
    },
    {
      season: allData?.rajniti_date_four,
      title: allData?.rajniti_title_four,
      desc: allData?.rajniti_four_des,
      image: `${serverURL + allData?.rajniti_img_four}`,
    },
    {
      season: allData?.rajniti_date_five,
      title: allData?.rajniti_title_five,
      desc: allData?.rajniti_five_des,
      image: `${serverURL + allData?.rajniti_img_five}`,
    },
    {
      season: allData?.rajniti_date_six,
      title: allData?.rajniti_title_six,
      desc: allData?.rajniti_six_des,
      image: `${serverURL + allData?.rajniti_img_six}`,
    },
  ];

  return (
    <section id="political_tour">
      <div className="section_heading_container">
        <h2 className="section_title">
          {allData?.rajniti_heading
            ? allData?.rajniti_heading
            : "My Achivements"}
        </h2>
        <p className="section_description">{allData?.rajniti_description}</p>
      </div>

      <div className="section_content">
        <div className="political_tour_info_container">
          <div className="middle_line">{/* Middle Line */}</div>

          {PoliticalTourInfo?.map((info, index) => (
            <div
              className={`political_tour_info ${index % 2 === 1 && "reverse"}`}
              key={index}
              data-aos={
                index % 2 === 0
                  ? window.screen.width < 800
                    ? "fade-up"
                    : "fade-right"
                  : window.screen.width < 800
                  ? "fade-up"
                  : "fade-left"
              }
            >
              <div className="info_area">
                <div className="text_area bn">
                  <h6>{info?.title}</h6>
                  <p>{info?.desc}</p>
                </div>
                <img src={info?.image} alt="img" loading="lazy" />
              </div>

              <div className="mid_icon">{/* Middle Point */}</div>

              <div className="season bn">{info?.season}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
