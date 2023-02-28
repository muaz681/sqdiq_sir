import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal({ title, data, children, show, setClose }) {
  useEffect(() => {
    document.body.style.overflowY = show ? "hidden" : "auto";
  });

  return (
    <div
      id="modal"
      style={{ zIndex: show ? 999999 : -999999 }}
      className="reseachModal"
    >
      {show && (
        <>
          <div className="outside" onClick={() => setClose(false)}></div>

          <div className="modal_content" data-aos="zoom-in">
            <div className="modalHeader">
              <h3 className="modalTitle">{title}</h3>

              {/* CLose Btn */}
              <div className="closeBtn" onClick={() => setClose(false)}>
                <AiFillCloseCircle />
              </div>
            </div>

            <div className="child">{children}</div>

            <div className="modalFooter">
              <a
                href={"https://muaz.buildit.com.bd/pdfview/" + data?.id}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                Research Download
              </a>
              <a href={data?.url} target="_blank" rel="noreferrer" className="btn_outline">
                Research Link
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
