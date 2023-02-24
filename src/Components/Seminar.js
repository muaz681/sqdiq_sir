import axios from "axios";
import React from "react";
import serverURL from "../URL/serverURL";

export default function SocialWorks({ allData }) {
  const [seminarData, setSeminarData] = React.useState([]);
  const [activeId, setActiveId] = React.useState(1);

  function fetchAboutData() {
    axios.get(serverURL + "api/seminar").then(({ data }) => {
      setSeminarData(data.data);
      setActiveId(data.data[0].id);
    });
  }

  React.useEffect(() => {
    fetchAboutData();
  }, []);

  React.useEffect(() => {
    // if (seminarData[0].id) {
    // setActiveId(seminarData[0].id);
    // }
  }, [seminarData]);

  return (
    <section id="seminar" className="seminar">
      <div className="container">
        <div
          className="section_text"
          data-aos={window.screen.width < 800 ? "fade-up" : "fade-left"}
        >
          <div className="section_content">
            <div className="title_area">
              {seminarData?.map((item, index) => (
                <button
                  className={`${item?.id === activeId && "activeSeminar"}`}
                  key={item.id}
                  onClick={() => setActiveId(item?.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 432 408"><path fill="currentColor" d="M384 88q18 0 30.5 12.5T427 131v234q0 18-12.5 30.5T384 408H43q-18 0-30.5-12.5T0 365V131q0-18 12.5-30.5T43 88h64V45q0-17 12.5-29.5T149 3h128q18 0 30.5 12.5T320 45v43h64zM149 45v43h128V45H149zm235 320v-42H43v42h341zm0-106V131h-64v42h-43v-42H149v42h-42v-42H43v128h341z"/></svg>
                  {item?.title}
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 160 384"><path fill="currentColor" d="m30 64l128 128L30 320L0 290l98-98L0 94z"/></svg>
                </button>
              ))}
            </div>

            <div className="content_container">
              {seminarData.map((item, index) => (
                <div
                  className={`seminar_item ${
                    item?.id === activeId && "activeSeminar"
                  }`}
                  key={item.id ?? index}
                >
                  <img src={`${serverURL}${item?.photo}`} alt="" />
                  <p>{item?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
