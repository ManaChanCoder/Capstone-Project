import React from "react";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import Grooming from "../assets/pet-grooming.jpg";

const Hero = () => {
  return (
    <div className="bg-[#fef5ed] w-full px-[40px] py-5 md:flex-row sm:flex-col flex col-span-2 justify-center items-center xl:gap-[300px] sm:gap-5">
      <div className="md:order-1 sm:order-2">
        <h1 className="xl:text-[60px] md:text-4xl sm:text-[48px] uppercase w-[80px] xl:leading-[80px] sm:leading-[60px] text-[#05307a] font-extrabold">
          pet{" "}
          <ReactTyped
            strings={["Grooming", "Services", "Food", "Accessories"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </h1>
        <p className="capitalize text-2xl my-5 font-light text-[#05307a]">
          Petsville Shopping Store
        </p>
        <Link to="/shop">
          <button className="uppercase font-semibold sm:mb-10 rounded-lg px-5 py-3 bg-[#c94238] hover:bg-[#05307a] text-white text-sm cursor-pointer">
            Shop
          </button>
        </Link>
      </div>
      <div className="xl:w-[550px] md:w-[400px] sm:w-[350px] xl:h-[550px] md:h-[400px] sm:h-[350px] rounded-full md:order-2 sm:order-1 sm:mt-14">
        <img
          className="w-full h-full rounded-full bg-transparent"
          src={Grooming}
          alt="groom"
        />
      </div>
    </div>
  );
};

export default Hero;
