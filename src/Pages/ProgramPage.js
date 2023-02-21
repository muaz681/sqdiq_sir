import axios from "axios";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import ContactMe from "../Components/ContactMe";
import Loader from "../Components/Extra/Loader";
import ScrollTop from "../Components/Extra/ScrollTop";
import serverURL from "../URL/serverURL";
const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ProgramPage() {
  // const [btn, setBtn] = useState("photos");
  const [loader, setLoader] = React.useState(true);

  const [programData, setProgramData] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [previous, setPrevious] = React.useState([]);

  async function fetchProgramData() {
    const res = await axios.get(serverURL + "api/schedule");
    setProgramData(res.data.data);
    setLoader(false);
  }

  // EVENT DATE AND TIME HANDLING
  const now = new Date();
  const eventDay = (str, dateOrTime) => {
    const strDate = new Date(str);

    const date = strDate.getDate();
    const month = strDate.getMonth();
    const dateAndMonth = `${date < 10 ? "0" + date : date} ${monthList[month]}`;
    const isToday = strDate.toLocaleDateString() === now.toLocaleDateString();

    const hour =
      strDate.getHours() < 12 ? strDate.getHours() : strDate.getHours() - 12;
    const min =
      strDate.getMinutes() < 10
        ? "0" + strDate.getMinutes()
        : strDate.getMinutes();

    // RETURNING DATA
    const returnTime = `${hour < 10 ? "0" + hour : hour} : ${min} ${
      strDate.getHours() < 12 ? "AM" : "PM"
    }`;
    const returnDate = isToday ? "Today" : dateAndMonth;

    return dateOrTime === "date" ? returnDate : returnTime;
  };

  React.useEffect(() => {
    fetchProgramData();
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    const previousPrograms = [];
    const upcomingPrograms = [];

    programData.forEach((item) => {
      let programDate = new Date(item.date);

      programDate < now
        ? previousPrograms.push(item)
        : upcomingPrograms.push(item);
    });

    setUpcoming(
      upcomingPrograms?.sort((a, b) => new Date(a.date) - new Date(b.date))
    );
    setPrevious(
      previousPrograms
        ?.sort((a, b) => new Date(a.date) - new Date(b.date))
        .reverse()
    );
  }, [programData]);

  return (
    <section id="programs">
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

        {/* **** BUTTON BLOCK **** */}
        {/* <div className="btn_block">
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
        </div> */}

        {/* =========== CONTENT =========== */}
        <div className="program_list_container">
          {/* PREVIOUS EVENTS */}
          {eventDay(previous[0]?.date, "date") === "Today" &&
            previous?.slice(0, 1).map((program, index) => (
              <div
                className={`programInfo ${eventDay(program?.date, "date")}`}
                key={index}
                // data-aos="fade-up"
              >
                <div className="date_area">
                  <p>{`${eventDay(program?.date, "date")}`}</p>
                  <b>{eventDay(program?.date, "time")}</b>
                </div>
                <p className="program_title">{program?.description}</p>
              </div>
            ))}

          {/* UPCOMING EVENTS */}
          {upcoming?.map((program, index) => (
            <div
              className={`programInfo ${eventDay(program?.date, "date")} ${
                eventDay(previous[0]?.date, "date") === "Today"
                  ? ""
                  : index === 0 && "Today"
              }`}
              key={index}
              // data-aos={index > 4 && "fade-up"}
            >
              <div className="date_area">
                <p>{`${eventDay(program?.date, "date")}`}</p>
                <b>{eventDay(program?.date, "time")}</b>
              </div>
              <p className="program_title">{program?.description}</p>
            </div>
          ))}
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
    </section>
  );
}
