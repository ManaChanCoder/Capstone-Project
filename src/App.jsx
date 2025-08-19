import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ShopLayout from "./components/layout/ShopLayout";
import LoginLayout from "./components/layout/LoginLayout";
import DogFoodCartsPage from "./pages/DogFoodCartsPage";
import CatFoodCartsPage from "./pages/CatFoodCartsPage";
import ShopMainPage from "./pages/ShopMainPage";
import Cart from "./pages/Cart";
import DogToyPage from "./pages/DogToyPage";
import CatToyPage from "./pages/CatToyPage";
import SuppliesPage from "./pages/SuppliesPage";
import CollarPage from "./pages/CollarPage";
import Profile from "./pages/Profile";
import Order from "./pages/Order";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route element={<ShopLayout />}>
        <Route path="/shop" element={<ShopMainPage />} />
        <Route path="/shop/dog-food" element={<DogFoodCartsPage />} />
        <Route path="/shop/cat-food" element={<CatFoodCartsPage />} />
        <Route path="/shop/dog-toy" element={<DogToyPage />} />
        <Route path="/shop/cat-toy" element={<CatToyPage />} />
        <Route path="/shop/supplies" element={<SuppliesPage />} />
        <Route path="/shop/collar" element={<CollarPage />} />
        <Route path="/shop/profile" element={<Profile />} />
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/order" element={<Order />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
