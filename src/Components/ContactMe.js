import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { ImMobile } from "react-icons/im";
import serverURL from "../URL/serverURL";
import { errorAlert, successAlert } from "./Extra/Alert";

export default function ContactMe({ targetContctME }) {
  const [mail, setMail] = useState({ name: "", email: "", message: "" });
  const [appSettings, setAppSettings] = useState({});
  const [hold, setHold] = useState(false);
  const [error, setError] = useState(false);

  function PostData() {
    axios
      .post(serverURL + "api/apply-people", {
        name: mail.name,
        email: mail.email,
        msg: mail.message,
      })
      .then((response) => {
        if (response.status === 200) {
          successAlert();

          // CLEAR STATE
          setMail({ name: "", email: "", message: "" });
        } else {
          errorAlert();
        }
      });
  }

  function checkErrors(data) {
    const { name, email, message } = data;

    if (name === "" || email === "" || message === "") {
      setError(true);
      errorAlert();
    } else {
      setError(false);

      // POST API
      PostData();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setHold(true);

    // Form validation
    checkErrors(mail);

    setTimeout(() => {
      setHold(false);
    }, 3000);
  }

  function handleChange(e) {
    setMail({
      ...mail,
      [e.target.name]: e.target.value,
    });
  }

  async function fetchAppSettings() {
    try {
      const response = await axios.get(serverURL + "api/application-settings");
      setAppSettings(response.data.data);
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    fetchAppSettings();
  }, []);

  return (
    <section id="contactMe" ref={targetContctME}>
      <div className="section_heading_container">
        <h2 className="section_title">
          {appSettings?.contact_title
            ? appSettings?.contact_title
            : "যোগাযোগ করুন"}
        </h2>
        <p className="section_description">
          {appSettings?.contact_description}
        </p>
      </div>

      <div className="section_content">
        {/* FORM */}
        <form
          action="#"
          method="post"
          onSubmit={handleSubmit}
          className={error ? "error" : "validForm"}
          // data-aos="fade-right"
        >
          <h6>যোগাযোগ</h6>

          <input
            type="text"
            placeholder="নাম"
            name="name"
            value={mail.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="ইমেল"
            name="email"
            value={mail.email}
            onChange={handleChange}
          />
          <textarea
            placeholder="মেসেজ লিখুন"
            name="message"
            value={mail.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" disabled={hold} className="btn">
            পাঠিয়ে দিন
          </button>
        </form>

        {/* CONTACT ADDRESS */}
        <div className="contacts_area">
          <div className="contact_options">
            <div className="contact">
              <span className="icon">
                <GoLocation />
              </span>
              <span className="text">
                {appSettings?.app_address
                  ? appSettings.app_address
                  : "Not Available"}
              </span>
            </div>
            <div className="contact">
              <span className="icon">
                <ImMobile />
              </span>
              <span className="text">
                {appSettings?.app_phone
                  ? appSettings.app_phone
                  : "Not Available"}
              </span>
            </div>
            <div className="contact">
              <span className="icon">
                <AiOutlineMail />
              </span>
              <span className="text">
                {appSettings?.app_email
                  ? appSettings.app_email
                  : "Not Available"}
              </span>
            </div>
          </div>

          {/* Map */}
          <div
            className="map_wrapper"
            // data-aos="fade-up"
            // data-aos-delay="100"
            // data-aos-offset="200"
          >
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=natore&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
          </div>

          {/* Social Media Links */}
          <div
            className="social_links"
            // data-aos={window.screen.width < 800 ? "" : "fade-left"}
            // data-aos-delay="300"
          >
            <a href={appSettings?.app_twitter} target="_blank" rel="noreferrer">
              <AiOutlineTwitter />
            </a>
            <a href={appSettings?.app_fb} target="_blank" rel="noreferrer">
              <AiFillFacebook />
            </a>
            <a href={appSettings?.app_linkdin} target="_blank" rel="noreferrer">
              <AiFillLinkedin />
            </a>
            <a
              href={appSettings?.app_instagram}
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineInstagram />
            </a>
            <a href={appSettings?.app_youtube} target="_blank" rel="noreferrer">
              <AiFillYoutube />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
