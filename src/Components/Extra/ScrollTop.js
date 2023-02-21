import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

export default function ScrollTop() {
  const [scrollNum, setScrollNum] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScrollNum(window.scrollY);
    });
  });

  return scrollNum > 700 ? (
    <div id="scrollTop">
      <button
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      >
        <HiArrowUp />
      </button>
    </div>
  ) : (
    ""
  );
}
