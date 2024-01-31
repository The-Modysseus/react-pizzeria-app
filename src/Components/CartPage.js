import React, { createContext, useState, useContext, useEffect } from "react";
import { Navbar } from "./Navbar";
import { postData } from "../Services/api";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((i) => i !== item));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const initialState = {
    customer: "",
    address: "",
    phone: "",
    email: "",
    items: [],
    total: 0,
  };
  const [order, setOrder] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);

  function handleInputChange(event) {
    const name = event.target.name;

    setOrder((state) => {
      return {
        ...state,
        [name]: event.target.value,
        items: [...state.items, ...cart],
      };
    });
  }

  async function sendData() {
    try {
      const newOrder = {
        ...order,
        items: cart.map((item) => ({
          ...item,
          extra: item.extra,
        })),
        total: totalPrice,
      };

      await postData("orders", newOrder);
      setOrder(initialState);
      clearCart();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendData();
    navigate("/");
  }

  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      total += item.item.price * item.amount;
    }
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      <h1>Your Cart</h1>
      <Navbar />
      {cart.map((item, index) => (
        <div key={index}>
          <h2>{item.item.name}</h2>
          <p>Amount: {item.amount}</p>
          <p>Price: {item.item.price}</p>
          {item.extras &&
            Object.entries(item.extras).map(([key, value], i) => (
              <p key={i}>
                {key}: {value}
              </p>
            ))}
          {item.extraItems &&
            item.extraItems.map((extraItem, i) => (
              <p key={i}>Extra: {extraItem.name}</p>
            ))}
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
      <h2>Total Price: {totalPrice}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer:
          <input
            type="text"
            name="customer"
            value={order.customer}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{8}"
            value={order.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Make order" />
      </form>
    </div>
  );
}
