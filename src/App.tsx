import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BecomeSeller from "./pages/BecomeSeller";
import Navbar from "./components/navbar"; // Corrected import
import Profile from "./pages/Profile";
import AIPortal from "./pages/AIPortal";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/products/:categoryName" element={<ProductListPage />} />
        <Route
          path="/products/singleproduct/:_id"
          element={<ProductDetailsPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/AIPortal" element={<AIPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/becomeSeller" element={<BecomeSeller />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
