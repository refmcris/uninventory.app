import React, { useEffect, useRef, useState } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { LabelInputRow } from "../../components";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { GetUserById, PutUser } from "../../helpers/api";
import { handleToastDone } from "../../helpers/feedback";

export const UserProfile = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loaders, setLoaders] = useState(false);

  const toastRef = useRef();

  const id = 3;

  const handleLoaders = (value) => setLoaders((t) => ({ ...t, ...value }));

  const toggleDialog = () => {
    setIsDialogOpen((prev) => {
      const next = !prev;
      if (!next) {
        setImage(null);
      }
      return next;
    });
  };

  // hooks

  const handleGetInfo = async () => {
    handleLoaders({ getUser: true });
    try {
      const response = await GetUserById(id);
      setUser(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      handleLoaders({ getUser: false });
    }
  };

  const handleSubmit = async () => {
    handleLoaders({ getUser: true });
    try {
      const response = await PutUser(user);
      setUser(response);
      handleToastDone({
        msg: "Informacion Actualizada",
        toastRef
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      toggleDialog();
      handleLoaders({ getUser: false });
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: name === "studentCode" ? parseInt(value) || 0 : value
    }));
  };

  //bodys

  useEffect(() => {
    handleGetInfo();
  }, []);

  const bodyFooter = (
    <div className="w-full flex gap-2">
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        className="w-full mx-0"
        severity="secondary"
        onClick={toggleDialog}
      />
      <Button
        type="submit"
        label="Guardar"
        icon="pi pi-save"
        className="w-full mx-0"
        style={{ backgroundColor: "#cd1f32" }}
        onClick={handleSubmit}
        form="add-tenant-form"
      />
    </div>
  );

  return (
    <UserLandingWrapper>
      <div className="flex justify-content-center align-items-center min-h-screen ">
        <Card
          className="shadow-4"
          style={{ width: "80rem", textAlign: "center" }}
        >
          <div className="p-d-flex p-flex-column">
            <Avatar
              image="https://res.cloudinary.com/ds6fxjeak/image/upload/v1735940456/GYw8am3WAAkYOj5_aoftgl.jpg"
              shape="circle"
              className="p-mb-3"
              style={{ width: "6rem", height: "6rem" }}
            />
            <h2 className="p-mb-2">MARTINEZ TEZ CRISTIAN ALEJANDRO</h2>
            <Button
              label="Editar perfil"
              icon="pi pi-user-edit"
              className="p-button-danger p-mb-3"
              onClick={toggleDialog}
            />
            <div className="p-text-left" style={{ width: "100%" }}>
              <h3>Información Personal</h3>
              <p>
                <strong>Código de estudiante:</strong> {user?.studentCode}
              </p>

              <p>
                <strong>Nombre completo:</strong>{" "}
                {`${user?.fullName} ${user?.lastName}`}
              </p>

              <p>
                <strong>Correo electrónico:</strong> {user?.email}
              </p>
            </div>
          </div>
        </Card>

        <Dialog
          visible={isDialogOpen}
          onHide={toggleDialog}
          className="w-8 md:w-5"
          header="Editar perfil"
          draggable={false}
          footer={bodyFooter}
        >
          <form className="w-full flex flex-column gap-2">
            <LabelInputRow label="Codigo de estudiante">
              <InputText
                value={user?.studentCode}
                onChange={handleOnChange}
                name="studentCode"
                className="w-full"
              />
            </LabelInputRow>
            <LabelInputRow label="Correo">
              <InputText
                value={user?.email}
                onChange={handleOnChange}
                name="email"
                className="w-full"
              />
            </LabelInputRow>
            <LabelInputRow label="Telefono">
              <InputText
                value={user?.phone}
                onChange={handleOnChange}
                name="phone"
                className="w-full"
              />
            </LabelInputRow>
          </form>
        </Dialog>
      </div>
      <Toast ref={toastRef} />
    </UserLandingWrapper>
  );
};
