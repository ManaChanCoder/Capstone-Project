import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="bg-[#a2292e]">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
