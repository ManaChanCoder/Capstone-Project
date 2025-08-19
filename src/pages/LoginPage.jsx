import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Logo from "../assets/logo.png";
import { db, auth } from "../db/Firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const userCollectionRef = collection(db, "users");

  function toggleLoginRegister() {
    setLogin(!login);
  }

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Email and Password login
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const { email, password } = newUser;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/shop");
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email } = newUser;
    setLoading(true);

    if (!password || !confirmPassword || !email) {
      toast.error("Please fill all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        toast.error("Email already registered. Try logging in.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registered user:", userCredential.user);

      // Optionally add user details to Firestore
      await addDoc(userCollectionRef, {
        email: email,
        createdAt: new Date(),
      });

      toast.success("Registration successful! Please log in.");
      setLogin(true);
      setNewUser({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration Error:", err.code, err.message);
      toast.error(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-white">
      <div className="flex justify-center bg-[white] text-black w-[500px] h-auto py-5 rounded-md">
        <div className={login ? "flex flex-col gap-1 w-[75%]" : "hidden"}>
          {/* Login Form */}
          <div className="flex flex-row items-center justify-between mb-3">
            <div className="flex flex-row">
              <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
              <span className="uppercase text-3xl font-bold text-[#eb3349] self-end">
                petsville
              </span>
            </div>
            <Link to=".." className="self-end">
              <MdKeyboardArrowLeft
                size={34}
                className="rounded-full bg-[#073273] text-white cursor-pointer"
              />
            </Link>
          </div>

          <div className="text-3xl font-semibold">Welcome back</div>
          <div className="text-sm font-light">Please enter your details</div>

          <form
            className="mt-3 flex flex-col gap-2"
            onSubmit={handleEmailPasswordLogin}
          >
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="border-[1px] border-gray-300 px-2 py-1 outline-none"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="border-[1px] border-gray-300 px-2 py-1 outline-none"
              required
            />
            <button
              className="bg-[#073273] text-white text-base py-2 mt-3"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex flex-row justify-between mt-3">
              <div className="text-sm font-light">
                Don't have an account?{" "}
                <span
                  className="text-[#073273] hover:underline cursor-pointer"
                  onClick={toggleLoginRegister}
                >
                  Sign Up
                </span>
              </div>
              <Link
                to="/login/forgot-password"
                className="text-blue-500 hover:underline font-light text-sm"
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>

        {/* Registration Form */}
        <div className={login ? "hidden" : "flex flex-col gap-1 w-[75%]"}>
          <div className="flex justify-between items-center">
            <span className="uppercase text-[22px] font-medium">
              Register Account
            </span>
            <IoCloseOutline
              size={40}
              className="border-[1px] rounded-full bg-[#073273] text-white cursor-pointer"
              onClick={toggleLoginRegister}
            />
          </div>

          <form className="grid gap-2 mt-5" onSubmit={handleRegister}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="border-[1px] border-gray-300 px-2 py-1 outline-none"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="border-[1px] border-gray-300 px-2 py-1 outline-none"
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleChange}
              className="border-[1px] border-gray-300 px-2 py-1 outline-none"
              required
            />
            <button
              className="bg-[#073273] text-white py-2 mt-3"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
