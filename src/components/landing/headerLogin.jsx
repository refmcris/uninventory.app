import { Button } from "primereact/button";
import React from "react";
import logo from "../../image/logo.svg";
import { useLocation } from "wouter";

export const HeaderLogin = () => {
  const [l, setLocation] = useLocation();
  return (
    <div
      className="h-5rem flex items-center justify-content-between fixed top-0 left-0 w-full shadow-md"
      style={{ backgroundColor: "#cd1f32", zIndex: 1000 }}
    >
      <div
        className="flex align-items-center gap-2  md:ml-5 h-full cursor-pointer"
        onClick={() => setLocation("/")}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-3rem h-3rem md:w-4rem md:h-4rem"
        />
        <h1
          className="text-xl md:text-5xl font-bold tracking-wide text-white underline leading-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Uninventory
        </h1>
      </div>
    </div>
  );
};
