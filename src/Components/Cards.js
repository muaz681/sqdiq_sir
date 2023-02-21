import React, { useState } from "react";
import deshpremik from "../Assets/images/Cards/deshpremik.svg";
import doyalu from "../Assets/images/Cards/doyalu.svg";
import pesadari from "../Assets/images/Cards/pesadari.svg";
import Modal from "./Extra/Modal";

export default function Cards({ allData }) {
  const [showCard, setShowCard] = useState(false);
  const [modalData, setModalData] = useState({});

  const cardInfo = [
    {
      icon: pesadari,
      title: allData?.Card_title_1,
      desc: allData?.Card_description_1,
    },
    {
      icon: deshpremik,
      title: allData?.Card_title_2,
      desc: allData?.Card_description_2,
    },
    {
      icon: doyalu,
      title: allData?.Card_title_3,
      desc: allData?.Card_description_3,
    },
  ];

  const handleCard = (cardData) => {
    setShowCard(true);
    setModalData(cardData);
  };

  return (
    <section id="cards">
      {cardInfo?.map((card, index) => (
        <div
          className="card"
          key={index}
          onClick={() => handleCard(card)}
          data-aos={window.screen.width < 800 ? "" : "flip-up"}
        >
          <img src={card?.icon} alt="icon" />
          <p className="card_text bn">{card?.title}</p>
        </div>
      ))}

      {
        <Modal title={modalData?.title} show={showCard} setClose={setShowCard}>
          <div className="cardModal">
            <p>{modalData?.desc}</p>
          </div>
        </Modal>
      }
    </section>
  );
}
