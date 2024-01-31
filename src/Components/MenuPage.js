import { useState, useEffect } from "react";
import { getData } from "../Services/api";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const initialState = [];
  const [menuItems, setMenuItems] = useState(initialState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`pizzas`);
        setMenuItems(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error !== null)
    return (
      <>
        <h2>Menu card</h2>
        <Navbar />
        <p>{error.message}</p>
      </>
    );
  else
    return (
      <>
        <h2>Menu card</h2>
        <Navbar />
        <p>
          Here you can see our menu card full of exciting and delicious options.
          Bon Appétit!
        </p>
        <ul>
          {menuItems.map((menuItem) => (
            <li className="menu-item" key={menuItem.id}>
              <h3>{menuItem.name}</h3>
              <p>{menuItem.description}</p>
              <p>{menuItem.price} kr.</p>
              <button
                className="order-button"
                onClick={() =>
                  navigate("/order", { state: { item: menuItem } })
                }
              >
                Order
              </button>
            </li>
          ))}
        </ul>
      </>
    );
}
