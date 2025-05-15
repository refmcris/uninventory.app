import { useEffect, useState } from "react";
import { GetRoles, useForm } from "../../../helpers";
import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Dropdown } from "primereact/dropdown";

export const EditUserDialog = ({
  visible,
  onHide,
  onEditUser,
  selectedUser
}) => {
  const [roles, setRoles] = useState([]);

  const { formState, onChange, setUpFormState, onChangeManual } = useForm(
    selectedUser || {},
    ["studentCode", "email", "phone", "userRoleId"]
  );

  //handlers

  const handleGetRoles = async () => {
    try {
      const response = await GetRoles();
      const roles = response.map((role) => ({
        label: role.name,
        value: role.roleId
      }));
      setRoles(roles);
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    onEditUser(formState);

    handleHide();
  };

  //renders

  const BodyFooter = () => {
    return (
      <div className="w-full flex items-center justify-content-center gap-1">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          onClick={handleHide}
        />
        <Button
          label="Editar"
          icon="pi pi-check"
          style={{ backgroundColor: "#cd1f32" }}
          onClick={onEdit}
        />
      </div>
    );
  };

  const handleHide = () => {
    onHide && onHide();
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setUpFormState(selectedUser);
    }
  }, [selectedUser]);
  return (
    <Dialog
      visible={visible}
      draggable={false}
      resizable={false}
      onHide={handleHide}
      header="Editar usuario"
      footer={BodyFooter}
      className="w-4"
    >
      <div className="flex align-items-center ">
        <form className="flex flex-column w-full  " onSubmit={onEdit}>
          <div className="flex flex-column ">
            <label>Codigo de estudiante</label>
            <InputText
              value={formState?.studentCode}
              onChange={onChange}
              name="studentCode"
              className="w-full"
            />
          </div>
          <div className="flex flex-column ">
            <label>Email</label>
            <InputText
              value={formState?.email}
              onChange={onChange}
              name="email"
              className="w-full"
            />
          </div>
          <div className="flex flex-column ">
            <label>Telefono</label>
            <InputText
              value={formState?.phone}
              onChange={onChange}
              name="phone"
              className="w-full"
            />
          </div>
          <div className="flex flex-column ">
            <label>Rol</label>
            <Dropdown
              name="userRoleId"
              onChange={onChange}
              value={formState.userRoleId}
              options={roles}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
