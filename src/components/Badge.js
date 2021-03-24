import * as React from "react";
import "../styles.css";

export const Badge = ({ isPicked }) => {
  return (
    <div className={isPicked ? "badge badge-picked" : "badge"}>
      {isPicked ? "Picked" : "Open"}
    </div>
  );
};
