import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 p-10 bg-[#c94238] text-white grid row-span-2">
      <div className="w-full h-auto flex md:flex-row sm:flex-col md:row-span-4 sm:row-span-1 justify-center gap-14 px-10 py-5">
        <div className="w-auto">
          <h4 className="font-semibold text-xl mb-10">Our Flagship Store</h4>

          <p className="font-light text-sm">500 Terry Francine Street</p>
          <p className="font-light text-sm my-5">San Francisco, CA 94158</p>
          <p className="font-light text-sm">Tel: 123-456-7890</p>
        </div>
        <div className="w-auto">
          <h4 className="font-semibold text-xl mb-10">Shop</h4>

          <ul className="list-none text-sm">
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Cat Food
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Dog Food
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Pet Accessories
              </a>
            </li>
            <li className="">
              <a href="" className="text-white font-light">
                Fish
              </a>
            </li>
          </ul>
        </div>
        <div className="w-auto">
          <h4 className="font-semibold text-xl mb-10">Information</h4>

          <ul className="list-none text-sm">
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Our Story
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Contact
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Shipping & Returns
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Store Policy
              </a>
            </li>
            <li className="mb-5">
              <a href="" className="text-white font-light">
                Forum
              </a>
            </li>
            <li className="">
              <a href="" className="text-white font-light">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-[30%] sm:w-auto">
          <h4 className="font-semibold text-lg mb-10">
            Get Special Deals & Offers
          </h4>

          <form action="" className="grid gap-3">
            <label htmlFor="email" className="font-light">
              Email Address*
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="w-full py-2 px-5 text-black"
              required
            />
            <button className="w-full text-lg py-3 bg-transparent hover:bg-black border-[1px] border-black text-black hover:text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Footer;
