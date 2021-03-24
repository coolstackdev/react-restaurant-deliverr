import * as React from "react";
import "../styles.css";

export const Header = ({ goOrderCreate, goOrderList }) => {
  return (
    <div className="header">
      <p className="link" onClick={goOrderCreate}>
        Create order
      </p>
      <p className="link" onClick={goOrderList}>
        List orders
      </p>
    </div>
  );
};
