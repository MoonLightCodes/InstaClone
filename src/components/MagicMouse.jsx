import React, { useLayoutEffect } from "react";

const MagicMouse = () => {
  useLayoutEffect(() => {
    const handleMouseMove = (e) => {
      const dot = document.createElement("div");
      dot.className =
        "w-[2px] h-[2px] pointer-events-none blur-[3px] z-100 bg-red-400 fixed";
      dot.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`;
      document.body.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 500);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
};

export default MagicMouse;
