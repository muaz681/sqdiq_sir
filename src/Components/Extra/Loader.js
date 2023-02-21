import React from "react";
import { Bars } from "react-loader-spinner";

export default function Loader() {
  return (
    <div id="loader">
      {/* <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#f48c06"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      /> */}
      <Bars
        height="80"
        width="80"
        color="#f48c06"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
