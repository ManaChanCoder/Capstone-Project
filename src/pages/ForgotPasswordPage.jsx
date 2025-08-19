import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div>
      <div className="bg-[#a2292e] flex justify-center items-center flex-col w-full h-screen">
        <div className="w-[500px] bg-white flex flex-row justify-center h-auto py-5 px-10 rounded-lg">
          <div className="w-[75%] grid gap-3">
            <h1 className="text-center font-semibold text-3xl mb-3">
              Enter your email address
            </h1>

            <form action="" className="grid gap-2">
              {/* <label htmlFor="email">Email address</label> */}
              <input
                type="email"
                id=""
                className="border-[1px] border-gray-400 outline-none px-3 py-2 w-full"
                required
                placeholder="Email address..."
              />

              <button className="w-full py-2 bg-[#073273] text-base text-white my-1">
                Reset
              </button>
            </form>

            <div className="text-sm font-light">
              I have an account.{" "}
              <Link
                to="/login"
                className="hover:underline hover:text-[#073273]"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
