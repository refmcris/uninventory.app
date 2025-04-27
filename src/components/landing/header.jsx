import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useLocation } from "wouter";

export const Header = () => {
  const [l, setLocation] = useLocation();
  return (
    <div
      className="h-5rem flex items-center justify-content-between fixed top-0 left-0 w-full z-50 shadow-md"
      style={{ backgroundColor: "#cd1f32" }}
    >
      <div className="flex align-items-center gap-2">
        <h1 className="text-2x1 text-center border-bottom-2 border-white pb-1 text-white ml-3">
          Uninventory
        </h1>
      </div>

      <div className="flex justify-end gap-1 items-center">
        <Divider layout="vertical" />
        <Button
          label="Entrar"
          className="p-button-text text-white border-none p-2 rounded-md"
          onClick={() => setLocation("/login")}
        />
      </div>
    </div>
  );
};