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
        {/* Logo */}
        <h1
          className="text-xl md:text-4xl font-bold tracking-wide text-white underline leading-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
        Uninventory
        </h1>
        
      </div>

      <div className="flex justify-end gap-1 items-center">
        <Divider layout="vertical" />
        <Button
          label="Entrar"
          className="p-button-text text-white border-none p-2 rounded-md"
          onClick={() => setLocation("/private")}
        />
      </div>
    </div>
  );
};