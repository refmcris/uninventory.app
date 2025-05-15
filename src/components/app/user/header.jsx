import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { useLocation } from "wouter";
import { Avatar } from "primereact/avatar";
import logo from "../../../image/logo.svg";

const NavItem = ({ label, to, isActive, onClick }) => {
  return (
    <h3
      className={`text-white m-0 cursor-pointer ${
        isActive ? "border-bottom-2 border-white" : ""
      }`}
      onClick={() => {
        onClick(to);
      }}
    >
      {label}
    </h3>
  );
};

export const HeaderUser = () => {
  const [l, setLocation] = useLocation();
  const menuRef = useRef(null);
  const session = {
    fullname: "CristianTestB",
    role: "estudiante"
  };

  const handleNavigate = (to) => setLocation(to);

  const menuItems = [
    {
      label: "Perfil",
      command: () => handleNavigate("/perfil"),
      icon: "pi pi-user"
    },
    {
      label: "Préstamos Realizados",
      command: () => handleNavigate("/prestamos-realizados"),
      icon: "pi pi-list"
    },
    {
      label: "Dashboard",
      icon: "pi pi-cog",
      command: () => handleNavigate("/dashboard")
    },
    { separator: true },
    {
      label: "Cerrar Sesión",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("session");
        setLocation("/");
      }
    }
  ];

  return (
    <div
      className="h-5rem flex items-center justify-content-between  top-0 left-0 w-full z-50 shadow-md px-4"
      style={{ backgroundColor: "#cd1f32" }}
    >
      <div className="flex align-items-center gap-4">
        <img src={logo} alt="Logo" style={{ width: "60px", height: "60px" }} />{" "}
        <h1
          className="text-5xl text-center pb-1 text-white m-0 cursor-pointer underline"
          onClick={() => setLocation("/home")}
        >
          Uninventory
        </h1>
        <NavItem
          label="Pagina principal"
          to="/home"
          isActive={l === "/home"}
          onClick={handleNavigate}
        />
        <NavItem
          label="Equipos"
          to="/equipos"
          isActive={l === "/equipos"}
          onClick={handleNavigate}
        />
      </div>
      <div className="flex items-center relative">
        <div
          className="flex items-center cursor-pointer h-full mt-3"
          onClick={(e) => menuRef.current.toggle(e)}
        >
          <Avatar
            //label={!session?.image ? session?.fullname?.slice(0, 2)?.toUpperCase() : undefined}
            shape="circle"
            className="bg-primary text-white text-xl font-bold border-circle w-3rem h-3rem flex items-center justify-center mr-2"
            image="https://res.cloudinary.com/ds6fxjeak/image/upload/v1735940456/GYw8am3WAAkYOj5_aoftgl.jpg"
          />
          <i className="pi pi-chevron-down text-white text-lg mt-3" />
        </div>
        <Menu model={menuItems} popup ref={menuRef} />
      </div>
    </div>
  );
};
