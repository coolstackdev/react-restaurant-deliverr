import React, { useState } from "react";
import { Header, CreateOrder, ListOrder } from "../components";
import "../styles.css";

export default function Home() {
  const [route, setRoute] = useState("create");

  const goOrderCreate = () => {
    setRoute("create");
  };

  const goOrderList = () => {
    setRoute("list");
  };

  return (
    <div>
      <Header goOrderCreate={goOrderCreate} goOrderList={goOrderList} />
      <div className="wrapper">
        {route === "create" && <CreateOrder />}
        {route === "list" && <ListOrder />}
      </div>
    </div>
  );
}
