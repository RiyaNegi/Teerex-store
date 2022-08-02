import App from "../App";
import "../App.css";
import CartPage from "../components/Cart/Index";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const RouteIndex = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/Teerex-store" element={<App />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Toaster
        gutter={1}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default RouteIndex;
