import { PanelMenu } from "primereact/panelmenu";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import noImageUser from "../../assets/images/noImageUser.png";

export const Sidebar = ({ visible, onHide }) => {
  const userData = {
    name: "nombreUsuarioBD" || "Nombre de usuario",
    email: "correoUsuarioBD" || "correo@ejemplo.com"
  };

  const menuItems = [
    {
      label: "Configuración",
      icon: "pi pi-cog",
      command: () => console.log("Ir a Configuración")
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: () => console.log("Cerrar sesión")
    }
  ];

  return (
    <div
      className={`absolute top-0 left-0 h-full bg-white shadow-2 ${
        visible ? "block" : "hidden"
      }`}
      style={{ width: "250px", zIndex: 1000 }}
    >
      <div className="p-3 border-bottom font-bold">Perfil</div>
      <div className="p-3 flex flex-column align-items-center">
        <img
          src={noImageUser}
          alt="Perfil"
          className="w-6rem h-6rem border-circle mb-2"
        />
        <h3 className="m-0">{userData.name}</h3>
        <p className="m-0 text-sm">{userData.email}</p>
      </div>
      <PanelMenu model={menuItems} style={{ width: "100%" }} />
      <div className="p-2">
        <Button
          label="Cerrar"
          icon="pi pi-times"
          onClick={onHide}
          className="p-button-text"
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};
