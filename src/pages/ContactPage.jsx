import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div>
      <div className="my-10 px-10 w-full">
        <h1 className="md:text-5xl sm:text-3xl font-bold uppercase md:py-14 sm:pt-14 sm:pb-5 text-center">
          contact us
        </h1>

        <div className="flex flex-row justify-center row-span-3 gap-5">
          <div className="">
            <span className="font-light md:text-base sm:text-sm">
              sainggarhogenn@gmail.com
            </span>
          </div>
          <div className="">
            <span className="font-light md:text-base sm:text-sm">|</span>
          </div>
          <div className="">
            <span className="font-light md:text-base sm:text-sm">
              123-456-7890
            </span>
          </div>
        </div>

        <p className="mt-2 text-center font-light md:text-base sm:text-sm">
          500 Terry Francine Street San Francisco, CA 94158
        </p>

        <div className="xl:w-1/2 md:w-full sm:w-full my-10 px-5 mx-auto">
          <form
            action="#"
            className="flex md:flex-row sm:flex-col justify-center row-span-2 md:gap-7 sm:gap-3 mb-3"
          >
            <div className="">
              <label htmlFor="" className="font-light text-base">
                First Name *
              </label>
              <input
                type="text"
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
                id=""
              />
            </div>
            <div className="">
              <label htmlFor="" className="font-light text-base">
                Last Name *
              </label>
              <input
                type="text"
                name=""
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
                id=""
              />
            </div>
          </form>

          <form action="#" className="flex flex-col col-span-3 gap-3">
            <div className="">
              <label htmlFor="" className="font-light text-base">
                Email *
              </label>
              <input
                type="email"
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
                id=""
              />
            </div>
            <div className="">
              <label htmlFor="" className="font-light text-base">
                Phone *
              </label>
              <input
                type="email"
                className="w-full py-2 px-3 border-[1px] border-black outline-none"
                id=""
              />
            </div>
            <div className="">
              <label htmlFor="" className="font-light text-base">
                Leave your message here... *
              </label>
              <textarea
                name=""
                className="w-full py-2 px-3 border-[1px] border-black outline-none h-[120px]"
                id=""
              ></textarea>
            </div>
          </form>

          <div className="flex flex-row justify-end ">
            <button className="text-white bg-[#c94238] hover:bg-[#05307a] px-14 py-2">
              Submit
            </button>
          </div>
        </div>

        <h3 className="text-center font-semibold text-3xl mt-[60px] mb-10">
          Distributor
        </h3>

        <div className="flex md:flex-row sm:flex-col xl:row-span-3 md:row-span-2 sm:col-span-1 flex-wrap xl:gap-5 md:gap-0 justify-center">
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5  uppercase">
              San Francisco
            </h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">
              Los Angeles
            </h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Washington</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5  uppercase">New York</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Las Vegas</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="xl:w-[30%] md:w-1/2 sm:w-full text-center px-10 py-5 md:shadow-none sm:shadow-lg">
            <h4 className="text-xl font-semibold my-5 uppercase">Miami</h4>
            <p>500 Terry Francine</p>
            <p>Street San Francisco,</p>
            <p>CA 94158</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
