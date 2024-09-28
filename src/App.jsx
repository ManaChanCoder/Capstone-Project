import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/visit" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
