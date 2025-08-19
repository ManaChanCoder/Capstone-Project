import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/Firebase"; // Import Firebase auth instance
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Toggle mobile menu
  function handleNav() {
    setNav(!nav);
  }

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if a user is logged in
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update state on logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Scroll to the top of the page
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sm:fixed sm:top-0 w-full sm:bg-[white] text-black flex justify-between items-center px-[40px] py-2 z-10 navbar-shadow">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="w-[50px] h-[50px]" />
        <span className="uppercase font-semibold text-[#c94238] text-3xl self-end">
          petsville
        </span>
      </div>

      <div className="flex gap-7 md:flex sm:hidden">
        <ul className="flex gap-3 items-center">
          {["home", "about", "shop", "contact"].map((item) => (
            <Link
              key={item}
              to={`/${item === "home" ? "" : item}`}
              onClick={scrollTop}
              className="capitalize text-base cursor-pointer text-black hover:text-[#c94238]"
            >
              {item}
            </Link>
          ))}
        </ul>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="capitalize hover:text-[#c94238] cursor-pointer"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-3">
            <CgProfile size={20} className="text-[#1cb5ed]" />
            <span className="capitalize hover:text-[#c94238] cursor-pointer">
              log in
            </span>
          </Link>
        )}
      </div>

      <div onClick={handleNav} className="cursor-pointer md:hidden sm:block">
        {!nav ? <IoIosMenu size={24} /> : <IoIosClose size={24} />}
      </div>

      <ul
        className={
          nav
            ? "fixed top-[66px] bg-white w-full h-[90%] py-10 left-2/4 translate-x-[-50%] flex flex-col justify-center gap-5 text-center"
            : "fixed right-[-100%]"
        }
      >
        {["home", "about", "shop", "contact"].map((item) => (
          <Link
            key={item}
            to={`/${item === "home" ? "" : item}`}
            onClick={() => {
              scrollTop();
              handleNav(); // Close menu on mobile
            }}
            className="capitalize text-base cursor-pointer text-black hover:text-[#c94238]"
          >
            {item}
          </Link>
        ))}
        <li className="flex justify-center gap-5 capitalize text-sm cursor-pointer hover:text-[#c94238] font-light">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="capitalize hover:text-[#c94238] cursor-pointer"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-3">
              <CgProfile size={20} className="text-[#1cb5ed]" />
              <span>log in</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
