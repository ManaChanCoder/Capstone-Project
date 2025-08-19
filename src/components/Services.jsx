import React from "react";
import Taste from "../assets/image1.png";
import IAMS from "../assets/image2.png";
import RoyalCanin from "../assets/image3.png";
import Brit from "../assets/image4.png";

const Services = () => {
  return (
    <div className="bg-white w-full mt-12">
      <p className="text-4xl font-bold text-center">Product Brand</p>

      <div className="flex flex-row row-span-2 justify-center flex-wrap gap-12 mt-10 ">
        <div className="w-[460px] h-auto text-center">
          <img src={Taste} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Taste of the Wild
          </h4>
          <p>
            Taste of the Wild is a family-owned pet food brand that started as a
            vision from pet owners who wanted to create a quality, affordable
            pet food
          </p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={IAMS} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            IAMS
          </h4>
          <p>
            Starting with the founding of the Iams Company in 1946 by Paul Iams,
            an animal nutritionist who believed in the importance of protein in
            pet food
          </p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={RoyalCanin} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Royal Canin
          </h4>
          <p>
            Royal Canin dog food begins with veterinarian Jean Cathary, who
            believed that nutrition could impact an animal's health
          </p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={Brit} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Brit Care
          </h4>
          <p>
            Brit Care is a brand of pet food developed by the Czech family-owned
            company VAFO, which also produces the Brit, Carnilove, and Lets Bite
            brands
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
