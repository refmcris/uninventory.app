import { useRef, useState, useEffect } from "react";
import { LandingWrapperLogin } from "../../wrappers";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { classNames } from "primereact/utils";
import { ctc, RegisterUser, useForm } from "../../helpers";
import { useLocation } from "wouter";
import { Toast } from "primereact/toast";

export const RegisterScreen = () => {
  const [l, setLocation] = useLocation();
  // refs
  const toastRef = useRef(null);
  // hooks
  const { formState, onChange } = useForm({
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
    if (!formState?.codigo) {
      newErrors.codigo = "El código es requerido";
      valid = false;
    } else if (!codeRegex.test(formState?.codigo)) {
      newErrors.codigo = "El código debe de tener 9 dígitos";
      valid = false;
    }

    // Validación de nombre
    if (!formState?.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      valid = false;
    } else if (formState?.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
      valid = false;
    }

    // Validación de apellido
    if (!formState?.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      valid = false;
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState?.correo) {
      newErrors.correo = "El correo es requerido";
      valid = false;
    } else if (!emailRegex.test(formState?.correo)) {
      newErrors.correo = "Correo electrónico inválido";
      valid = false;
    } else if (!formState?.correo.endsWith("@correounivalle.edu.co")) {
      newErrors.correo =
        "Debe usar un correo institucional (@correounivalle.edu.co)";
      valid = false;
    }

    // Validación de teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!formState?.telefono) {
      newErrors.telefono = "El teléfono es requerido";
      valid = false;
    } else if (!phoneRegex.test(formState?.telefono)) {
      newErrors.telefono = "Teléfono debe tener 10 dígitos";
      valid = false;
    }

    // Validación de contraseña
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formState?.password) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (!passwordRegex.test(formState?.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      try {
        await RegisterUser({
          StudentCode: formState?.codigo,
          FullName: formState?.nombre,
          LastName: formState?.apellido,
          Phone: formState?.telefono,
          Email: formState?.correo,
          UserRoleId: 2,
          UserPassword: formState?.password
        });
        setLocation("/login");
      } catch (error) {
        ctc({
          error,
          msg: "El usuario ya existe, porfavor intentar de nuevo",
          toastRef
        });
      }
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
        <div className="grid grid-nogutter max-w-full md:max-w-screen-lg mx-auto px-2 md:px-4 pt-6">
          <Card className="w-full md:w-30rem mx-auto my-4 ">
            <h2 className="text-center mb-6 text-2xl">Registro de Usuario</h2>

            <form onSubmit={handleRegister} className="flex flex-column gap-4">
              <div className="field mb-3">
                <label htmlFor="codigo" className="block mb-2 font-medium">
                  Código *
                </label>
                <InputText
                  id="codigo"
                  name="codigo"
                  value={formState?.codigo}
                  onChange={onChange}
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
                  value={formState?.nombre}
                  onChange={onChange}
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
                  value={formState?.apellido}
                  onChange={onChange}
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
                  value={formState?.correo}
                  onChange={onChange}
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
                  value={formState?.telefono}
                  onChange={onChange}
                  placeholder="Ingrese su teléfono"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("telefono")
                  })}
                  keyfilter="num"
                  maxLength="10"
                />
                {getFormErrorMessage("telefono")}
              </div>

              <div className="field mb-3">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Contraseña *
                </label>
                <InputText
                  id="password"
                  name="password"
                  value={formState?.password}
                  onChange={onChange}
                  placeholder="Ingrese su contraseña"
                  className={classNames("w-full", {
                    "p-invalid": isFormFieldValid("password")
                  })}
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
      <Toast ref={toastRef} />
    </LandingWrapperLogin>
  );
};
