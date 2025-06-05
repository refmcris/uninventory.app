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

  localStorage.getItem("session");
  const session = JSON.parse(localStorage.getItem("session"));

  const toastRef = useRef();

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
      <div
        className="flex justify-content-center align-items-center p-4"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        <Card
          className="shadow-4"
          style={{ width: "80rem", textAlign: "center" }}
        >
          <div className="p-d-flex p-flex-column">
            <Avatar
              label={session?.fullName?.slice(0, 2)?.toUpperCase()}
              shape="circle"
              className="p-mb-3 text-black text-xl"
              style={{
                width: "6rem",
                height: "6rem",
                backgroundColor: "#ccc8c8"
              }}
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
                <strong>Código de estudiante:</strong> {session?.studentCode}
              </p>

              <p>
                <strong>Nombre completo:</strong>{" "}
                {`${session?.fullName} ${session?.lastName}`}
              </p>

              <p>
                <strong>Correo electrónico:</strong> {session?.email}
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
                value={session?.studentCode}
                onChange={handleOnChange}
                name="studentCode"
                className="w-full"
              />
            </LabelInputRow>
            <LabelInputRow label="Correo">
              <InputText
                value={session?.email}
                onChange={handleOnChange}
                name="email"
                className="w-full"
              />
            </LabelInputRow>
            <LabelInputRow label="Telefono">
              <InputText
                value={session?.phone}
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
