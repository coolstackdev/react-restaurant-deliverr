import * as React from "react";
import { useAppState } from "../providers/AppStateProvider";
import { Badge } from "./Badge";
import "../styles.css";

export const ListOrder = () => {
  const {
    appState: { orders },
    setOrders
  } = useAppState();

  const OrderItem = ({ order }) => {
    return (
      <div className="order-item">
        <div>
          <Badge isPicked={order.isPicked} />
        </div>
        <div className="order-id">{order.id}</div>
        <div className="order-content">
          {order.items.map((item, index) => (
            <p key={`sandwich-list-${index}`}>{item.name}</p>
          ))}
        </div>
        <div className="order-price">{order.cost.toFixed(2)}</div>
        <div>
          <button onClick={() => handlePick(order)}>
            {order.isPicked ? "Revert to open" : "Pick up"}
          </button>
        </div>
      </div>
    );
  };

  const handlePick = (order) => {
    const newOrders = orders.map((item) => {
      if (item.id !== order.id) return item;
      return {
        ...item,
        isPicked: !item.isPicked
      };
    });
    setOrders(newOrders);
  };

  return (
    <div className="wrapper">
      <h3>Order List</h3>
      {orders.map((order, index) => (
        <OrderItem key={`order-item-${index}`} order={order} />
      ))}
    </div>
  );
};
