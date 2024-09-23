import React from "react";
import Groom1 from "../assets/grooming-dog-1.png";
import Groom2 from "../assets/grooming-dog-2.png";
import Groom3 from "../assets/grooming-dog-3.png";
import Groom4 from "../assets/grooming-dog-4.png";

const Services = () => {
  return (
    <div className="bg-white w-full mt-12">
      <p className="text-4xl font-bold text-center">Our Services</p>

      <div className="flex flex-row row-span-2 justify-center flex-wrap gap-12 mt-10 ">
        <div className="w-[460px] h-auto text-center">
          <img src={Groom1} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Full Grooming
          </h4>
          <p>This is Your Service Subtitle</p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={Groom2} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Wash & Blow Dry
          </h4>
          <p>This is Your Service Subtitle</p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={Groom3} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Self Serve Dog Wash
          </h4>
          <p>This is Your Service Subtitle</p>
        </div>

        <div className="w-[460px] h-auto text-center">
          <img src={Groom4} className="w-full h-[300px]" />
          <h4 className="md:my-10 sm:my-5 font-medium md:text-2xl sm:text-3xl">
            Nail Clipping
          </h4>
          <p>This is Your Service Subtitle</p>
        </div>
      </div>
      <div className="flex justify-center mt-[80px]">
        <button className="bg-[#8b6357] hover:bg-[#c94238] text-white md:text-base sm:text-2xl uppercase rounded-3xl px-6 py-2">
          book now
        </button>
      </div>
    </div>
  );
};

export default Services;
