import React, { useRef, useState } from "react";
import { Menu } from "primereact/menu";
import { useLocation } from "wouter";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import logo from "../../../image/logo.svg";

const NavItem = ({ label, to, isActive, onClick, isSidebar = false }) => {
  return (
    <h3
      className={`m-0 cursor-pointer ${
        isActive ? "border-bottom-2 border-white" : ""
      } ${isSidebar ? "p-3 hover:bg-red-800 text-gray-900" : "text-white"}`}
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const session = JSON.parse(localStorage.getItem("session"));

  const handleNavigate = (to) => {
    setLocation(to);
    setSidebarVisible(false);
  };

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
    ...(session?.userRoleName === "ADMIN"
      ? [
          {
            label: "Dashboard",
            icon: "pi pi-cog",
            command: () => handleNavigate("/dashboard")
          }
        ]
      : []),
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
    <>
      <div
        className="h-5rem flex items-center justify-content-between top-0 left-0 w-full shadow-md px-2 md:px-6"
        style={{ backgroundColor: "#cd1f32", zIndex: 1000 }}
      >
        <div className="flex align-items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-3rem h-3rem md:w-4rem md:h-4rem cursor-pointer"
            onClick={() => handleNavigate("/home")}
          />
          <h1
            className="text-lg md:text-5xl text-center pb-1 text-white m-0 cursor-pointer underline"
            onClick={() => handleNavigate("/home")}
          >
            Uninventory
          </h1>
          <div className="hidden md:flex align-items-center pl-2  gap-4">
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
        </div>

        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-rounded text-white md:hidden flex align-items-center justify-content-center mt-3"
          style={{ width: "3rem", height: "3rem" }}
          onClick={() => setSidebarVisible(true)}
        />

        <div className="hidden md:flex items-center relative mt-3">
          <div
            className="flex items-center cursor-pointer h-full"
            onClick={(e) => menuRef.current.toggle(e)}
          >
            <Avatar
              label={session?.fullName?.slice(0, 2)?.toUpperCase()}
              shape="circle"
              className="text-black text-base md:text-xl border-circle w-2rem h-2rem md:w-3rem md:h-3rem   mr-2"
              style={{ backgroundColor: "#ccc8c8" }}
            />
            <i className="pi pi-chevron-down text-white text-lg mt-3" />
          </div>
          <Menu model={menuItems} popup ref={menuRef} />
        </div>
      </div>

      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        className="w-full sm:w-20rem"
      >
        <div className="flex flex-column h-full">
          <div className="flex align-items-center gap-2 p-3 border-bottom-1 border-gray-200">
            <Avatar
              label={session?.fullName?.slice(0, 2)?.toUpperCase()}
              shape="circle"
              className="text-black text-xl  border-circle w-3rem h-3rem"
              style={{ backgroundColor: "#ccc8c8" }}
            />
            <div className="flex flex-column">
              <span className="font-bold">{session?.fullName}</span>
              <span className="text-sm text-gray-600">{session?.email}</span>
            </div>
          </div>

          <div className="flex flex-column p-3">
            <NavItem
              label="Pagina principal"
              to="/home"
              isActive={l === "/home"}
              onClick={handleNavigate}
              isSidebar
              className="text-black"
            />
            <NavItem
              label="Equipos"
              to="/equipos"
              isActive={l === "/equipos"}
              onClick={handleNavigate}
              isSidebar
            />
          </div>

          <div className="flex flex-column p-3 mt-auto">
            {menuItems.map((item, index) =>
              item.separator ? (
                <div
                  key={index}
                  className="my-2 border-top-1 border-gray-200"
                />
              ) : (
                <Button
                  key={index}
                  label={item.label}
                  icon={item.icon}
                  className="p-button-text p-button-plain justify-content-start mb-2"
                  onClick={item.command}
                />
              )
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
};
