import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useLocation } from "wouter";
import logo from "../../image/logo.svg";

export const Header = () => {
  const [l, setLocation] = useLocation();

  return (
    <div
      className="h-5rem flex items-center justify-content-between fixed top-0 left-0 w-full z-50 shadow-md"
      style={{ backgroundColor: "#cd1f32" }}
    >
      <div className="flex align-items-center gap-2 ml-5 h-full">
        <img src={logo} alt="Logo" style={{ width: "60px", height: "60px" }} />{" "}
        <h1
          className="text-xl md:text-4xl font-bold tracking-wide text-white underline leading-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Uninventory
        </h1>
      </div>

      <div className="flex justify-end items-center px-4 py-3">
        <Button
          label="Acceder"
          className="bg-white text-gray-900 text-2x1 font-semibold px-4 py-1 border-round-md shadow-none hover:bg-gray-100 transition-all duration-200 mr-3 p-button-raised "
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
