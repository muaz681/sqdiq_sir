import axios from "axios";
import React from "react";
import serverURL from "../URL/serverURL";

export default function SocialWorks({ allData }) {
  const [seminarData, setSeminarData] = React.useState([]);
  const [activeId, setActiveId] = React.useState(1);

  function fetchAboutData() {
    axios.get(serverURL + "api/seminar").then(({ data }) => {
      setSeminarData(data.data);
    });
  }

  React.useEffect(() => {
    fetchAboutData();

    console.log(seminarData);
  }, []);

  return (
    <section id="seminar" className="seminar">
      <div className="container">
        <div
          className="section_text"
          data-aos={window.screen.width < 800 ? "fade-up" : "fade-left"}
        >
          {/* <h2 className="bn">
          {allData?.samajik_kormo_heading
            ? allData?.samajik_kormo_heading
            : "আমার সামাজিক কর্মকান্ড"}
        </h2> */}
          {/* <p>{allData?.samajik_kormo_description}</p> */}
          <div className="section_content">
            <div className="title_area">
              {seminarData.map((item, index) => (
                <button
                  className={`${item?.id === activeId && "activeSeminar"}`}
                  key={item.id}
                  onClick={() => setActiveId(item?.id)}
                >
                  
                  {item?.title}
                </button>
              ))}
            </div>

            <div className="content_container">
              {seminarData.map((item, index) => (
                <div
                  className={`seminar_item ${
                    item.id === activeId && "activeSeminar"
                  }`}
                  key={item.id}
                >
                  <img src={`${serverURL}${item.photo}`} alt="" />
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
