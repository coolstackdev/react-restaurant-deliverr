import React, { useState } from "react";
import { inventory, menu } from "../data.json";
import { useAppState } from "../providers/AppStateProvider";
import "../styles.css";

export const CreateOrder = () => {
  const { addOrder, setError } = useAppState();
  const [order, setOrder] = useState([]);
  const [ingredients, setIngredients] = useState(inventory);
  const [totalCost, setTotalCost] = useState(0);

  const SandwichList = () => {
    return (
      <div>
        <h3>Sandwich List</h3>
        {menu.map((item, index) => {
          return (
            <div key={`sandwich-${index}`} className="sandwich-item">
              <div className="item-name">{item.name}</div>
              <div className="item-price">{item.price}</div>
              <div className="item-btn">
                <button onClick={() => addToOrder(item)}>Add to Order</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const addToOrder = (item) => {
    const newIngredients = { ...ingredients };
    // check if selected sandwich ingredients are available
    let isAvailable = true;
    Object.keys(item.ingredients).forEach((key) => {
      newIngredients[key] = newIngredients[key] - item.ingredients[key];
      if (newIngredients[key] < 0) {
        isAvailable = false;
      }
    });

    // show alert if not available
    if (!isAvailable) {
      setError({
        status: "warning",
        msg: "Out of ingredients."
      });
      return;
    }

    // add this sandwich to order
    setOrder([...order, item]);

    // renew ingredients after this order
    setIngredients(newIngredients);

    // calculate totalCost
    setTotalCost(totalCost + item.price);
  };

  const OrderList = () => {
    return (
      <div>
        <h3>Order Items</h3>
        {order.map((item, index) => {
          return (
            <div key={`order-${index}`} className="sandwich-item">
              <div className="item-name">{item.name}</div>
              <div className="item-price">{item.price}</div>
              <div className="item-btn">
                <button onClick={() => removeFromOrder(index)}>x</button>
              </div>
            </div>
          );
        })}
        <h5>Total Price: {Math.abs(totalCost.toFixed(2))}</h5>
      </div>
    );
  };

  const removeFromOrder = (index) => {
    const newIngredients = { ...ingredients };
    const selectedSandwich = order[index];
    // update ingredients after remove this sandwich from order
    Object.keys(selectedSandwich.ingredients).forEach((key) => {
      newIngredients[key] =
        newIngredients[key] + selectedSandwich.ingredients[key];
    });

    // update order
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);

    // renew ingredients after this order
    setIngredients(newIngredients);

    // calculate totalCost
    setTotalCost(totalCost - selectedSandwich.price);
  };

  const createOrder = () => {
    const id = new Date().valueOf();
    const orderItem = {
      id,
      items: order,
      cost: totalCost,
      isPicked: false
    };
    // add order to app state
    addOrder(orderItem);

    // reset current selected items
    setOrder([]);
    setTotalCost(0);

    setError({
      status: "success",
      msg: "New order is created"
    });
  };

  return (
    <div className="create-order">
      <SandwichList />
      <OrderList />
      <button disabled={totalCost <= 0} onClick={createOrder}>
        Create
      </button>
    </div>
  );
};
