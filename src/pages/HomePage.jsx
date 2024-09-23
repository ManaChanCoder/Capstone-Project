import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import GroomFeedback from "../components/GroomFeedback";
import Product from "../components/Product";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <GroomFeedback />
      <Product />
      <Footer />
    </div>
  );
};

export default HomePage;
