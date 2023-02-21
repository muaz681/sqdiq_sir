import React from "react";

export default function SocialWorks({ allData }) {
  const [embededVideo, setEmbededVideo] = React.useState("");

  React.useEffect(() => {
    let string = allData?.samajik_kormo_link ? allData?.samajik_kormo_link : "";

    let [blank, freshLink] = string?.split("https://youtu.be/");
    setEmbededVideo("https://www.youtube.com/embed/" + freshLink);
  }, [allData]);

  return (
    <section id="social_works">
      <div
        className="section_text"
        data-aos={window.screen.width < 800 ? "fade-up" : "fade-left"}
      >
        <h2 className="bn">
          {allData?.samajik_kormo_heading
            ? allData?.samajik_kormo_heading
            : "আমার সামাজিক কর্মকান্ড"}
        </h2>
        <p>{allData?.samajik_kormo_description}</p>
      </div>

      <div
        className="video_area"
        data-aos={window.screen.width < 800 ? "flip-right" : "fade-right"}
      >
        <iframe
          // src={allData?.samajik_kormo_link}
          src={embededVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
