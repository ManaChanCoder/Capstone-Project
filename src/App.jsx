import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/visit" element={<AboutPage />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
