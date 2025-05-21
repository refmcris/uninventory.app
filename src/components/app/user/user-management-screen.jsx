import React, { useEffect, useRef, useState } from "react";
import { UserLandingWrapper } from "../../../wrappers";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import {
  ctc,
  GetUsers,
  exportExcel,
  handleToastDone,
  PutUser
} from "../../../helpers";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { EditUserDialog } from "./edit-user-dialog";
import { DashboardLayout } from "../../../layouts";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loaders, setLoaders] = useState({});

  //refs
  const toastRef = useRef();
  const handleLoaders = (value) => setLoaders((t) => ({ ...t, ...value }));

  //handlers
  const handleGetUsers = async () => {
    try {
      const response = await GetUsers();
      setUsers(response);
    } catch (error) {
      ctc({
        msg: "Error al traer los usuarios",
        toastRef
      });
    }
  };

  const OnEditUser = async (body) => {
    try {
      await PutUser(body);
      handleToastDone({
        msg: "Usuario editado con exito",
        toastRef
      });
      handleGetUsers(); // Actualizar la lista después de editar
      setSelectedUser(null); // Cerrar el diálogo
    } catch (error) {
      console.error("error", error);
      ctc({
        msg: "Error al editar el usuario",
        toastRef
      });
    }
  };

  const editButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded mr-2"
        onClick={() => setSelectedUser(rowData)}
      />
    );
  };

  const onExportExcel = async () => {
    const cols = [
      { header: "Codigo de estudiante", key: "studentCode", width: 30 },
      { header: "Nombre", key: "fullName", width: 30 },
      { header: "Apellido", key: "lastName", width: 30 },
      { header: "Telefono", key: "phone", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Rol", key: "userRoleName", width: 30 },
      { header: "Activo", key: "delete", width: 30 }
    ];

    const statusMap = {
      true: "inactivo",
      false: "activo"
    };

    const data = users.map((item) => ({
      studentCode: item.studentCode,
      fullName: item.fullName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      userRoleName: item.userRoleName,
      delete: statusMap[item.delete] || ""
    }));

    try {
      await exportExcel({
        cols,
        data: data,
        sheetName: "Usuarios",
        creator: "awo",
        handleToastDone,
        handleLoading: handleLoaders
      });
      handleToastDone({
        msg: "Excel exportado",
        toastRef
      });
    } catch (error) {
      ctc({
        msg: "Error al generar excel",
        toastRef
      });
    }
  };

  const renderTemplate = (status) => {
    let icon = "pi pi-question-circle";
    let color = "text-gray-500";
    let tooltipText = "Desconocido";

    switch (status) {
      case false:
        icon = "pi pi-check-circle";
        color = "text-green-500";
        tooltipText = "Activo";
        break;

      case true:
        icon = "pi pi-ban";
        color = "text-gray-500";
        tooltipText = "Inactivo";
        break;
    }

    return (
      <>
        <i
          id={`status-icon-${status}`}
          className={`${icon} ${color} text-xl`}
          data-pr-tooltip={tooltipText}
          data-pr-position="top"
        />
        <Tooltip target={`#status-icon-${status}`} />
      </>
    );
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de usuarios
          </h1>
          <div>
            <Button
              tooltip="Exportar a Excel"
              tooltipOptions={{ position: "top", showDelay: 500 }}
              icon="pi pi-file-excel"
              severity="success"
              className="ml-2"
              onClick={onExportExcel}
            />
          </div>
        </div>
        <div>
          <DataTable
            value={users}
            size="normal"
            showGridlines
            scrollHeight="70vh"
            emptyMessage="No hay usuarios registrados"
          >
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Codigo de estudiante"
              rowSpan={3}
              field="studentCode"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Nombre"
              rowSpan={3}
              field="fullName"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Apellido"
              rowSpan={3}
              field="lastName"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Telefono"
              rowSpan={3}
              field="phone"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Email"
              rowSpan={3}
              field="email"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Rol"
              rowSpan={3}
              field="userRoleName"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Activo"
              rowSpan={3}
              field="delete"
              body={(rowData) => {
                return renderTemplate(rowData?.delete);
              }}
            />

            <Column
              header="Editar"
              body={editButtonTemplate}
              headerClassName="bg-gray-200 text-gray-900 font-bold w-7rem"
              align={"center"}
              style={{ minWidth: "7rem" }}
            />
          </DataTable>
        </div>
        <EditUserDialog
          visible={selectedUser !== null}
          onHide={() => setSelectedUser(null)}
          onEditUser={OnEditUser}
          selectedUser={selectedUser}
        />
      </div>
      <Toast ref={toastRef} />
    </DashboardLayout>
  );
};
