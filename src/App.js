import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setBaseUrl } from "./Services/api";
import HomePage from "./Components/HomePage";
import MenuPage from "./Components/MenuPage";
import OrderPage from "./Components/OrderPage";
import UnknownPage from "./Components/UnknownPage";
import CartPage from "./Components/CartPage";
import { CartProvider } from "./Components/CartPage";

function App() {
  setBaseUrl("http://localhost:3000");

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
