import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
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

export default function Programs({ allData }) {
  const [programData, setProgramData] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [previous, setPrevious] = React.useState([]);

  async function fetchProgramData() {
    const res = await axios.get(serverURL + "api/schedule");
    setProgramData(res.data.data);
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

  //
  // console.log(eventDay(previous[0]?.date, "date"));

  return (
    <section id="programs">
      <div className="container">
        <div className="section_text">
          <h2>
            {allData?.program_title
              ? allData?.program_title
              : "Upcoming Events"}
          </h2>
          <p>{allData?.program_description}</p>

          <Link to="/program">
            <button className="btn_outline">
              {allData?.program_btn_text
                ? allData?.program_btn_text
                : "All Schedule"}
            </button>
          </Link>
        </div>

        <div className="program_list_container">
          {/* PREVIOUS EVENTS */}
          {previous?.slice(0, 1).map((program, index) => (
            <div
              className={`programInfo ${
                eventDay(program?.date, "date") === "Today" ? "Today" : ""
              }`}
              key={index}
              data-aos="fade-up"
            >
              <div className="date_area">
                <p>{`${eventDay(program?.date, "date")}`}</p>
                <b>{eventDay(program?.date, "time")}</b>
              </div>
              <p className="program_title">{program?.description}</p>
            </div>
          ))}

          {/* UPCOMING EVENTS */}
          {upcoming?.slice(0, 3).map((program, index) => (
            <div
              className={`programInfo ${eventDay(program?.date, "date")} ${
                eventDay(previous[0]?.date, "date") === "Today"
                  ? ""
                  : index === 0 && "Today"
              }`}
              key={index}
              data-aos="fade-up"
            >
              <div className="date_area">
                <p>{`${eventDay(program?.date, "date")}`}</p>
                <b>{eventDay(program?.date, "time")}</b>
              </div>
              <p className="program_title">{program?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
