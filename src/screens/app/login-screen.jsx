import React, { useEffect, useRef, useState } from "react";
import { LandingWrapperLogin } from "../../wrappers";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import logo from "../../image/logo.svg";
import { ctc, LoginUser, useForm } from "../../helpers";
import { useLocation } from "wouter";

export const LoginScreen = () => {
  const [l, setLocation] = useLocation();
  // refs
  const toastRef = useRef(null);
  // hooks
  const { formState, onChange } = useForm({
    username: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formState?.username || !formState?.password) return;
    try {
      const login = await LoginUser({
        email: formState?.username,
        userPassword: formState?.password
      });
      setLocation("/home");
      localStorage.setItem("session", JSON.stringify(login));
    } catch (error) {
      ctc({
        error: "",
        msg: "Error al iniciar sesión, usuario o contraseña no válidos",
        toastRef
      });
    }
  };

  return (
    <LandingWrapperLogin>
      <Card className="w-11 mt-6 md:w-30rem mx-auto flex flex-column justify-content-center">
        <div className="flex justify-content-center mb-5">
          <div className="w-10rem">
            <img src={logo} alt="Uninventory" className="w-full" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-column gap-4">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-user" />
            <InputText
              value={formState?.username}
              name="username"
              onChange={onChange}
              placeholder="Nombre de usuario"
              className="w-full custom-input"
            />
          </span>

          <span className="p-input-icon-left w-full">
            <i className="pi pi-lock" />
            <InputText
              type="password"
              value={formState?.password}
              name="password"
              onChange={onChange}
              placeholder="Contraseña"
              className="w-full custom-input"
            />
          </span>

          <Button
            type="submit"
            label="Entrar"
            className="w-full custom-button"
            onClick={handleLogin}
            disabled={!formState?.username || !formState?.password}
          />
        </form>

        <div className="mt-4 text-center flex flex-column gap-2">
          <a href="#" className="custom-link text-sm">
            ¿Olvidó su nombre de usuario o contraseña?
          </a>
          <a href="./register" className="custom-link text-sm">
            ¿No estás registrado aún? crea tu cuenta aquí
          </a>
        </div>
      </Card>
      <Toast ref={toastRef} />
    </LandingWrapperLogin>
  );
};
