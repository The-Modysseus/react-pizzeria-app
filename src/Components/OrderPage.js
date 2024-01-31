import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../Services/api";
import { useContext } from "react";
import { CartContext } from "../Components/CartPage";

export default function OrderPage() {
  const location = useLocation();
  const menuItem = location.state.item;
  const initialState = [];
  const [extraItems, setExtraItems] = useState(initialState);
  const [error, setError] = useState(null);
  const [selectedItemAmount, setSelectedItemAmount] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`extras`);
        setExtraItems(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleExtraChange = (id, event) => {
    setSelectedExtras({
      ...selectedExtras,
      [Number(id)]: Number(event.target.value),
    });
  };

  const calculateTotalPrice = () => {
    let total = menuItem.price * selectedItemAmount;

    for (const id in selectedExtras) {
      const extraItem = extraItems.find((item) => item.id === Number(id));
      if (extraItem) {
        total += extraItem.price * selectedExtras[id];
      }
    }

    return total;
  };

  const handleAddToCart = () => {
    const order = {
      item: menuItem,
      amount: selectedItemAmount,
      extras: selectedExtras,
    };
    addToCart(order);
    navigate("/menu");
  };

  function handleCancel() {
    navigate("/menu");
  }

  if (!menuItem) {
    return <div>No item selected</div>;
  }

  if (error !== null)
    return (
      <>
        <h2>Order</h2>
        <p>{error.message}</p>
      </>
    );
  else
    return (
      <div className="Order-page">
        <header className="Order-page-header">
          <h1>Order</h1>
        </header>
        <div className="Order-page-content">
          <h2>{menuItem.name}</h2>
          <p>{menuItem.description}</p>
          <p>Price: {menuItem.price} kr.</p>
          <p>Amount:</p>
          <input
            className="quantity-input"
            type="number"
            min="1"
            value={selectedItemAmount}
            onChange={(e) => setSelectedItemAmount(Number(e.target.value))}
          />
        </div>
        <div className="Order-page-content-extras">
          <h2>Would you like some extras?</h2>
          <ul className="extras-list">
            {extraItems.map((extraItem) => (
              <li key={extraItem.id}>
                <h3>{extraItem.name}</h3>
                <p>{extraItem.description}</p>
                <p>{extraItem.price} kr.</p>
                <p>Amount:</p>
                <input
                  className="quantity-input"
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={(e) => handleExtraChange(extraItem.id, e)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="Order-page-content-total">
          <h2>Total Price: {calculateTotalPrice()} kr.</h2>
        </div>
        <button onClick={handleAddToCart}>Add order</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
}
