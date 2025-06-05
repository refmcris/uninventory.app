import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useLocation } from "wouter";
import logo from "../../image/logo.svg";

export const Header = () => {
  const [l, setLocation] = useLocation();

  return (
    <div
      className="h-5rem flex items-center justify-content-between fixed top-0 left-0 w-full z-50 shadow-md px-2 md:px-6"
      style={{ backgroundColor: "#cd1f32", zIndex: 1000 }}
    >
      <div
        className="flex align-items-center gap-2   h-full cursor-pointer"
        onClick={() => setLocation("/")}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-3rem h-3rem md:w-4rem md:h-4rem"
        />
        <h1
          className="text-lg md:text-5xl font-bold tracking-wide text-white underline leading-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Uninventory
        </h1>
      </div>
      <div className="flex justify-end items-center px-2 md:px-4 py-2 md:py-3">
        <Button
          label="Acceder"
          className="bg-white text-gray-900 text-base md:text-2xl font-semibold px-2 md:px-4 py-1 border-round-md shadow-none hover:bg-gray-100 transition-all duration-200 mr-2 md:mr-3 p-button-raised"
          style={{
            fontFamily: "Poppins, sans-serif",
            border: "1px solid #FFFF"
          }}
          onClick={() => setLocation("/login")}
        />
      </div>
    </div>
  );
};
