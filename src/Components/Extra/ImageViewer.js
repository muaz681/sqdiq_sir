import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function ImageViewer({
  title,
  show,
  setClose,
  children,
  currIndex,
  setCurrIndex,
  maxLegth,
}) {
  useEffect(() => {
    document.body.style.overflowY = show ? "hidden" : "auto";
  });

  const leftArrow = () => {
    if (currIndex === 0) {
      setCurrIndex(maxLegth - 1);
    } else {
      setCurrIndex(currIndex - 1);
    }
  };
  const rightArrow = () => {
    if (currIndex >= maxLegth - 1) {
      setCurrIndex(0);
    } else {
      console.log("high " + currIndex);
      setCurrIndex(currIndex + 1);
    }
  };

  return (
    <div id="imageViewer" style={{ zIndex: show ? 999999 : -999999 }}>
      {show && (
        <>
          <div className="outside" onClick={() => setClose(false)}></div>
          <div className="modal_content">
            <div className="modalHeader">
              {/* <h3 className="modalTitle">{title}</h3> */}
              {/* CLose Btn */}
              <div className="closeBtn" onClick={() => setClose(false)}>
                <AiFillCloseCircle />
              </div>
            </div>

            <div className="button_container">
              <button className="arrow left" onClick={leftArrow}>
                <MdArrowBackIosNew />
              </button>
              <button className="arrow right" onClick={rightArrow}>
                <MdArrowForwardIos />
              </button>
            </div>

            <div className="child">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
