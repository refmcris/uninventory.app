import React, { useState } from "react";
import { LandingWrapperLogin } from "../../wrappers";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { classNames } from "primereact/utils";

export const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validación de código
    const codeRegex = /^[0-9]{9}$/;
    if (!formData.codigo) {
      newErrors.codigo = "El código es requerido";
      valid = false;
    } else if (!codeRegex.test(formData.codigo)) {
      newErrors.codigo = "El código debe de tener 9 dígitos";
      valid = false;
    }

    // Validación de nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      valid = false;
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
      valid = false;
    }

    // Validación de apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      valid = false;
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo) {
      newErrors.correo = "El correo es requerido";
      valid = false;
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido";
      valid = false;
    } else if (!formData.correo.endsWith("@correounivalle.edu.co")) {
      newErrors.correo =
        "Debe usar un correo institucional (@correounivalle.edu.co)";
      valid = false;
    }

    // Validación de teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es requerido";
      valid = false;
    } else if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = "Teléfono debe tener 10 dígitos";
      valid = false;
    }

    // Validación de contraseña
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      // Lógica para enviar los datos al backend
      console.log("Formulario válido:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (submitted) {
      validateForm();
    }
  };

  const isFormFieldValid = (name) => !!errors[name];

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <Message severity="error" text={errors[name]} className="mt-1" />
      )
    );
  };

  return (
    <LandingWrapperLogin className="bg-gray-100">
      <div className="w-full py-4">
        <div className="grid grid-nogutter max-w-screen-lg mx-auto px-4 pt-6">
          <Card className="w-11 md:w-30rem mx-auto my-4 ">
            <h2 className="text-center mb-6 text-2xl">Registro de Usuario</h2>

            <form onSubmit={handleSubmit} className="flex flex-column gap-4">
              <div className="field mb-3">
                <label htmlFor="codigo" className="block mb-2 font-medium">
                  Código *
                </label>
                <InputText
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ingrese su código de estudiante"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("codigo")
                  })}
                  keyfilter="num"
                  maxLength="9"
                  aria-describedby="nombre-error"
                />
                {getFormErrorMessage("codigo")}
              </div>

              <div className="field mb-3">
                <label htmlFor="nombre" className="block mb-2 font-medium">
                  Nombre *
                </label>
                <InputText
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("nombre")
                  })}
                  aria-describedby="nombre-error"
                />
                {getFormErrorMessage("nombre")}
              </div>

              <div className="field mb-3">
                <label htmlFor="apellido" className="block mb-2 font-medium">
                  Apellido *
                </label>
                <InputText
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("apellido")
                  })}
                />
                {getFormErrorMessage("apellido")}
              </div>

              <div className="field mb-3">
                <label htmlFor="correo" className="block mb-2 font-medium">
                  Correo Institucional *
                </label>
                <InputText
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="usuario@correounivalle.edu.co"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("correo")
                  })}
                  aria-describedby="nombre-error"
                  keyfilter="email"
                />
                {getFormErrorMessage("correo")}
              </div>

              <div className="field mb-3">
                <label htmlFor="telefono" className="block mb-2 font-medium">
                  Teléfono *
                </label>
                <InputText
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese su teléfono"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("telefono")
                  })}
                  keyfilter="num"
                  maxLength="10"
                />
                {getFormErrorMessage("telefono")}
              </div>

              <div className="field mb-3 w-full">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Contraseña *
                </label>
                <Password
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña"
                  className={classNames({
                    "p-invalid": isFormFieldValid("password")
                  })}
                  toggleMask
                  feedback={false}
                />
                {getFormErrorMessage("password")}
                <small className="block mt-2 text-sm text-gray-600">
                  La contraseña debe contener al menos 8 caracteres, una
                  mayúscula, un número y un carácter especial
                </small>
              </div>

              <Button
                type="submit"
                label="Registrarse"
                className="w-full mt-4"
                severity="danger"
              />

              {/* Enlace de login con más margen superior */}
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  ¿Ya tienes una cuenta?{" "}
                  <a
                    href="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </LandingWrapperLogin>
  );
};
