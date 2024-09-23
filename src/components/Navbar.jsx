import React from "react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="sm:fixed sm:top-0 w-full sm:bg-white text-black flex justify-between items-center px-[40px] py-2 z-10">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="w-[50px] h-[50px]" />
        <span className="uppercase font-semibold text-[#c94238] text-3xl self-end">
          petsville
        </span>
      </div>

      <div className="flex gap-7 md:flex sm:hidden">
        <ul className="flex gap-3 items-center">
          <li className="capitalize text-base cursor-pointer text-[#c94238]">
            home
          </li>
          <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
            about
          </li>
          <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
            shop
          </li>
          <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
            contact
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <CgProfile size={20} className="text-[#1cb5ed]" />
          <span className="capitalize hover:text-[#c94238] cursor-pointer">
            log in
          </span>
        </div>
        <button className="bg-[#8b6357] text-white hover:bg-[#c94238] uppercase px-6 py-2 text-base rounded-3xl">
          book now
        </button>
      </div>

      <div onClick={handleNav} className="cursor-pointer md:hidden sm:block">
        {!nav ? <IoIosMenu size={24} /> : <IoIosClose size={24} />}
      </div>

      <ul
        className={
          nav
            ? "fixed top-[66px] bg-white w-full h-[90%] py-10 left-2/4 translate-x-[-50%] flex flex-col justify-center gap-5 text-center transition-all"
            : "fixed right-[-100%]"
        }
      >
        <li className="flex justify-center gap-5 capitalize text-sm cursor-pointer hover:text-[#c94238] font-light">
          <div className="flex items-center gap-3">
            <IoPersonCircleSharp size={24} className="text-[#1cb5ed]" />
            <span>log in</span>
          </div>
          <button className="bg-[#8b6357] hover:bg-[#c94238] text-white px-5 py-2 uppercase text-base rounded-3xl">
            book now
          </button>
        </li>
        <li className="capitalize text-base cursor-pointer text-[#c94238]">
          home
        </li>
        <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
          about
        </li>
        <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
          shop
        </li>
        <li className="capitalize text-base cursor-pointer hover:text-[#c94238]">
          contact
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
